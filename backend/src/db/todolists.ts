import mongoose, { type Types } from "mongoose";
import type { ITodoList } from "../interfaces/ITodoList";
import taskSchema from "../mongoose/schemas/task";
import { taskModel, todoListModel } from "../mongoose/models";
import type IAddToTodoList from "../interfaces/IAddToTodolist";
import type IRemoveFromTodoList from "../interfaces/IRemoveFromTodolist";

const createTodoList = async (
  todolist: Omit<ITodoList, "_id">
): Promise<ITodoList | false> => {
  try {
    const newTodolist = new todoListModel(todolist);
    const xd = newTodolist.toObject();
    await newTodolist.validate();
    const { _id } = await todoListModel.create(todolist);
    return { _id: _id.toString(), ...todolist };
  } catch (_) {
    return false;
  }
};
const deleteTodolist = async (
  _id: string | Types.ObjectId
): Promise<boolean> => {
  try {
    const foundOne = await todoListModel.findOneAndDelete({ _id });
    if (!foundOne) throw Error("Document does not exist");
    return true;
  } catch (e) {
    return false;
  }
};
const removeFromTodoList = async (
  update: IRemoveFromTodoList
): Promise<ITodoList | false> => {
  try {
    const todolist = await todoListModel.findOne({ _id: update.todoListId });
    if (!todolist) throw new Error("Todolist not found");

    const taskIndex = todolist.tasks.findIndex(
      (task) => task._id?.toString() === update.taskIdToRemove
    );
    if (taskIndex === -1) return false;

    todolist.tasks.splice(taskIndex, 1);
    await todolist.save();

    const { _id, userId, title, deadline, createdAt, tasks } = todolist;
    return {
      _id: _id.toString(),
      userId,
      title,
      deadline,
      createdAt,
      tasks: tasks.toObject(),
    };
  } catch (e) {
    console.log(e);
    return false;
  }
};

const addToTodoList = async (
  update: IAddToTodoList
): Promise<ITodoList | false> => {
  try {
    const todolist = await todoListModel.findOne({ _id: update.todoListId });
    if (!todolist) throw Error("Todolist not found");

    const newTask = new taskModel({ text: update.newTask });
    await newTask.validate();
    todolist.tasks.push(newTask);
    todolist.save();
    const { _id, userId, title, deadline, createdAt, tasks } = todolist;
    return {
      userId,
      title,
      deadline,
      createdAt,
      tasks: tasks.toObject(),
      _id: _id.toString(),
    };
  } catch (e) {
    return false;
  }
};
const updateTodoList = async (
  todolist: ITodoList
): Promise<ITodoList | false> => {
  try {
    const updatedTodolist = await todoListModel.findByIdAndUpdate(
      todolist._id,
      todolist,
      { new: true }
    );

    if (!updatedTodolist) throw Error("Todolist not found");

    const { _id, userId, title, deadline, createdAt, tasks } = updatedTodolist;
    return {
      _id: _id.toString(),
      userId,
      title,
      deadline,
      createdAt,
      tasks: tasks.toObject(),
    };
  } catch (e) {
    return false;
  }
};

const getTodoList = async (id: string): Promise<ITodoList | false> => {
  try {
    const todolist = await todoListModel.findById(id);

    if (!todolist) throw Error("Todolist not found");

    const { _id, userId, title, deadline, createdAt, tasks } = todolist;
    return {
      _id: _id.toString(),
      userId,
      title,
      deadline,
      createdAt,
      tasks: tasks.toObject(),
    };
  } catch (e) {
    return false;
  }
};
const getTodolistsByUser = async (userId: string): Promise<ITodoList[]> => {
  const todolists = await todoListModel.find({ userId });
  return todolists.map(({ _id, userId, title, deadline, createdAt, tasks }) => {
    return {
      _id: _id.toString(),
      userId,
      title,
      deadline,
      createdAt,
      tasks: tasks.toObject(),
    };
  });
};
const TodoLists = {
  createTodoList,
  deleteTodolist,
  addToTodoList,
  removeFromTodoList,
  updateTodoList,
  getTodoList,
  getTodolistsByUser,
};

export default TodoLists;
