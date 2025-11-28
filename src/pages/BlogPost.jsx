import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; 
import { FaArrowLeft, FaCalendar, FaUser } from 'react-icons/fa';
import api from '../api/axios'; // <--- Use Real API
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
        try {
            // Call the PHP Endpoint
            const response = await api.get(`/post/single_read.php?id=${id}`);
            
            if (response.data.message === 'Post Not Found') {
                setError('Post not found in database.');
            } else {
                setPost(response.data);
            }
        } catch (err) {
            console.error("Error fetching post:", err);
            setError("Failed to load post.");
        } finally {
            setLoading(false);
        }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div className="loading">Loading Article...</div>;
  
  if (error || !post) {
    return (
      <div className="post-not-found">
        <h2>{error || "Post not found!"}</h2>
        <Link to="/" className="back-link">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <Helmet>
        <title>{post.title} | Chris & Emma Press</title>
        {/* Strip HTML tags for the meta description */}
        <meta name="description" content={post.content.replace(/<[^>]*>?/gm, '').substring(0, 150)} />
      </Helmet>

      <Link to="/" className="back-button">
        <FaArrowLeft /> Back to Posts
      </Link>

      <div className="post-header">
        <span className="post-category">{post.category}</span>
        <h1>{post.title}</h1>
        <div className="post-meta-data">
          <span><FaCalendar /> {post.date}</span>
          <span><FaUser /> {post.author}</span>
        </div>
      </div>

      {post.image && (
          <img src={post.image} alt={post.title} className="post-hero-image" />
      )}

      <div className="post-content">
        {/* DANGEROUSLY SET HTML (Needed for Rich Text Editor content) */}
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </div>
  );
};

export default BlogPost;