const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Blog Post Schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create the Blog Post Model
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
