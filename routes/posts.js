const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Route to create a new blog post
router.post('/posts', async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    });

    await newPost.save();
    res.redirect('/posts');
  } catch (error) {
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
  

module.exports = router;
