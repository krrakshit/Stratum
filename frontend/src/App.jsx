import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landingpage';
import BlogsPage from './pages/BlogsPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminLogin from './pages/AdminLogin';
import AddBlogPage from './pages/AddBlogPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/blog" element={<BlogsPage />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/addblog" element={<AddBlogPage />} />
    </Routes>
  );
}

export default App;