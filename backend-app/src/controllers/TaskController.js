const Task = require("../models/Task");
const mongoose = require("mongoose");

const createTask = async (req, res) => {
  try {
    console.log("req.user",req.user)
    const { title, description , status } = req.body;
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const newTask = new Task({ title, description , status , userId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.log("errr",err )
    res.status(400).json({ message: "Error creating task", error: err });
  }
};


const getTasks = async (req, res) => {
  try {
    const { searchQuery, statusFilter } = req.query;
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const filter = {userId:userId};
    if (statusFilter) {
      filter.status = statusFilter; 
    }
    if (searchQuery) {
      filter.title = { $regex: searchQuery, $options: "i" }; 
    }

    const tasks = await Task.find(filter); 
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: "Error fetching tasks", error: err });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: "Error fetching task", error: err });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: "Error updating task", error: err });
  }
};

const deleteTask = async (req, res) => {
  console.log("req.user",req.user)
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully", task });
  } catch (err) {
    res.status(400).json({ message: "Error deleting task", error: err });
  }
};


module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
}