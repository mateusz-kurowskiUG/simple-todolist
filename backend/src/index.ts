import express, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectToMongo from "./db/connect";
import usersRouter from "./routes/users";
import todoListsRouter from "./routes/todolists";
import isAdmin from "./middleware/admin";
import adminRouter from "./routes/admin";
import isAuthenticated from "./middleware/authenticated";

const app = express();
const port = process.env.BACKEND_PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const router = Router();

router.use("/api/users", usersRouter);
router.use("/api/todolists", todoListsRouter);
router.use("/api/admin", adminRouter);
app.use(router);

app.get("/admin", [isAuthenticated, isAdmin], (req, res) => {
  res.send("Hello Admin");
});

app.get("/authenticated", isAuthenticated, (req, res) => {
  res.send(`Hello, user with ID: ${req.token.sub}`);
});

app.listen(port, async () => {
  await connectToMongo();
  console.log(`Example app listening on port ${port}`);
});
