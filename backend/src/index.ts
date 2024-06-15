import express, { Router } from "express";
import cors from "cors";
import Keycloak from "keycloak-connect";
import bodyParser from "body-parser";
import connectToMongo from "./db/connect";
import usersRouter from "./routes/users";
import todoListsRouter from "./routes/todolists";
import decodeJwt from "./middleware/decodeJwt";
import isAdmin from "./middleware/admin";

const app = express();
const port = process.env.BACKEND_PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const keycloak = new Keycloak({});
// app.use(keycloak.middleware()); // Uncomment if Keycloak middleware is needed

const router = Router();

router.use("/users", usersRouter);
router.use("/todolists", todoListsRouter);

app.use(router);

app.get("/admin", [decodeJwt, isAdmin], (req, res) => {
  res.send("Hello Admin");
});

app.get("/authenticated", decodeJwt, (req, res) => {
  res.send(`Hello, user with ID: ${req.token.sub}`);
});

app.listen(port, async () => {
  await connectToMongo();
  console.log(`Example app listening on port ${port}`);
});
