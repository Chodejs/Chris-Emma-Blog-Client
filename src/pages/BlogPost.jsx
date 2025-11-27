import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // For SEO
import { mockPosts } from '../api/mockData';
import { FaArrowLeft, FaCalendar, FaUser } from 'react-icons/fa';
import './BlogPost.css'; // We will make this next

const BlogPost = () => {
  const { id } = useParams();
  
  // Find the post that matches the ID from the URL
  // Note: params are strings, so we convert post.id to string for comparison
  const post = mockPosts.find((p) => p.id.toString() === id);

  if (!post) {
    return (
      <div className="post-not-found">
        <h2>Post not found!</h2>
        <Link to="/" className="back-link">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      {/* Dynamic SEO Title */}
      <Helmet>
        <title>{post.title} | Chris & Emma Press</title>
        <meta name="description" content={post.excerpt} />
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

      <img src={post.image} alt={post.title} className="post-hero-image" />

      <div className="post-content">
        {/* Since we don't have HTML content in mock data yet, we'll repeat the excerpt to simulate a long article */}
        <p className="lead">{post.excerpt}</p>
        <hr />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default BlogPost;