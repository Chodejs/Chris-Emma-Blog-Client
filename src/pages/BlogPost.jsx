import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; 
import { FaArrowLeft, FaCalendar, FaUser } from 'react-icons/fa';
import api from '../api/axios';
import ImageSlider from '../components/blog/ImageSlider';
import { formatDate, decodeHtml } from '../utils/helpers'; // <--- THIS WAS MISSING!
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch Data Logic (Restored)
  useEffect(() => {
    const fetchPost = async () => {
        try {
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

  // 2. Helper to parse images (New Feature)
  const getImages = (imgData) => {
    if (!imgData) return [];
    try {
        // Try parsing as JSON array
        const parsed = JSON.parse(imgData);
        if (Array.isArray(parsed)) {
            // Convert to format ImageSlider expects: { image: 'url' }
            return parsed.map(url => ({ image: url }));
        }
        // If valid JSON but not array, return single
        return [{ image: parsed }];
    } catch (e) {
        // If not JSON, it's a plain string (Legacy URL)
        return [{ image: imgData }];
    }
  };

  if (loading) return <div className="loading">Loading Article...</div>;
  
  if (error || !post) {
    return (
      <div className="post-not-found">
        <h2>{error || "Post not found!"}</h2>
        <Link to="/" className="back-link">Back to Home</Link>
      </div>
    );
  }

  // Calculate images to display
  const postImages = getImages(post.image);
  const heroImage = postImages.length > 0 ? postImages[0].image : 'https://chrisandemmashow.com/default-share-image.jpg'; // Fallback image
  const cleanTitle = decodeHtml(post.title);
  const cleanDesc = post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
  const postUrl = window.location.href; // Gets the current URL

  return (
    <div className="blog-post-container">
      <Helmet>
        {/* Standard Metadata */}
        <title>{cleanTitle} | The Chris & Emma Show</title>
        <meta name="description" content={cleanDesc} />

        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:title" content={cleanTitle} />
        <meta property="og:description" content={cleanDesc} />
        <meta property="og:image" content={heroImage} />

        {/* Twitter (X) Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={cleanTitle} />
        <meta name="twitter:description" content={cleanDesc} />
        <meta name="twitter:image" content={heroImage} />
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

      {/* RENDER SLIDER OR SINGLE IMAGE */}
      {postImages.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            {postImages.length > 1 ? (
                 <ImageSlider slides={postImages} />
            ) : (
                 <img src={postImages[0].image} alt={post.title} className="post-hero-image" />
            )}
          </div>
      )}

      <div className="post-content">
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </div>
  );
};

export default BlogPost;