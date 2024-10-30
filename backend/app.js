const express = require("express");
const cors = require("cors");
require("dotenv").config();
const auth = require("./middleware/auth");
const authenticate = require("./controllers/authenticate");
const task = require("./controllers/task");
const { sequelize } = require("./database/models");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authenticate);
app.use("/api", auth, task);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  const date = new Date();
  console.log(`${date} - listening on port ${port}`);
});
