import { Router, type Request, type Response } from "express";
import type IAddToTodoList from "../interfaces/IAddToTodolist";
import type IRemoveFromTodoList from "../interfaces/IRemoveFromTodolist";
import TodoLists from "../db/todolists";
import type { ITodoList } from "../interfaces/ITodoList";

const todoListsRouter = Router();

todoListsRouter.post("/", async (req: Request, res: Response) => {
  const { userId, title, deadline, tasks } = req.body;

  if (!userId || !title || !deadline || !tasks) {
    return res.status(400).send("Missing required fields");
  }

  const todolist = await TodoLists.createTodoList({
    userId,
    title,
    deadline: new Date(deadline),
    createdAt: new Date(),
    tasks,
  });

  if (todolist) {
    res.status(201).json(todolist);
  } else {
    res.status(500).send("Failed to create todo list");
  }
});

todoListsRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleted = await TodoLists.deleteTodolist(id);

  if (deleted) {
    res.status(200).send("Todo list deleted");
  } else {
    res.status(404).send("Todo list not found");
  }
});

todoListsRouter.post("/add", async (req: Request, res: Response) => {
  const { todoListId, newTask } = req.body as IAddToTodoList;

  if (!todoListId || !newTask) {
    return res.status(400).send("Missing required fields");
  }

  const updatedTodoList = await TodoLists.addToTodoList({
    todoListId,
    newTask,
  });

  if (updatedTodoList) {
    res.status(200).json(updatedTodoList);
  } else {
    res.status(500).send("Failed to add task to todo list");
  }
});

todoListsRouter.post("/delete", async (req: Request, res: Response) => {
  const { todoListId, taskIdToRemove } = req.body as IRemoveFromTodoList;

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
});

todoListsRouter.patch("/", async (req: Request, res: Response) => {
  const { _id, userId, title, deadline, tasks } = req.body as ITodoList;

  if (!_id) {
    return res.status(400).send("Missing required fields");
  }

  const updatedTodoList = await TodoLists.updateTodoList({
    _id,
    userId,
    title,
    deadline,
    tasks,
    createdAt: new Date(),
  });

  if (updatedTodoList) {
    res.status(200).json(updatedTodoList);
  } else {
    res.status(500).send("Failed to update todo list");
  }
});

todoListsRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const todoList = await TodoLists.getTodoList(id);

  if (todoList) {
    res.status(200).json(todoList);
  } else {
    res.status(404).send("Todo list not found");
  }
});

export default todoListsRouter;
