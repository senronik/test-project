import React, { createContext, useState, useEffect, useContext } from 'react';

const TaskContext = createContext();
import axios from "../api/axios";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async (filters = {}) => {
    console.log("filters",filters)
    try {
      const { data } = await axios.get('/tasks/', { params: filters });
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    console.log("taskData",taskData)
    try {
      const { data } = await axios.post('/tasks/', taskData);
      setTasks((prevTasks) => [...prevTasks, data]);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const { data } = await axios.put(`/tasks/${id}`, taskData);
      setTasks((prevTasks) => prevTasks.map((task) => task._id === id ? data : task));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };


  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask, fetchTasks, loading }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
