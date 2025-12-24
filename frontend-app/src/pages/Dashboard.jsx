import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Header from '../components/common/Header';

const Dashboard = () => {
  const { tasks, createTask, updateTask, deleteTask, loading, fetchTasks } = useTasks();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('add');
  const [currentTask, setCurrentTask] = useState({ id: null, title: '', description: '', status: 'incomplete' });

  useEffect(() => {
    fetchTasks({searchQuery,statusFilter});  
  }, [searchQuery,statusFilter]);


  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const handleAddTask = () => {
    createTask(currentTask);
    resetModal();
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task._id === id);
    setCurrentTask(taskToEdit);
    setModalAction('edit');
    setModalOpen(true);
  };

  const handleUpdateTask = () => {
    console.log("currentTask",currentTask)
    updateTask(currentTask._id , currentTask);
    resetModal();
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  const resetModal = () => {
    setCurrentTask({ id: null, title: '', description: '', status: 'incomplete' });
    setModalAction('add');
    setModalOpen(false);
  };

  return (
    <>
      <Header/>
      <div className='container mx-auto'>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Task Management</h1>
          <button
            onClick={toggleModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All Status</option>
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Task Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Description</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border-b">
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">{task.title}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">{task.description}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">{task.status}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleEditTask(task._id)}
                      className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {modalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-96 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  {modalAction === 'add' ? 'Add Task' : 'Edit Task'}
                </h2>
                <button onClick={resetModal} className="text-gray-500">
                  <span>&times;</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700">Task Name</label>
                  <input
                    type="text"
                    id="name"
                    name="title"
                    value={currentTask.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Task Name"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-gray-700">Description</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={currentTask.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Task Description"
                  />
                </div>
                <div>
                  <label htmlFor="status" className="block text-gray-700">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={currentTask.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={resetModal}
                  className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={modalAction === 'add' ? handleAddTask : handleUpdateTask}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  {modalAction === 'add' ? 'Add Task' : 'Update Task'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default Dashboard;
