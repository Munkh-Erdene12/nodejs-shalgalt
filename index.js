const express = require("express");
const db = require("./config/");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const app = express();

db();

const userRouter = require("./router/user");
const categoryRouter = require("./router/category");
const contentRouter = require("./router/content");
const error = require("./middleware/error");
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/content", contentRouter);
app.use("/api/category", categoryRouter);
app.use(error);
app.listen(3000);
