"use client";

import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

interface Blog {
  id: string;
  title: string;
  description: string;
  coverImage: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Helper to compare blogs (by id and updated fields)
  const areBlogsEqual = (a: Blog[], b: Blog[]) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  useEffect(() => {
    // 1. Try to load from localStorage first
    const cached = localStorage.getItem("blogs_cache");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setBlogs(parsed);
        setLoading(false);
      } catch {
        // Ignore parse errors
      }
    }

    // 2. Fetch from API in the background
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();

        // Only update if different from cache
        if (!areBlogsEqual(data, blogs)) {
          setBlogs(data);
          localStorage.setItem("blogs_cache", JSON.stringify(data));
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err instanceof Error ? err.message : "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Prefetch blog details in the background
  useEffect(() => {
    if (blogs.length === 0) return;

    blogs.forEach((blog) => {
      // Only prefetch if not already cached
      if (!localStorage.getItem(`blog_detail_${blog.id}`)) {
        fetch(`/api/blogs/${blog.id}`)
          .then((res) => res.ok ? res.json() : null)
          .then((data) => {
            if (data) {
              localStorage.setItem(`blog_detail_${blog.id}`, JSON.stringify(data));
            }
          })
          .catch(() => {});
      }
    });
  }, [blogs]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-xl">Loading blogs...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10">Our Blog</h1>
      
      {blogs.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <p className="text-xl">No blog posts yet.</p>
          <p className="mt-2">Check back later for new content!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              description={blog.description}
              coverImage={blog.coverImage}
            />
          ))}
        </div>
      )}
    </div>
  );
}
