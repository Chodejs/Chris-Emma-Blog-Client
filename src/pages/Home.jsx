import { useState, useEffect } from 'react';
import api from '../api/axios';
import BlogCard from '../components/blog/BlogCard';
import ImageSlider from '../components/blog/ImageSlider';
import SearchBar from '../components/common/SearchBar';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]); 
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const [searchKey, setSearchKey] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // FETCH DATA
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/post/read.php');
        if (Array.isArray(response.data)) {
            setPosts(response.data);
            setFilteredPosts(response.data);
        } else {
            setPosts([]); 
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load blog posts. Is the backend running?");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle Search Input
  const handleSearchSubmit = (e) => {
    const query = e.target.value;
    setSearchKey(query);
    filterPosts(query, activeCategory);
  };

  // Clear Search
  const handleClearSearch = () => {
    setSearchKey('');
    filterPosts('', activeCategory);
  };

  // Handle Category Click
  const handleCategory = (cat) => {
    setActiveCategory(cat);
    filterPosts(searchKey, cat);
  };

  // The Filtering Logic (UPGRADED)
  const filterPosts = (query, category) => {
    let filtered = posts; 

    // 1. Filter by Category
    if (category !== 'All') {
      filtered = filtered.filter((post) => post.category === category);
    }

    // 2. Filter by Search Query (Now searches Title, Category, AND Content)
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter((post) => 
        post.title.toLowerCase().includes(lowerQuery) ||
        post.category.toLowerCase().includes(lowerQuery) ||
        // The one-line upgrade: Search the body text too!
        post.content.toLowerCase().includes(lowerQuery) 
      );
    }

    setFilteredPosts(filtered);
  };

  if (loading) return <div style={{textAlign:'center', marginTop:'50px'}}><h2>Loading Empire...</h2></div>;
  if (error) return <div style={{textAlign:'center', marginTop:'50px', color:'red'}}><h2>{error}</h2></div>;

  return (
    <div className="home-container">
      
      {/* Hero Slider */}
      <section className="hero-section">
        {posts.length > 0 && <ImageSlider slides={posts.slice(0, 5)} />} 
      </section>

      <div className="content-wrapper">
        <header className="home-header">
          <h1>Latest from the Press</h1>
          <p>Updates, recipes, and tech from Chris & Emma</p>
        </header>

        {/* Search & Filter Section */}
        <div className="filter-section">
          <SearchBar 
            value={searchKey} 
            handleSearch={handleSearchSubmit} 
            clearSearch={handleClearSearch}
          />
          
          <div className="category-tabs">
            {/* Added 'Life' and 'Fitness' to the list */}
            {['All', 'Renovation', 'Recipes', 'Tech', 'Gaming', 'Life', 'Fitness'].map((cat) => (
              <button 
                key={cat}
                className={activeCategory === cat ? 'cat-btn active' : 'cat-btn'}
                onClick={() => handleCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="blog-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <BlogCard key={post.id} post={post} />)
          ) : (
            <div className="no-results">
                <h3>No posts found matching "{searchKey}"</h3>
                <button onClick={handleClearSearch} className="reset-btn">Clear Search</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;