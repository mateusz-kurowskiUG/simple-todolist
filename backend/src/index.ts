import { Router } from "express";
import express from "express";
import usersRouter from "./routes/users";
import todoListsRouter from "./routes/todolists";
import connectToMongo from "./db/connect";
import Keycloak from "keycloak-connect";
import cors from "cors";
import isAdmin from "./middleware/admin";

const app = express();
app.use(cors());

const keycloak = new Keycloak({});

app.use(keycloak.middleware());
const port = process.env.BACKEND_PORT || 5000;

const router = Router();

router.use(usersRouter);
router.use(todoListsRouter);

app.use(router);

router.get("/hello", (req, res) => {
  res.send("Hello anonymous!");
});

router.get("/admin", [isAdmin], (req, res) => {
  console.log(1);

  res.send("Hello admin!");
});

app.listen(port, async () => {
  await connectToMongo();
  console.log(`Example app listening on port ${port}`);
});
