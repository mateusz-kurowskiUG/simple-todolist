import mongoose from "mongoose";
import taskSchema from "./task";
const { Schema } = mongoose;

const todoListSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  tasks: { type: [taskSchema], required: true },
});

export default todoListSchema;
