const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
require("dotenv").config();
const auth = require("./middleware/auth");
const authenticate = require("./routes/authenticate");
const task = require("./routes/task");
const { sequelize } = require("./database/models");

const app = express();

app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use("/auth", authenticate);
app.use(auth);
app.use("/api", task);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  const date = new Date();
  console.log(`${date} - listening on port ${port}`);
});
