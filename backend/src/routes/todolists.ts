import { Router, type Request, type Response } from "express";

const todoListsRouter = Router();

todoListsRouter.post("/", (req: Request, res: Response) => {
});
todoListsRouter.delete("/", (req: Request, res: Response) => {});
todoListsRouter.post("/add", (req: Request, res: Response) => {});
todoListsRouter.post("/delete", (req: Request, res: Response) => {});
todoListsRouter.patch("/", (req: Request, res: Response) => {});
todoListsRouter.get("/", (req: Request, res: Response) => {});

export default todoListsRouter;
