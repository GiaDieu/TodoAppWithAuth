const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//set up express;

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`the server has started on Port: ${PORT}`);
});

// connect to DB
mongoose.connect(
  process.env.MONGODB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MONGODB connection established");
  },
);

//router
const userRouter = require("./routes/userRouter");
const todoRouter = require("./routes/todoRouter");

app.use("/users", userRouter);
app.use("/todo", todoRouter);
