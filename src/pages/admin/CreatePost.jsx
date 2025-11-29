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
  const [images, setImages] = useState([]); // Array for multiple images
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsSubmitting(true);
    const newImageUrls = [];

    try {
        // Upload files one by one
        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file);

            const response = await api.post('/post/upload.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            newImageUrls.push(response.data.url);
        }

        setImages(prev => [...prev, ...newImageUrls]); 
        alert(`${newImageUrls.length} Image(s) Uploaded!`);
        
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
    
    const newPost = {
      title,
      category,
      image: JSON.stringify(images), // Send as JSON string
      content,
      author: 'Chris'
    };

    try {
      await api.post('/post/create.php', newPost);
      alert('Post Published Successfully!');
      navigate('/');
      
    } catch (err) {
      console.error("Error creating post:", err);
      alert('Failed to publish post. Check console.');
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
                <option value="Fitness">Fitness</option>
            </select>
            </div>

            <div className="form-group">
                <label>Post Images (Select Multiple)</label>
                
                <input 
                    type="file" 
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple 
                />

                {/* Preview Grid */}
                {images.length > 0 && (
                    <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px'}}>
                        {images.map((img, index) => (
                            <img key={index} src={img} alt={`Preview ${index}`} style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px', border: '1px solid #ddd'}} />
                        ))}
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

        <button type="submit" className="save-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;