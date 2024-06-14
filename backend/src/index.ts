import { Router } from "express";
import express from "express";
import usersRouter from "./routes/users";
import todoListsRouter from "./routes/todolists";
import connectToMongo from "./db/connect";
const app = express();
const port = 3000;

const router = Router();

router.use(usersRouter);
router.use(todoListsRouter);

app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  await connectToMongo();
  console.log(`Example app listening on port ${port}`);
});
