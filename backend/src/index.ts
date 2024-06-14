import { Router } from "express";
import express from "express";
import usersRouter from "./routes/users";
import todoListsRouter from "./routes/todolists";
import connectToMongo from "./db/connect";
import keycloak from "./keycloak";
import cors from "cors";

const app = express();
app.use(cors());
app.use(keycloak.middleware());
const port = process.env.BACKEND_PORT || 5000;

const router = Router();

router.use(usersRouter);
router.use(todoListsRouter);

app.use(router);

app.get("/hello", (req, res) => {
  res.send("Hello Admin!");
});
app.get("/admin", [keycloak.protect("admin")], (req, res) => {
  console.log("ADMIN!");

  res.send("Hello World!");
});
app.get("/user", [keycloak.protect("user")], (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  await connectToMongo();
  console.log(`Example app listening on port ${port}`);
});
