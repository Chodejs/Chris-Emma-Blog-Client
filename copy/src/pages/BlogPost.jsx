import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; 
import { FaArrowLeft, FaCalendar, FaUser } from 'react-icons/fa';
import api from '../api/axios';
import ImageSlider from '../components/blog/ImageSlider';
import { formatDate, decodeHtml } from '../utils/helpers';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch Data Logic
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

  // 2. Helper to parse images
  const getImages = (imgData) => {
    if (!imgData) return [];
    try {
        const parsed = JSON.parse(imgData);
        if (Array.isArray(parsed)) {
            return parsed.map(url => ({ image: url }));
        }
        return [{ image: parsed }];
    } catch (e) {
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
  const heroImage = postImages.length > 0 ? postImages[0].image : 'https://chrisandemmashow.com/default-share-image.jpg';
  
  // FIX 1: Ensure we use this variable in the <h1> below!
  const cleanTitle = decodeHtml(post.title);
  
  const cleanDesc = post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
  const postUrl = window.location.href;

  return (
    <div className="blog-post-container">
      <Helmet>
        <title>{cleanTitle} | The Chris & Emma Show</title>
        <meta name="description" content={cleanDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:title" content={cleanTitle} />
        <meta property="og:description" content={cleanDesc} />
        <meta property="og:image" content={heroImage} />
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
        
        {/* FIX 1 APPLIED: Use cleanTitle instead of post.title */}
        <h1>{cleanTitle}</h1>
        
        <div className="post-meta-data">
          {/* FIX 2 APPLIED: Use formatDate() wrapper */}
          <span><FaCalendar /> {formatDate(post.date)}</span>
          
          <span><FaUser /> {post.author}</span>
        </div>
      </div>

      {postImages.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            {postImages.length > 1 ? (
                 <ImageSlider slides={postImages} />
            ) : (
                 <img src={postImages[0].image} alt={cleanTitle} className="post-hero-image" />
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