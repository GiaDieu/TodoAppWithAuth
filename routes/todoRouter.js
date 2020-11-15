const router = require("express").Router();
const auth = require("../middlewares/auth");
const Todo = require("../models/todoModel");

router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;
    //validate;
    if (!title) {
      res.status(400).json({ message: "Not all Fields have been entered!" });
    }

    const newTodo = new Todo({
      title,
      userId: req.user,
    });

    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/all", auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.user });

  res.json(todos);
});

router.delete("/:id", auth, async (req, res) => {
  const todo = await Todo.findOne({ userId: req.user, _id: req.params.id });
  if (!todo)
    return res.status(400).json({
      message: "No Todo found with this ID that belongs to the current user.",
    });

  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.json(deletedTodo);
});
module.exports = router;
