import { Router, type Request, type Response } from "express";

const usersRouter = Router();

// ADMIN ONLY

usersRouter.post("/register", (req: Request, res: Response) => {});
usersRouter.delete("/", (req: Request, res: Response) => {});
usersRouter.patch("/", (req: Request, res: Response) => {});
usersRouter.get("/", (req: Request, res: Response) => {});

export default usersRouter;
