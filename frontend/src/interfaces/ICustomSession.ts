import ISessionUser from "./ISession";

interface CustomSession {
  user: ISessionUser;
  token: string;
}

export default CustomSession;
