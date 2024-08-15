const request = require('supertest');
const app = require('./app'); 
const mongoose = require('mongoose');
const Post = require('./models/Post');
const { ObjectId } = require('mongodb');

// Clear the database before each test
beforeEach(async () => {
  await Post.deleteMany({});
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /posts', () => {
  it('should create a new post and redirect', async () => {
    const res = await request(app)
      .post('/posts')
      .send({ 
        title: 'Test Post', 
        content: 'This is a test post', 
        author: 'Author' 
      })
      .expect(302); // Expect a redirect status code
    
    expect(res.headers.location).toBe('/posts');
  });
});

describe('GET /posts', () => {
  it('should retrieve all posts', async () => {
    // Create a new post
    await new Post({
      title: 'Test Post',
      content: 'This is a test post',
      author: 'Author'
    }).save();

    const res = await request(app).get('/posts').expect(200);
    
    // Check if the post appears in the response
    expect(res.text).toContain('Test Post'); 
  });
});

describe('GET /posts/:id', () => {
  it('should return a single post by ID', async () => {
    // Create a new post
    const post = await new Post({
      title: 'Test Post',
      content: 'This is a test post',
      author: 'Author'
    }).save();

    const res = await request(app).get(`/posts/${post._id}`).expect(200);
    
    // Check the response
    expect(res.text).toContain('Test Post'); 
  });

  it('should return 404 for non-existent post', async () => {
    // Use a valid ObjectId format but with no existing document
    const invalidId = new ObjectId().toString(); // Generate a valid ObjectId but not in the database
    const res = await request(app).get(`/posts/${invalidId}`).expect(404);
    expect(res.text).toBe('Post not found');
  });

  it('should return 400 for invalid post ID format', async () => {
    const res = await request(app).get('/posts/invalid_id').expect(400); // Expect 400 for bad request
    expect(res.text).toBe('Invalid Post ID format');
  });
});

describe('PUT /posts/:id', () => {
  it('should update a post by ID and redirect', async () => {
    // Create a new post
    const post = await new Post({
      title: 'Old Title',
      content: 'Old content',
      author: 'Author'
    }).save();

    const res = await request(app)
      .put(`/posts/${post._id}`)
      .send({ 
        title: 'Updated Title', 
        content: 'Updated content', 
        author: 'Updated Author' 
      })
      .expect(302);

    // Check if redirected to the updated post
    expect(res.headers.location).toBe(`/posts/${post._id}`);
  });

  it('should return 404 for non-existent post', async () => {
    // Use a valid ObjectId format but with no existing document
    const invalidId = new ObjectId().toString(); // Generate a valid ObjectId but not in the database
    const res = await request(app)
      .put(`/posts/${invalidId}`)
      .send({ 
        title: 'Title', 
        content: 'Content', 
        author: 'Author' 
      })
      .expect(404);

    expect(res.text).toBe('Post not found');
  });

  it('should return 400 for invalid post ID format', async () => {
    const res = await request(app)
      .put('/posts/invalid_id')
      .send({ 
        title: 'Title', 
        content: 'Content', 
        author: 'Author' 
      })
      .expect(400); // Expect 400 for bad request

    expect(res.text).toBe('Invalid Post ID format');
  });
});

describe('DELETE /posts/:id', () => {
  it('should delete a post by ID and redirect', async () => {
    // Create a new post
    const post = await new Post({
      title: 'Test Post',
      content: 'This is a test post',
      author: 'Author'
    }).save();

    const res = await request(app).delete(`/posts/${post._id}`).expect(302);

    // Check if redirected to /posts
    expect(res.headers.location).toBe('/posts');
  });

  it('should return 404 for non-existent post', async () => {
    // Use a valid ObjectId format but with no existing document
    const invalidId = new ObjectId().toString(); // Generate a valid ObjectId but not in the database
    const res = await request(app).delete(`/posts/${invalidId}`).expect(404);
    expect(res.text).toBe('Post not found');
  });

  it('should return 400 for invalid post ID format', async () => {
    const res = await request(app).delete('/posts/invalid_id').expect(400); // Expect 400 for bad request
    expect(res.text).toBe('Invalid Post ID format');
  });
});
