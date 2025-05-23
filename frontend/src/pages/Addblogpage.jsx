"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddBlogPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [subHeadings, setSubHeadings] = useState([]);
  const [currentSubHeading, setCurrentSubHeading] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is authenticated
    const authStatus = localStorage.getItem("isAdminAuthenticated");
    if (authStatus !== "true") {
      // Redirect to login if not authenticated
      navigate("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setCoverImage(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubHeadingChange = (e) => {
    const { name, value } = e.target;
    setCurrentSubHeading(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSubHeading = () => {
    if (currentSubHeading.title && currentSubHeading.description) {
      setSubHeadings(prev => [...prev, currentSubHeading]);
      setCurrentSubHeading({ title: "", description: "" });
    } else {
      setError("Both title and description are required for subheadings");
    }
  };

  const removeSubHeading = (index) => {
    setSubHeadings(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (description.split(" ").length > 30) {
      setError("Description must be 30 words or less");
      return;
    }
    
    if (!coverImage) {
      setError("Cover image is required");
      return;
    }
    
    try {
      setIsLoading(true);
      setError("");
      
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          content,
          coverImage,
          subHeadings
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create blog post");
      }
      
      alert(`Blog post "${title}" created successfully!`);
      
      // Reset form
      setTitle("");
      setDescription("");
      setContent("");
      setCoverImage("");
      setImagePreview("");
      setSubHeadings([]);
      setCurrentSubHeading({ title: "", description: "" });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/admin");
  };

  if (!isAuthenticated) {
    return <div>Checking authentication...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add New Blog Post</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description (30 words max)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            {description.split(" ").length} / 30 words
          </p>
        </div>
        
        <div>
          <label htmlFor="coverImage" className="block text-gray-700 font-medium mb-2">
            Cover Image
          </label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-700 mb-2">Preview:</p>
              <div className="relative h-40 w-full">
                <img
                  src={imagePreview}
                  alt="Cover image preview"
                  className="object-cover rounded-md h-full w-full"
                />
              </div>
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="border p-4 rounded-md">
          <h3 className="text-lg font-medium mb-4">Subheadings (Optional)</h3>
          
          {subHeadings.length > 0 && (
            <div className="mb-4 space-y-3">
              <h4 className="font-medium">Added Subheadings:</h4>
              {subHeadings.map((sh, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <div className="font-medium">{sh.title}</div>
                    <div className="text-sm text-gray-600">{sh.description}</div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeSubHeading(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Subheading Title
              </label>
              <input
                type="text"
                name="title"
                value={currentSubHeading.title}
                onChange={handleSubHeadingChange}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Subheading Description
              </label>
              <input
                type="text"
                name="description"
                value={currentSubHeading.description}
                onChange={handleSubHeadingChange}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            
            <button
              type="button"
              onClick={addSubHeading}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mt-2"
            >
              Add Subheading
            </button>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
        >
          {isLoading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default AddBlogPage;