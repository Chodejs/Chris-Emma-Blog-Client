import { formatDate, decodeHtml } from '../utils/helpers';
import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import BlogCard from '../components/blog/BlogCard';
import ImageSlider from '../components/blog/ImageSlider';
import SearchBar from '../components/common/SearchBar';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  // Pagination & Filter State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchKey, setSearchKey] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Slider State (Always fetches latest 5 regardless of filters)
  const [sliderPosts, setSliderPosts] = useState([]);

  // 1. Initial Load (Slider)
  useEffect(() => {
    const fetchSlider = async () => {
        try {
            // Fetch just the latest 5 for the slider
            const res = await api.get('/post/read.php?limit=5');
            setSliderPosts(res.data);
        } catch(err) { console.error(err); }
    };
    fetchSlider();
  }, []);

  // 2. Fetch Blog Grid (The Smart Fetch)
  const fetchPosts = useCallback(async (reset = false) => {
    setLoading(true);
    try {
        const currentPage = reset ? 1 : page;
        
        // Build Query URL
        let url = `/post/read.php?page=${currentPage}&limit=1<></>`;
        if (activeCategory !== 'All') url += `&category=${activeCategory}`;
        if (searchKey) url += `&search=${searchKey}`;

        const response = await api.get(url);
        const newData = response.data;

        // Process Data
        const cleanData = newData.map(post => ({
            ...post,
            title: decodeHtml(post.title),
            date: formatDate(post.date)
        }));

        if (reset) {
            setPosts(cleanData);
        } else {
            setPosts(prev => [...prev, ...cleanData]);
        }

        // Check if we reached the end
        if (cleanData.length < 6) {
            setHasMore(false);
        } else {
            setHasMore(true);
        }

    } catch (err) {
        setError('Failed to load posts.');
        console.error(err);
    } finally {
        setLoading(false);
    }
  }, [page, activeCategory, searchKey]);

  // 3. Effect: Trigger fetch when filters change
  // We use a separate useEffect for filters to force a reset
  useEffect(() => {
      setPage(1); // Reset page count
      setHasMore(true);
      fetchPosts(true); // True = Reset List
  }, [activeCategory, searchKey]); // Removed 'fetchPosts' from dependency to avoid loop, added it to the useCallback logic

  // Load More Handler
  const handleLoadMore = () => {
      const nextPage = page + 1;
      setPage(nextPage);
      // We manually call the API here or let a useEffect handle page changes
      // Let's do manual call to keep control
      api.get(`/post/read.php?page=${nextPage}&limit=6&category=${activeCategory !== 'All' ? activeCategory : ''}&search=${searchKey}`)
         .then(res => {
             const cleanData = res.data.map(post => ({
                ...post,
                title: decodeHtml(post.title),
                date: formatDate(post.date)
            }));
            setPosts(prev => [...prev, ...cleanData]);
            if(cleanData.length < 6) setHasMore(false);
         });
  };

  // Search Handlers
  const handleSearchSubmit = (e) => {
    setSearchKey(e.target.value);
    // Debouncing would be good here, but for now it triggers the Effect above
  };

  const handleClearSearch = () => {
    setSearchKey('');
  };

  return (
    <div className="home-container">
      
      {/* Hero Slider (Static Top 5) */}
      <section className="hero-section">
        {sliderPosts.length > 0 && <ImageSlider slides={sliderPosts} />} 
      </section>

      <div className="content-wrapper">
        <header className="home-header">
          <h1>Latest from the Press</h1>
        </header>

        {/* Search & Filter */}
        <div className="filter-section">
          <SearchBar 
            value={searchKey} 
            handleSearch={handleSearchSubmit} 
            clearSearch={handleClearSearch}
          />
          
          <div className="category-tabs">
            {['All', 'Renovation', 'Recipes', 'Tech', 'Life', 'Fitness'].map((cat) => (
              <button 
                key={cat}
                className={activeCategory === cat ? 'cat-btn active' : 'cat-btn'}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="blog-grid">
          {posts.length > 0 ? (
            posts.map((post) => <BlogCard key={post.id} post={post} />)
          ) : (
            !loading && <div className="no-results"><h3>No posts found.</h3></div>
          )}
        </div>

        {/* Load More Button */}
        {hasMore && !loading && posts.length > 0 && (
            <div style={{textAlign: 'center', marginTop: '2rem'}}>
                <button onClick={handleLoadMore} className="load-more-btn">
                    Load More Articles
                </button>
            </div>
        )}
        
        {loading && <div style={{textAlign: 'center'}}>Loading...</div>}

      </div>
    </div>
  );
};

export default Home;