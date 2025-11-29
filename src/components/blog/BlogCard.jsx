import {Link} from 'react-router-dom';
import './BlogCard.css';

// Helper to get first image safely
const getThumbnail = (imgData) => {
    if (!imgData) return 'https://placehold.co/600x400?text=No+Image'; // Fallback
    try {
        // Try parsing JSON if it's our new format
        const parsed = JSON.parse(imgData);
        // If it's an array, take the first one. If not, take it as is.
        return Array.isArray(parsed) ? parsed[0] : parsed;
    } catch (e) {
        // If it crashes, it's just a normal string (Old format)
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
                    // MAGIC FIX: If image fails to load, swap source to placeholder
                    onError={(e) => { e.target.onerror = null; e.target.src = placeholder; }}
                />
                <span className="card-category">{post.category}</span>
            </div>

            <div className="card-content">
                <div className="card-meta">
                    <span className="card-date">{post.date}</span>
                    <span className="card-author">By {post.author}</span>
                </div>

                <h3 className="card-title">{post.title}</h3>
                <p className="card-excerpt">{post.excerpt}</p>

                <Link to={`/post/${post.id}`} className="card-btn">
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;