import { Router, type Request, type Response } from "express";
import type IAddToTodoList from "../interfaces/IAddToTodolist";
import type IRemoveFromTodoList from "../interfaces/IRemoveFromTodolist";
import TodoLists from "../db/todolists";
import type { ITodoList } from "../interfaces/ITodoList";
import decodeJwt from "../middleware/decodeJwt";
import isAuthenticated from "../middleware/authenticated";

const todoListsRouter = Router();

todoListsRouter.post(
  "/",
  [decodeJwt, isAuthenticated],
  async (req: Request, res: Response) => {
    const { title, deadline, tasks } = req.body;
    const { userId } = req;
    if (!userId || !title || !deadline || !tasks)
      return res.status(400).send("Missing required fields");

    const todolist = await TodoLists.createTodoList({
      userId,
      title,
      deadline: new Date(deadline),
      createdAt: new Date(),
      tasks,
    });

    if (todolist) return res.status(201).json(todolist);

    return res.status(500).send("Failed to create todo list");
  }
);

todoListsRouter.delete(
  "/:id",
  [decodeJwt, isAuthenticated],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req;

    const todolist = await TodoLists.getTodoList(id);

    if (!todolist || todolist.userId !== userId)
      return res.status(404).json({ message: "Todolist does not exist" });

    const deleted = await TodoLists.deleteTodolist(id);

    if (deleted) return res.status(200).send("Todo list deleted");
    return res.status(404).send("Todo list not found");
  }
);

todoListsRouter.post(
  "/add",
  [decodeJwt, isAuthenticated],
  async (req: Request, res: Response) => {
    const { userId } = req.token;
    const { todoListId, newTask } = req.body as IAddToTodoList;

    const todolist = await TodoLists.getTodoList(todoListId);
    if (!todolist || todolist.userId !== userId)
      return res.status(404).json({ message: "Todolist does not exist" });

    if (!todoListId || !newTask)
      return res.status(400).send("Missing required fields");

    const updatedTodoList = await TodoLists.addToTodoList({
      todoListId,
      newTask,
    });

    if (updatedTodoList) {
      res.status(200).json(updatedTodoList);
    } else {
      res.status(500).send("Failed to add task to todo list");
    }
  }
);

todoListsRouter.post(
  "/delete",
  [decodeJwt, isAuthenticated],
  async (req: Request, res: Response) => {
    const { userId } = req.token;
    const { todoListId, taskIdToRemove } = req.body as IRemoveFromTodoList;

    const todolist = await TodoLists.getTodoList(todoListId);
    if (!todolist || todolist.userId !== userId)
      return res.status(404).json({ message: "Todolist does not exist" });

    if (!todoListId || !taskIdToRemove) {
      return res.status(400).send("Missing required fields");
    }

    const updatedTodoList = await TodoLists.removeFromTodoList({
      todoListId,
      taskIdToRemove,
    });

    if (updatedTodoList) {
      res.status(200).json(updatedTodoList);
    } else {
      res.status(500).send("Failed to remove task from todo list");
    }
  }
);

todoListsRouter.patch(
  "/",
  [decodeJwt, isAuthenticated],
  async (req: Request, res: Response) => {
    const { userId } = req;
    const { _id, title, deadline, tasks } = req.body as ITodoList;

    if (!_id || !userId) {
      return res.status(400).send("Missing required fields");
    }

    const todolist = await TodoLists.getTodoList(_id);
    if (!todolist || todolist.userId !== req.token.userId)
      return res.status(404).json({ message: "Todolist does not exist" });

    const updatedTodoList = await TodoLists.updateTodoList({
      _id,
      userId,
      title,
      deadline,
      tasks,
      createdAt: todolist.createdAt,
    });

    if (updatedTodoList) return res.status(200).json(updatedTodoList);
    return res.status(500).send("Failed to update todo list");
  }
);

todoListsRouter.get(
  "/user",
  [decodeJwt, isAuthenticated],
  async (req: Request, res: Response) => {
    const { userId } = req;
    if (!userId) return res.status(403).json({ message: "not authenticated" });
    const todoList = await TodoLists.getTodolistsByUser(userId);

    return res.status(200).json(todoList);
  }
);
todoListsRouter.get(
  "/:id",
  [decodeJwt, isAuthenticated],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req;

    const todoList = await TodoLists.getTodoList(id);

    if (todoList && todoList.userId === userId)
      return res.status(200).json(todoList);
    return res.status(404).send("Todo list not found");
  }
);

export default todoListsRouter;
