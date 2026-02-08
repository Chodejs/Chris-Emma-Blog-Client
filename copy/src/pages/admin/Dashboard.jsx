import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { formatDate, decodeHtml } from '../../utils/helpers';
import './Admin.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  // FETCH REAL POSTS
  const fetchPosts = async () => {
    try {
        const response = await api.get('/post/read.php');
        if (Array.isArray(response.data)) {
            setPosts(response.data);
        } else {
            setPosts([]);
        }
    } catch (err) {
        console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // HANDLE DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await api.delete('/post/delete.php', { data: { id } });
        // Refresh list after delete
        fetchPosts(); 
      } catch (err) {
        console.error("Error deleting post:", err);
        alert("Failed to delete post");
      }
    }
  };

  return (
    <div className="admin-container">
      {/* HEADER SECTION (Restored!) */}
      <div className="admin-header">
        <h2>Dashboard</h2>
        <Link to="/admin/create" className="create-btn">
            <FaPlus /> New Post
        </Link>
      </div>

      {/* TABLE SECTION (With Fixes) */}
      <div className="dashboard-table-container">
      <table className="dashboard-table">
        <thead>
            <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {posts.map((post) => (
                <tr key={post.id}>
                    <td>{decodeHtml(post.title)}</td>
                    <td><span className="post-category">{post.category}</span></td>
                    <td>{formatDate(post.date)}</td>
                    <td>
                        <Link to={`/admin/edit/${post.id}`} className="action-btn edit-btn">
                            <FaEdit /> Edit
                        </Link>
                        
                        <button 
                            className="action-btn delete-btn" 
                            onClick={() => handleDelete(post.id)}
                        >
                            <FaTrash /> Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Dashboard;