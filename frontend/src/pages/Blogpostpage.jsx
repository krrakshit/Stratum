import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function BlogPost() {
  const { id } = useParams();
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    // Try to load from cache first
    const cached = localStorage.getItem(`blog_detail_${id}`);
    if (cached) {
      try {
        setBlog(JSON.parse(cached));
        setLoading(false);
      } catch {}
    }
    // Always fetch from API in the background for freshness
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog post");
        const data = await response.json();
        setBlog(data);
        localStorage.setItem(`blog_detail_${id}`, JSON.stringify(data));
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError(err instanceof Error ? err.message : "Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);
  
  // Rest of your component remains the same
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-xl">Loading blog post...</div>
      </div>
    );
  }
  
  if (error || !blog) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-xl text-red-500 mb-4">{error || "Blog post not found"}</div>
        <Link to="/blog" className="text-blue-500 hover:underline">
          Back to blogs
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/blog" className="text-blue-500 hover:underline">
          ← Back to blogs
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      
      <div className="text-gray-500 mb-8">
        {new Date(blog.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
      
      <div className="relative h-64 sm:h-96 w-full mb-8">
        {!imageError ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="object-cover rounded-lg h-full w-full"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-400">Image unavailable</span>
          </div>
        )}
      </div>
      
      <div className="prose max-w-none mb-10">
        {blog.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

export default BlogPost;