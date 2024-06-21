import type { JWT } from "next-auth/jwt";
const ASDSSADAS = "";
export interface IToken extends JWT {
  roles?: string[];
  sid?: string;
  email?: string;
  name?: string;
  accessToken?: string;
}
