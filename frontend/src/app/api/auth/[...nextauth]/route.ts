import type { AuthOptions, Session } from "next-auth";
import NextAuth from "next-auth/next";
import KeycloakProvider from "next-auth/providers/keycloak";
import type IJwtHeader from "@/interfaces/IJwtHeader";
import { jwtDecode } from "jwt-decode";
import type CustomSession from "@/interfaces/ICustomSession";
import type { IToken } from "@/interfaces/IToken";
// biome-ignore : bo tak

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const decodedJwt = jwtDecode<IJwtHeader>(account.access_token!);
        const { sid, email, name, realm_access } = decodedJwt;
        const { roles } = realm_access;

        token.roles = roles;
        token.sid = sid;
        token.email = email;
        token.name = name;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: IToken }) {
      (session as unknown as CustomSession).user = {
        id: token.sid!,
        email: token.email!,
        name: token.name!,
        roles: token.roles!,
      };
      (session as unknown as CustomSession).token = token.accessToken!;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
