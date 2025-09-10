// frontend/src/App.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [filter, setFilter] = useState("all"); // "all", "completed", "incomplete"


  // const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/api";
  // const API_URL = "https://chronous-production.up.railway.app"

  const API_URL = import.meta.env.VITE_API_URL;
  console.log("API URL:", API_URL);


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error("fetchTasks error", err);
    }
  };

  // Task CRUD
  const addOrUpdateTask = async () => {
    if (!title.trim()) return;
    try {
      if (editTaskId) {
        await axios.put(`${API_URL}/tasks/${editTaskId}`, { title, description });
        setEditTaskId(null);
      } else {
        await axios.post(`${API_URL}/tasks`, { title, description });
      }
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error("task save error", err);
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
    fetchTasks();
  };

  // Comment CRUD
  const addOrUpdateComment = async (taskId) => {
    if (!comment.trim()) return;
    try {
      if (editCommentId) {
        await axios.put(`${API_URL}/comments/${editCommentId}`, {
          body: comment,
          author: author || "Anon",
        });
        setEditCommentId(null);
      } else {
        await axios.post(`${API_URL}/tasks/${taskId}/comments`, {
          body: comment,
          author: author || "Anon",
        });
      }
      setComment("");
      setAuthor("");
      fetchTasks();
    } catch (err) {
      console.error("comment save error", err.response?.data || err.message);
    }
  };

  const deleteComment = async (id) => {
    await axios.delete(`${API_URL}/comments/${id}`);
    fetchTasks();
  };

  const toggleTask = async (id, completed) => {
    await axios.put(`${API_URL}/tasks/${id}`, { completed });
    fetchTasks();
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true; // all
  });


  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="w-full px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center mb-8 text-white drop-shadow-lg">
          Chronous
        </h1>

        {/* Add / Edit Task */}
        <div className="bg-white/10 backdrop-blur-md text-white p-6 rounded-2xl shadow-xl mb-10">
          <h2 className="text-2xl font-bold mb-4">
            {editTaskId ? "✏️ Edit Task" : "➕ Add Task"}
          </h2>
          <input
            className="w-full p-3 mb-3 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-3 mb-3 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* ✅ CHANGED: buttons + filter toggle in one line */}
          <div className="flex flex-col sm:flex-row md:flex-row justify-between items-stretch sm:items-center flex-wrap gap-3">
            <div className="flex flex-col sm-flex-row md:flex-row gap-3 w-full sm:w-auto md:w-auto">
              <button
                onClick={addOrUpdateTask}
                className="bg-indigo-600 hover:bg-indigo-800 transition px-6 py-2 rounded-lg font-bold w-full sm:w-auto"
              >
                {editTaskId ? "Update Task" : "Add Task"}
              </button>
              {editTaskId && (
                <button
                  onClick={() => {
                    setEditTaskId(null);
                    setTitle("");
                    setDescription("");
                  }}
                  className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg w-full sm:w-auto"
                >
                  Cancel
                </button>
              )}
            </div>


            {/* ✅ NEW: Filter Dropdown */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-700 hover:bg-gray-900 px-4 py-2  rounded-lg text-white w-full sm:max-w-xs md:max-w-xs flex-shrink-0"
            >
              <option value="all">Show All</option>
              <option value="completed">Show Completed</option>
              <option value="incomplete">Show Incomplete</option>
            </select>

          </div>
        </div>

        {/* Task List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-white hover:scale-105 transition overflow-visible"
            >
              {/* Title + Toggle in one line */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">
                  {task.completed ? (
                    <span className="line-through text-gray-400">{task.title}</span>
                  ) : (
                    task.title
                  )}
                </h2>
                <button
                  onClick={() => toggleTask(task.id, !task.completed)}
                  className={`${task.completed
                    ? "bg-green-600 hover:bg-green-800"
                    : "bg-gray-500 hover:bg-gray-700"
                    } px-3 py-1 rounded text-sm`}
                >
                  {task.completed ? "✅ Done" : "⏳Pending"}
                </button>
              </div>


              <p className="mb-4 text-gray-200">{task.description}</p>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row lg:flex-row gap-2 w-full">
                {/* Edit + Delete in a row on tablets and above */}
                <div className="flex flex-row lg:flex-row md:flex-row  gap-2 w-full">
                  <button
                    onClick={() => {
                      setTitle(task.title);
                      setDescription(task.description);
                      setEditTaskId(task.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-yellow-500 hover:bg-yellow-700 px-3 py-2 rounded text-center w-full"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded text-center w-full"
                  >
                    🗑 Delete
                  </button>
                </div>

                <button
                  onClick={() =>
                    setSelectedTask(selectedTask === task.id ? null : task.id)
                  }
                  className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded text-center lg:w-full"
                >
                  💬 Comments
                </button>
              </div>

              {/* Comments Section */}
              {selectedTask === task.id && (
                <div className="bg-black/30 p-3 rounded-lg mt-3">
                  <h3 className="font-semibold mb-2">Comments</h3>

                  {/* comment list */}
                  <div className="space-y-2 mb-3">
                    {(task.comments || []).length > 0 ? (
                      task.comments.map((c) => (
                        <div
                          key={c.id}
                          className="flex justify-between items-start bg-white/10 p-2 rounded"
                        >
                          <div className="min-w-0">
                            <p className="text-sm">
                              <strong>{c.author || "Anon"}:</strong>{" "}
                              <span className="text-gray-100">{c.body}</span>
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(c.created_at).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex flex-wrap md:flex-nowrap gap-2 ml-0 md:ml-4 mt-2 md:mt-0">
                            <button
                              onClick={() => {
                                setComment(c.body);
                                setAuthor(c.author || "");
                                setEditCommentId(c.id);
                              }}
                              className="text-yellow-300 hover:text-yellow-500 px-3 py-1 rounded bg-yellow-900/20 text-sm md:text-base w-full md:w-auto text-center"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => deleteComment(c.id)}
                              className="text-red-400 hover:text-red-600 px-3 py-1 rounded bg-red-900/20 text-sm md:text-base w-full md:w-auto text-center"
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-300 text-sm italic">No comments yet</p>
                    )}
                  </div>

                  {/* Add/Edit Comment */}
                  <div className="flex flex-col sm:flex-row md:flex-row gap-2 mt-3 items-stretch w-full">
                    <input
                      className="flex-1 min-w-0 p-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none w-full sm:w-auto md:w-auto"
                      placeholder="Your name"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                    <input
                      className="flex-1 min-w-0 p-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none w-full sm:w-auto md:w-auto"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      onClick={() => addOrUpdateComment(task.id)}
                      className="w-full sm:w-auto flex-shrink-0 bg-green-600 hover:bg-green-800 px-4 py-2 rounded w-full sm:w-auto text-center"
                    >
                      {editCommentId ? "Update" : "Add"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
