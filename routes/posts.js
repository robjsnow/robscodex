const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');

// Function to check if an ID is a valid MongoDB ObjectId
const isValidObjectId = (id) => mongoose.isValidObjectId(id);

router.post('/posts', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log request body
    
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    });

    await newPost.save();
    res.redirect('/posts');
  } catch (error) {
    console.error("Error creating blog post:", error); // Log the error
    res.status(500).send("Error creating blog post");
  }
});

// Route to get all blog posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.render('posts', { posts });
  } catch (error) {
    res.status(500).send("Error retrieving blog posts");
  }
});

router.get('/posts/new', (req, res) => {
    res.render('newpost');
});

// Route to get a single blog post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Post ID format");
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.render('post', { post }); // Render view with a single post
  } catch (error) {
    console.error("Error retrieving blog post:", error);
    res.status(500).send("Error retrieving blog post");
  }
});

// Route to update a blog post by ID
router.put('/posts/:id', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Post ID format");
    }
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
      },
      { new: true }
    );
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.redirect(`/posts/${post._id}`);
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).send("Error updating blog post");
  }
});

// Route to delete a blog post by ID
router.delete('/posts/:id', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Post ID format");
    }
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.redirect('/posts');
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).send("Error deleting blog post");
  }
});

// Route to get the edit form for a blog post by ID
router.get('/posts/:id/edit', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Post ID format");
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.render('editpost', { post }); // Render view with the edit form
  } catch (error) {
    console.error("Error retrieving blog post:", error);
    res.status(500).send("Error retrieving blog post");
  }
});

module.exports = router;
