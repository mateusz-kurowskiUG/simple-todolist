import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI!;

const connectToMongo = async () => {
  await mongoose.connect(mongoUri);
};
export default connectToMongo;
