"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  createdAt: string;
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs/${params.id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch blog post");
        }
        
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError(err instanceof Error ? err.message : "Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [params.id]);
  
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
        <Link href="/blog" className="text-blue-500 hover:underline">
          Back to blogs
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/blog" className="text-blue-500 hover:underline">
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
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover rounded-lg"
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