import { jwtDecode } from "jwt-decode";
import NextAuth, { type Session, type User } from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import type { IToken } from "./interfaces/IToken";
import type ICustomSession from "./interfaces/ICustomSession";
import type IJwtHeader from "./interfaces/IJwtHeader";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER,
      authorization: process.env.AUTH_KEYCLOAK_AUTH_URL,
      token: process.env.AUTH_TOKEN_ENDPOINT,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Initial sign in
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

      // Token refresh
      if (Date.now() < token.expires_at! * 1000) {
        return token;
      }
      try {
        const response = await fetch(process.env.AUTH_TOKEN_ENDPOINT!, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: process.env.AUTH_KEYCLOAK_ID!,
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
      (session as unknown as ICustomSession).user = {
        id: token.sid!,
        email: token.email!,
        name: token.name!,
        roles: token.roles!,
      };
      (session as unknown as ICustomSession).token = token.accessToken!;

      if (token.error) {
        session.error = token.error;
      }

      return session;
    },
  },
  events: {
    async signOut({ token, session }) {
      // Set token/session to {}, that would update the clients' token/session as well
      token = {} as any;
      session = {} as any;
    },
  },
});

declare module "next-auth" {
  interface Session {
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}
