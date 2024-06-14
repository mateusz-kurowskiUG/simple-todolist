import mongoose from "mongoose";
import todoListSchema from "./schemas/todolist";
import taskSchema from "./schemas/task";

export const todoListModel = mongoose.model("TodoList", todoListSchema);

export const taskModel = mongoose.model("Task", taskSchema);
