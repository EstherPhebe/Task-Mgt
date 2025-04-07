const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
require("dotenv").config();
const auth = require("./middleware/auth");
const { limiter } = require("./middleware/ratelimit");
const authenticate = require("./routes/authenticate");
const task = require("./routes/task");
const user = require("./routes/user");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", //Talks to frontend URL
    credentials: true, // Allow cookies to be sent
  })
);
app.use(cookieparser());
app.use(express.json());
app.use(limiter);
app.use("/auth", authenticate);
app.use(auth);
app.use("/api", task, user);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  const date = new Date();
  console.log(`${date} - listening on port ${port}`);
});
