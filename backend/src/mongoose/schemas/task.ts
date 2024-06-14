import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
  text: { type: String, required: true },
});

export default taskSchema;
