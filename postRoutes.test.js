const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');

describe('GET /posts', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return all posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });
});
