import { Router, type Request, type Response } from "express";
import { todoListModel } from "../mongoose/models";
import isAdmin from "../middleware/admin";
import isAuthenticated from "../middleware/authenticated";
const adminRouter = Router();

adminRouter.get(
  "/todolists",
  [isAuthenticated, isAdmin],
  async (req: Request, res: Response) => {
    const todolists = await todoListModel.find();
    res.status(200).json(todolists);
    return;
  }
);
adminRouter.get(
  "/todolists/:_id",
  [isAuthenticated, isAdmin],
  async (req: Request, res: Response) => {
    const { _id } = req.params;
    if (!_id)
      return res
        .status(400)
        .json({ message: "please provide valid id for todolist" });
    const todolist = await todoListModel.findOne({ _id });
    res.status(200).json(todolist);
    return;
  }
);

adminRouter.delete(
  "/todolists/:_id",
  [isAuthenticated, isAdmin],
  async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      const todolist = await todoListModel.findByIdAndDelete(_id);
      if (!todolist)
        return res.status(404).json({ message: "Todolist not found" });

      res.status(200).json(todolist);
    } catch (e) {
      return res.status(400).json(e);
    }
  }
);

export default adminRouter;
