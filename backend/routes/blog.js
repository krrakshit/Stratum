import express from 'express';
import Blog from '../models/Blog.js';
import mongoose from 'mongoose';

const router = express.Router();

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    const errorMessage = err.message || 'Failed to fetch blog posts';
    console.error('Error fetching blogs:', errorMessage);
    res.status(500).json({ error: errorMessage });
  }
});

// GET a single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID
    if (!id) {
      return res.status(400).json({ error: 'Blog ID is required' });
    }
    
    // Check if ID is valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid blog ID format' });
    }
    
    // Fetch blog post
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// POST create a new blog
router.post('/', async (req, res) => {
  try {
    // Parse the JSON body
    const { title, description, content, coverImage, subHeadings } = req.body;
    
    // Validate required fields
    if (!title || !description || !content || !coverImage) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check description length
    if (description.split(' ').length > 30) {
      return res.status(400).json({ error: 'Description must be 30 words or less' });
    }
    
    // Create blog post
    const blog = await Blog.create({
      title,
      description,
      content,
      coverImage,
      subHeadings: subHeadings || []
    });
    
    res.status(201).json(blog);
  } catch (err) {
    const errorMessage = err.message || 'Failed to create blog post';
    console.error('Error creating blog:', errorMessage);
    res.status(500).json({ error: errorMessage });
  }
});

export default router;