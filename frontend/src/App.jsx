import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landingpage';
import BlogsPage from './pages/Blogspage';
import BlogPostPage from "./pages/Blogpostpage"
import AdminLogin from './pages/Adminlogin';
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