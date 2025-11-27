import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import './Admin.css';

const CreatePost = () => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // <--- Loading State

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create the object to send
    const newPost = {
      title,
      category,
      image,
      content,
      author: 'Chris' // Hardcoded for now until we have real user auth
    };

    try {
      // Send POST request
      const response = await api.post('/post/create.php', newPost);
      
      console.log(response.data);
      alert('Post Published Successfully!');
      navigate('/'); // Go back to Home to see your masterpiece
      
    } catch (err) {
      console.error("Error creating post:", err);
      alert('Failed to publish post. Check console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quill Toolbar Modules (Keep as they were)
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
        <h2>Create New Post</h2>
        <button className="cancel-btn" onClick={() => navigate('/admin')}>Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter post title..."
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
            <label>Image URL (Optional)</label>
            <input 
                type="text" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
                placeholder="https://..."
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

        {/* Button changes text while saving */}
        <button type="submit" className="save-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;