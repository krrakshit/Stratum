import express from 'express';

const router = express.Router();

// Simple admin authentication
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // In a real application, you'd want to use a proper authentication system
    // For now, we'll just check against environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (username === adminUsername && password === adminPassword) {
      // In a real app, you would generate and return a JWT token here
      res.json({ 
        success: true, 
        message: 'Login successful',
        // We're returning a simple flag here, but in a real app you'd return a JWT
        isAdminAuthenticated: true
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;