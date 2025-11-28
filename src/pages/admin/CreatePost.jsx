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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
        setIsSubmitting(true); // Reuse loading state
        const response = await api.post('/post/upload.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        // The PHP script returns { url: "..." }
        setImage(response.data.url); 
        alert("Image Uploaded!");
        
    } catch (err) {
        console.error("Upload Error", err);
        alert("Upload Failed");
    } finally {
        setIsSubmitting(false);
    }
  };

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
                <label>Cover Image</label>
                
                {/* 1. File Input */}
                <input 
                    type="file" 
                    onChange={handleFileChange}
                    accept="image/*"
                />

                {/* 2. Hidden Input (Stores the URL after upload) */}
                <input 
                    type="hidden" 
                    value={image} 
                />

                {/* 3. Preview (Shows the image if one is uploaded) */}
                {image && (
                    <div style={{marginTop: '10px'}}>
                        <img src={image} alt="Preview" style={{width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '5px'}} />
                        <p style={{fontSize: '0.8rem', color: '#7f8c8d'}}>URL: {image}</p>
                    </div>
                )}
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