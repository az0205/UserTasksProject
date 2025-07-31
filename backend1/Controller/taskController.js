const Task = require("../Model/taskModel");
const User = require("../Model/userModel");

//----Adding Task-----
const createTask = async (req, res) => {
  const { description } = req.body;
  const userId = req.user.userId;

  const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "No user found",
        status: "failure",
      });
    }

    const newTask = new Task({
        userId,
        description,
    });

  const taskData = await newTask.save();

  res.json({
    status: "success",
    message: "User saved successfully",
    data: taskData,
  });
};

//----Updating Task-----
const updateTask = async (req, res) => {
  const taskid = req.params.id;
  const userId = req.user.userId;
  const editedTask = req.body;

  if (task.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to update this task.",
        status: "failure",
        error: true,
      });
    }

  const task = await Task.findByIdAndUpdate(taskid, editedTask, { new: true });

  if (task) {
    const taskData = {
        _id: task._id,
        userId: task.userId,
        description: task.description
    };

    res.status(200).json({
      status: "success",
      message: "Data updated successfully",
      data: taskData,
    });
  } else {
    res.status(400).json({
      message: "user not found",
      status: "failure",
    });
  }
};

//--------Deleting Task----
const deleteTask = async (req, res) => {

    const taskId = req.params.id;
    const userId = req.user.userId;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
        status: "failure",
        error: true,
      });
    }

    if (task.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to delete this task.",
        status: "failure",
        error: true,
      });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    return res.status(200).json({
      message: "Task deleted successfully!",
      status: "success",
      error: false,
      task: {
        _id: deletedTask._id,
        userId: deletedTask.userId,
        description: deletedTask.description,
      },
    });
};

//--------Get all tasks-------
const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    status: "success",
    message: "listed all tasks",
    data: tasks,
  });
};


//----get task by id----
const getTask = async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.userId;

    if (task.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to view this task.",
        status: "failure",
        error: true,
      });
    }

    const task = await Task.findById(taskId)

  if (task) {
      res.status(200).json({
        status: "success",
        message: "Task found",
        data: task,
      });
    } else {
      res.status(404).json({
        status: "failure",
        message: "Task not found",
      });
    }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
getTask
};