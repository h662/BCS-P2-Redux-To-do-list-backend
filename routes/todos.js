const express = require("express");

const router = express.Router();

let todoId = 1;
let todos = [{ id: 1, title: "🧹 청소하기", isDone: false }];

// To do 생성
router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title) return res.status(400).json({ message: "Not exist title." });

  todoId++;

  let newTodo = { id: todoId, title, isDone: false };

  todos.push(newTodo);

  return res.json({ todo: newTodo });
});

// 전체 Todo 가져오기
router.get("/", (req, res) => {
  return res.json({ todos });
});

// 특정 Todo 가져오기
router.get("/:todoId", (req, res) => {
  const { todoId } = req.params;

  let existTodo;

  todos.map((v) => {
    if (v.id === +todoId) existTodo = v;
  });

  if (!existTodo) return res.status(400).json({ message: "Not exist todo." });

  return res.json({ todo: existTodo });
});

// Todo 완료
router.put("/:todoId/done", (req, res) => {
  const { todoId } = req.params;

  let updateTodo;

  todos = todos.map((v) => {
    if (v.id === +todoId) {
      updateTodo = { id: v.id, title: v.title, isDone: !v.isDone };

      return updateTodo;
    } else {
      return v;
    }
  });

  return res.json({ todo: updateTodo });
});

// Todo 수정
router.put("/:todoId", (req, res) => {
  const { todoId } = req.params;
  const { title } = req.body;

  if (!title) return res.status(400).json({ message: "Not exist title." });

  let updateTodo;

  todos = todos.map((v) => {
    if (v.id === +todoId) {
      updateTodo = { id: v.id, title, isDone: v.isDone };

      return updateTodo;
    } else {
      return v;
    }
  });

  return res.json({ todo: updateTodo });
});

// Todo 삭제
router.delete("/:todoId", (req, res) => {
  const { todoId } = req.params;

  todos = todos.filter((v) => {
    if (v.id !== +todoId) {
      return v;
    }
  });

  return res.json({ message: "Delete success." });
});

module.exports = router;
