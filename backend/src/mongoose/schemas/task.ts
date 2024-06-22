import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
  text: { type: String, required: true },
  status: { type: Number, required: true, default: 0 },
});

export default taskSchema;
