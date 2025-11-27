import {Link} from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({post}) => {
    return (
        <div className="blog-card">
            <div className="card-image-container">
                <img src={post.image} alt={post.title} className="card-image"/>
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