

📝 Chris & Emma Press: Development Game Plan

Date: November 27, 2025
Current Status: Functional MVP (Minimum Viable Product) with Full CRUD.

🏗️ Project Architecture

Frontend: React 19 (Vite), React Router 6, Axios, Framer Motion, React Helmet Async.
Editor: react-quill-new (Rich Text Editor).
Backend: PHP (Native/Vanilla).
Database: MySQL (Local chris_emma_blog).
Styling: Custom CSS (Modular, Responsive, Dark-mode accents).

✅ Completed Features (The "Done" List)

Project Setup: Switched to Vite, configured generic folder structure.
Responsive Navigation: Navbar with Desktop/Mobile (Hamburger) views.
Home Page:
Image Slider: Powered by Framer Motion, pulls latest posts.
Post Grid: Displays blog cards with hover effects.
Search & Filter: Real-time filtering by text input and Category buttons.
Single Post View: Dynamic routing (/post/:id) displaying full content with HTML rendering.
Admin Dashboard:
Lists all real posts from the database.
Delete Functionality: Connected to API, removes post instantly.
Content Creation (CRUD):
Create Post: Rich Text Editor connected to create.php.
Edit Post: Pre-fills data from DB and updates via update.php.
About Page: Fully styled with "Digital Empire" branding and team cards.
Contact Page: Reusable form component with loading states (Frontend logic only).
Footer: Links to the full "Chris & Emma Network" (Wellness, Pantry, etc.).
Mock Security: Login page works visually (redirects to Dashboard), but uses hardcoded credentials (admin/password).

🚧 Immediate Next Steps (The "To-Do" List)

These are high-priority items to make the app production-ready.

1. The Media Manager (Image Uploads)

Current State: We are manually pasting image URLs from Unsplash.
Goal: Build a PHP script to handle file uploads.
Tasks:
Create api/upload.php to accept $_FILES.
Create uploads/ directory on server.
Add "Drag & Drop" zone to the React CreatePost form.

2. Real Authentication (The Fortress)

Current State: Anyone who guesses the URL /api/post/delete.php can delete our posts. Login is fake.
Goal: Secure the Empire.
Tasks:
Create users table in MySQL.
Create api/login.php (Verify password hash, issue JSON Web Token or Session).
Protect React Admin Routes (Redirect to login if no valid token).

📋 Backlog / Future Features

These were in the original plan but haven't been started yet.
Pagination / Infinite Scroll:
Current: We load all posts at once.
Goal: Load 10 at a time. Implement useInfiniteScroll hook for mobile view.
User Interactions:
Goal: Database tables for comments and likes.
UI: Comment section component at the bottom of BlogPost.jsx.
Contact Form Backend:
Goal: Connect the Contact Form to a PHP script (e.g., PHPMailer) to actually send emails to your inbox.
SEO Refinement:
Goal: Ensure react-helmet-async is pulling dynamic descriptions and OpenGraph (social media) tags for every post.

🐛 Known Bugs / Notes

React Quill: Remember we are using react-quill-new to avoid the React 19 conflict. Do not revert to the standard package.
Image Placeholders: Currently using placehold.co or Unsplash. Need to ensure real uploaded images don't have text overlays clashing with our CSS titles.




📝 Session Update: November 28, 2025
Status: The "Fortress" & "Media Manager" are ONLINE. 🏰📸
✅ Completed Features
Real Authentication (The Fortress)
Backend: Created users table with token storage. Implemented auth_check.php middleware to verify Bearer tokens on every secure request.
Frontend: Updated axios.js with an interceptor to automatically attach the token to headers.
Protection: Wrapped Admin routes in a ProtectedRoute component. Unauthenticated users are bounced to Login.
Login Logic: login.php now verifies hashes against the DB and issues a persistent token.
The Media Manager
Storage: Created uploads/ directory in the server root.
Script: Built api/post/upload.php to handle images, validate file types (jpg/png/webp), and return a public URL.
Server Config: Updated php.ini to increase upload_max_filesize and post_max_size to 128M to handle high-res photos.
UI: Added file picker and image preview to the Create Post form.
Full-Stack Connection
Database: Created posts table and ensured column names (body vs content) match the Model.
Model: Created api/models/Post.php to handle CRUD logic cleanly.
Endpoints: read.php and single_read.php are now robust, handling CORS, Preflight (OPTIONS) requests, and null values safely.
Rendering: Home Page and Single Post view now pull live data from MySQL instead of mockData.js.
🔧 Technical Changes & Fixes
Absolute Paths: Switched all PHP includes to use __DIR__ to prevent relative path crashes.
JSON Error Handling: Updated db.php to return JSON errors (instead of HTML text) so React doesn't crash on connection failures.
CORS & Headers: Added explicit Access-Control-Allow-Origin and OPTIONS handling to all API endpoints to satisfy browser security.
Apache Config: Added .htaccess in /api/ to prevent Apache from stripping the Authorization header.
🔜 Next Up
Edit & Delete: Verify the update.php and delete.php endpoints are working with the new security/path fixes.
Search Functionality: Ensure the Search Bar logic filters the live data correctly.
Deployment: Prepare for move to DreamHost (Environment variables, etc.).

Major update to finalize MVP functionality and styling.

FRONTEND (Layout & Polish):
- Fixed "Squished" Layout: Removed default Vite styles in index.css/App.css that forced vertical centering. Site now scrolls naturally.
- Responsive Design: Added max-width rules to BlogPost images so maps/photos shrink on mobile.
- Home Page Grid: Switched to CSS Grid `auto-fit` to fix white space issues and center cards.
- Image Handling: Updated BlogCard and ImageSlider to parse JSON image arrays and handle broken URLs with fallbacks.
- Footer: Added Spotify, Facebook, and Patreon links.

FEATURES:
- Multi-Image Support: Updated Create/Edit Post to upload multiple files and store them as a JSON list.
- Sliders: Single posts now auto-detect multiple images and render a slider.
- Search Upgrade: Search bar now filters by Title, Category, AND Body text.
- Categories: Added 'Fitness' and 'Life' to filtering and admin dropdowns.

BACKEND (API & Database):
- Security: Fixed `htmlspecialchars` issue on image arrays to prevent JSON corruption.
- Excerpts: Added HTML entity decoding to `read.php` for cleaner post previews.
- Fixes: Standardized column names (body vs content) in update scripts.

ready for deployment prep! 🚀

