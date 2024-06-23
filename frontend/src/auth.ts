import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Keycloak],
});
