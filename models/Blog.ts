import mongoose from 'mongoose';

// Define the Blog schema
const BlogSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true, // Auto-generate ObjectId
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a title for this blog post'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide content for this blog post'],
  },
  coverImage: {
    type: String,
    required: [true, 'Please provide a cover image URL'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  subHeadings: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true }
    }
  ],
  categories: [{ type: String }]
}, {
  // Enable virtual getters when converting to JSON
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create a virtual for 'id' that returns _id as a string
BlogSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Add updatedAt hook
BlogSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Export the model
export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema); 