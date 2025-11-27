import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios'; // <--- Import Axios
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
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

  // HANDLE DELETE (We will update this in a second)
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
      <div className="admin-header">
        <h2>Dashboard</h2>
        <Link to="/admin/create" className="create-btn">
            <FaPlus /> New Post
        </Link>
      </div>

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
                    <td>{post.title}</td>
                    <td><span className="post-category">{post.category}</span></td>
                    <td>{post.date}</td>
                    <td>
                        {/* We will build the Edit page next */}
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
  );
};

export default Dashboard;