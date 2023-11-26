const express = require("express");
const cors = require("cors");
const todosRouter = require("./routes/todos");

const app = express();

const port = 3010;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/todos", todosRouter);

app.get("/", (req, res) => {
  return res.json("Hello, Express!");
});

app.listen(port, () => {
  console.log(`🚀 Server is listening on port : ${port}`);
});
