import React, { useEffect, useState } from "react";
import axios from "axios";
import Comments from "./Comments";

const API = "http://127.0.0.1:5000/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTitle) return alert("Title required");
    await axios.post(`${API}/tasks`, { title: newTitle, description: newDesc });
    setNewTitle(""); setNewDesc("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <h2>Tasks</h2>
      <input 
        type="text" 
        placeholder="Title" 
        value={newTitle} 
        onChange={(e) => setNewTitle(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Description" 
        value={newDesc} 
        onChange={(e) => setNewDesc(e.target.value)} 
      />
      <button onClick={addTask}>Add Task</button>

      {tasks.map(task => (
        <div key={task.id} style={{border: "1px solid gray", margin: "10px", padding: "10px"}}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <Comments taskId={task.id} />
        </div>
      ))}
    </div>
  );
}

export default Tasks;
