import { Router, type Request, type Response } from "express";
import KeycloakF from "../keycloak";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const usersRouter = Router();

// ADMIN ONLY
usersRouter.delete("/", (req: Request, res: Response) => {});
usersRouter.patch("/", (req: Request, res: Response) => {});
usersRouter.get("/", (req: Request, res: Response) => {});

export default usersRouter;
