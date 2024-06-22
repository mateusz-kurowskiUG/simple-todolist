import type { Session } from "next-auth";
import type ISessionUser from "./ISession";

interface ICustomSession extends Session {
  user: ISessionUser;
  token: string;
}

export default ICustomSession;
