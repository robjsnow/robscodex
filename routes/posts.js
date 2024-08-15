const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const { ensureAuthorOrAdmin } = require('../middleware/authorization');
const postController = require('../controllers/postController');

// Route to create a new blog post (only accessible by authors and admins)
router.post('/posts', ensureAuthenticated, ensureAuthorOrAdmin, postController.createPost);

// Route to get all blog posts (public)
router.get('/posts', postController.getAllPosts);

// Route to render the new post form (only accessible by authors and admins)
router.get('/posts/new', ensureAuthenticated, ensureAuthorOrAdmin, postController.renderNewPostForm);

// Route to get a single blog post by ID (public)
router.get('/posts/:id', postController.getSinglePost);

// Route to update a blog post by ID (only accessible by authors and admins)
router.put('/posts/:id', ensureAuthenticated, ensureAuthorOrAdmin, postController.updatePost);

// Route to delete a blog post by ID (only accessible by authors and admins)
router.delete('/posts/:id', ensureAuthenticated, ensureAuthorOrAdmin, postController.deletePost);

// Route to get the edit form for a blog post by ID (only accessible by authors and admins)
router.get('/posts/:id/edit', ensureAuthenticated, ensureAuthorOrAdmin, postController.renderEditPostForm);

module.exports = router;
