import { formatDate, decodeHtml } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import './BlogCard.css';

// 1. DEFINE THE MISSING VARIABLE
const placeholder = 'https://placehold.co/600x400?text=No+Image';

// Helper to get first image safely
const getThumbnail = (imgData) => {
    if (!imgData) return placeholder;
    try {
        const parsed = JSON.parse(imgData);
        return Array.isArray(parsed) ? parsed[0] : parsed;
    } catch (e) {
        return imgData; 
    }
};

const BlogCard = ({post}) => {
    const thumbnail = getThumbnail(post.image);

    return (
        <div className="blog-card">
            <div className="card-image-container">
                <img 
                    src={thumbnail || placeholder} 
                    alt={post.title} 
                    className="card-image"
                    // If image fails, swap to placeholder
                    onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = placeholder; 
                    }}
                />
                <span className="card-category">{post.category}</span>
            </div>

            <div className="card-content">
                <div className="card-meta">
                    <span className="card-date">{formatDate(post.date)}</span>
                    <span className="card-author">By {post.author}</span>              
                </div>

                <h3 className="card-title">{decodeHtml(post.title)}</h3>
                <p className="card-excerpt">{post.excerpt}</p>

                <Link to={`/post/${post.id}`} className="card-btn">
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;