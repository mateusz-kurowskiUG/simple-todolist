import { Router } from "express";
import express from "express";
import usersRouter from "./routes/users";
import todoListsRouter from "./routes/todolists";
import connectToMongo from "./db/connect";
import cors from "cors";
import Keycloak from "keycloak-connect";
import bodyParser, { json } from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const keycloak = new Keycloak({});
// app.use(keycloak.middleware());
const port = process.env.BACKEND_PORT || 5000;

const router = Router();

router.use("/users", usersRouter);
router.use("/todolists", todoListsRouter);

app.use(router);

app.listen(port, async () => {
  await connectToMongo();
  console.log(`Example app listening on port ${port}`);
});
