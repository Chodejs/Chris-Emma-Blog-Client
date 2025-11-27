import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import './Admin.css';

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // LOAD EXISTING DATA
  useEffect(() => {
    const fetchPost = async () => {
        try {
            const response = await api.get(`/post/single_read.php?id=${id}`);
            const post = response.data;
            
            // Populate form
            setTitle(post.title);
            setCategory(post.category);
            setImage(post.image || ''); // Handle null images
            setContent(post.content);
        } catch (err) {
            console.error("Error fetching post:", err);
            alert("Could not load post data.");
            navigate('/admin');
        }
    };
    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const updatedPost = {
      id, // We must include the ID for the backend to know what to update
      title,
      category,
      image,
      content,
      author: 'Chris'
    };

    try {
      await api.put('/post/update.php', updatedPost);
      alert('Post Updated Successfully!');
      navigate('/admin');
      
    } catch (err) {
      console.error("Error updating post:", err);
      alert('Failed to update post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Edit Post</h2>
        <button className="cancel-btn" onClick={() => navigate('/admin')}>Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>

        <div className="form-row">
            <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Tech">Tech</option>
                <option value="Renovation">Renovation</option>
                <option value="Recipes">Recipes</option>
                <option value="Gaming">Gaming</option>
                <option value="Life">Life</option>
            </select>
            </div>

            <div className="form-group">
            <label>Image URL</label>
            <input 
                type="text" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
            />
            </div>
        </div>

        <div className="form-group">
          <label>Content</label>
          <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent} 
            modules={modules}
            className="editor-box"
          />
        </div>

        <button type="submit" className="save-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
};

export default EditPost;