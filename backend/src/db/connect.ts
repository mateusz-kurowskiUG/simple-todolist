import mongoose from "mongoose";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const mongoUri = process.env.MONGO_URI!;
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASSWORD;
const connectToMongo = async () => {
  try {
    mongoose
      .connect(mongoUri, { autoCreate: true, user, pass, authSource: "admin" })
      .then(() => {
        console.log("Connected to mongo");
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export default connectToMongo;
