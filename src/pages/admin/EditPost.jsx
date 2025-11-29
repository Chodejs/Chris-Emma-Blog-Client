import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import './Admin.css';

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [images, setImages] = useState([]); // Array for images
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // LOAD EXISTING DATA
  useEffect(() => {
    const fetchPost = async () => {
        try {
            const response = await api.get(`/post/single_read.php?id=${id}`);
            const post = response.data;
            
            setTitle(post.title);
            setCategory(post.category);
            setContent(post.content);

            // Handle Image Parsing
            if (post.image) {
                try {
                    const parsed = JSON.parse(post.image);
                    if (Array.isArray(parsed)) {
                        setImages(parsed);
                    } else {
                        setImages([post.image]); // Single image string -> Array
                    }
                } catch (e) {
                    setImages([post.image]); // Not JSON -> Array
                }
            }
        } catch (err) {
            console.error("Error fetching post:", err);
            alert("Could not load post data.");
            navigate('/admin');
        }
    };
    fetchPost();
  }, [id, navigate]);

  // Handle New File Uploads
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsSubmitting(true);
    const newImageUrls = [];

    try {
        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file);

            const response = await api.post('/post/upload.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            newImageUrls.push(response.data.url);
        }
        // Add new images to existing list
        setImages(prev => [...prev, ...newImageUrls]); 
        alert(`${newImageUrls.length} Image(s) Added!`);
        
    } catch (err) {
        console.error("Upload Error", err);
        alert("Upload Failed");
    } finally {
        setIsSubmitting(false);
    }
  };

  // Remove an image from the list
  const removeImage = (indexToRemove) => {
      setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const updatedPost = {
      id,
      title,
      category,
      image: JSON.stringify(images), // Convert array back to JSON string
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
                <option value="Fitness">Fitness</option>
            </select>
            </div>

            <div className="form-group">
                <label>Manage Images</label>
                
                {/* File Input */}
                <input 
                    type="file" 
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple 
                    style={{marginBottom: '10px'}}
                />

                {/* Image List with Delete Capability */}
                <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px'}}>
                    {images.map((img, index) => (
                        <div key={index} style={{position: 'relative'}}>
                            <img src={img} alt={`Slide ${index}`} style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px', border: '1px solid #ddd'}} />
                            <button 
                                type="button"
                                onClick={() => removeImage(index)}
                                style={{
                                    position: 'absolute', top: '-5px', right: '-5px', 
                                    background: 'red', color: 'white', borderRadius: '50%', 
                                    width: '20px', height: '20px', border: 'none', 
                                    cursor: 'pointer', fontSize: '12px', display: 'flex', 
                                    alignItems: 'center', justifyContent: 'center'
                                }}
                            >X</button>
                        </div>
                    ))}
                </div>
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