import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000/api";

function Comments({ taskId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const res = await axios.get(`${API}/tasks/${taskId}/comments`);
    setComments(res.data);
  };

  const addComment = async () => {
    if (!newComment) return alert("Comment body required");
    await axios.post(`${API}/tasks/${taskId}/comments`, {
      body: newComment,
      author: author || "Anonymous"
    });
    setNewComment(""); setAuthor("");
    fetchComments();
  };

  const deleteComment = async (id) => {
    await axios.delete(`${API}/comments/${id}`);
    fetchComments();
  };

  return (
    <div style={{marginTop: "10px"}}>
      <h4>Comments</h4>
      <input 
        type="text" 
        placeholder="Author" 
        value={author} 
        onChange={e => setAuthor(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Comment" 
        value={newComment} 
        onChange={e => setNewComment(e.target.value)} 
      />
      <button onClick={addComment}>Add Comment</button>
      {comments.map(c => (
        <div key={c.id} style={{borderTop: "1px solid #ccc"}}>
          <p><strong>{c.author}:</strong> {c.body}</p>
          <button onClick={() => deleteComment(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Comments;
