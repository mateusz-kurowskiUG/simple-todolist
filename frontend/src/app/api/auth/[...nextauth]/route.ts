import type { AuthOptions, Session } from "next-auth";
import NextAuth from "next-auth/next";
import KeycloakProvider from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";
import type { IJwtHeader } from "@/interfaces/IJwtHeader";
import type { CustomSession } from "@/interfaces/ICustomSession";
import type { IToken } from "@/interfaces/IToken";
import axios from "axios";

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

        token = {
          ...token,
          roles,
          sid,
          email,
          name,
          accessToken: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at,
        };
        return token;
      }

      if (Date.now() < token.expires_at! * 1000) {
        return token;
      }

      if (!token.refresh_token) {
        throw new Error("Missing refresh token");
      }

      try {
        const response = await fetch(process.env.TOKEN_ENDPOINT!, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: process.env.KEYCLOAK_CLIENT_ID!,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token!,
          }),
          method: "POST",
        });

        const responseTokens = await response.json();

        if (!response.ok) throw responseTokens;

        return {
          ...token,
          accessToken: responseTokens.access_token,
          expires_at: Math.floor(
            Date.now() / 1000 + (responseTokens.expires_in as number)
          ),
          refresh_token: responseTokens.refresh_token ?? token.refresh_token,
        };
      } catch (error) {
        console.error("Error refreshing access token", error);
        return { ...token, error: "RefreshAccessTokenError" as const };
      }
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
  events: {
    async signOut({ token, session }) {
      // Set token/session to {}, that would update the cilentside token/session as well
      token = {};
      session = {};
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
