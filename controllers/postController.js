const mongoose = require('mongoose');
const Post = require('../models/Post');

// Function to check if an ID is a valid MongoDB ObjectId
const isValidObjectId = (id) => mongoose.isValidObjectId(id);

exports.createPost = async (req, res) => {
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
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.render('posts', {
      title: 'All Blog Posts',
      user: req.user, // Pass the user variable here
      posts
    });
  } catch (error) {
    console.error("Error retrieving blog posts:", error);
    res.status(500).send("Error retrieving blog posts");
  }
};

exports.renderNewPostForm = (req, res) => {
  res.render('newpost', { title: 'Create a New Post', user: req.user });
};

exports.getSinglePost = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Post ID format");
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.render('post', { title: post.title, post }); // Render view with a single post
  } catch (error) {
    console.error("Error retrieving blog post:", error);
    res.status(500).send("Error retrieving blog post");
  }
};

exports.updatePost = async (req, res) => {
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
};

exports.deletePost = async (req, res) => {
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
};

exports.renderEditPostForm = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Post ID format");
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.render('editpost', { title: 'Edit Post', post }); // Render view with the edit form
  } catch (error) {
    console.error("Error retrieving blog post:", error);
    res.status(500).send("Error retrieving blog post");
  }
};
