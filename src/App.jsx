import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./index.css";

export const App = () => {
  const contractAddress = "0x12853Fde24a110bd397762bB517173BD4cB5902B";
  const [taskTitle, setTaskTitle] = useState("");
  const [taskText, setTaskText] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteTasks, setDeleteTask] = useState("");
  const [getTask, setGetTask] = useState([]);

  async function requestAccounts() {
    if (typeof window.ethereum === "undefined") {
      toast.error("Please install MetaMask!");
      return;
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function addTask() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await requestAccounts();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const myContract = new ethers.Contract(contractAddress, abi, signer);

        const tx = await myContract.addTask(taskText, taskTitle, isDeleted);
        await tx.wait();
        toast.success("Task Added Successfully!");
        setTaskTitle("");
        setTaskText("");
        setIsDeleted(false);
      } catch (err) {
        console.error("Transaction Failed", err);
        toast.error("Failed to Add Task. Please try again.");
      }
    }
  }

  async function deleteTask() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await requestAccounts();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const myContract = new ethers.Contract(contractAddress, abi, signer);

        const tx = await myContract.deleteTask(deleteTasks);
        await tx.wait();
        toast.success("Task Deleted Successfully!");
        setDeleteTask("");
      } catch (err) {
        console.error("Transaction Failed", err);
        toast.error("Failed to Delete Task. Please try again.");
      }
    }
  }

  async function getMyTask() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await requestAccounts();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const myContract = new ethers.Contract(contractAddress, abi, signer);

        const tasks = await myContract.getMyTask();
        setGetTask(tasks.map(task => ({
          id: task.id.toString(),
          taskTitle: task.taskTitle,
          taskText: task.taskText,
          isDeleted: task.isDeleted
        })));
        toast.success("Task Fetched Successfully!");
      } catch (err) {
        console.error("Transaction Failed", err);
        toast.error("Failed to Fetch Task. Please try again.");
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <h1>Task Manager</h1>

        <div className="form-group">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter Task Title"
            className="input-field"
          />
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter Task Description"
            className="input-field"
          />
          <label>
            <input
              type="checkbox"
              checked={isDeleted}
              onChange={(e) => setIsDeleted(e.target.checked)}
            />
            Mark as Deleted
          </label>
          <button onClick={addTask} className="btn">Add Task</button>
        </div>

        <div className="form-group">
          <input
            type="number"
            value={deleteTasks}
            onChange={(e) => setDeleteTask(e.target.value)}
            placeholder="Enter Task ID to Delete"
            className="input-field"
          />
          <button onClick={deleteTask} className="btn">Delete Task</button>
        </div>

        <div className="form-group">
          <button onClick={getMyTask} className="btn">Get Tasks</button>
          {getTask.length > 0 && (
            <ul className="task-list">
              {getTask.map((task, index) => (
                <li key={index} className="task-item">
                  <strong>ID: {task.id}</strong><br />
                  <strong>Title:</strong> {task.taskTitle}<br />
                  <strong>Description:</strong> {task.taskText}<br />
                  <strong>Status:</strong> {task.isDeleted ? "Deleted" : "Active"}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
