const request = require('supertest');
const app = require('../index'); // Adjust the path to your Express app
const { User } = require('../model/userModel');
const bcryptjs = require('bcryptjs')

// You may want to mock the DB for testing to avoid affecting production data
jest.mock('../db/db');

// Clear the mock database before each test
beforeEach(() => {
  User.create.mockClear();
  User.findOne.mockClear();
  jest.spyOn(bcryptjs, 'compareSync').mockClear();
});

describe('Auth Routes', () => {
  describe('POST /auth/signup', () => {
    it('should return 200 and create a new user with valid data', async () => {
      User.create.mockResolvedValue({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'hashedpassword',
      });

      const res = await request(app)
        .post('/auth/signup')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'testpassword',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'User created successfully');
    });

    it('should return 400 when data is invalid (e.g., password too short)', async () => {
      const res = await request(app)
        .post('/auth/signup')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: '123', // Invalid password (too short)
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'Email already taken / Incorrect inputs');
    });
  });

  describe('POST /auth/signin', () => {
    it('should return 200 and log in an existing user with correct credentials', async () => {
      User.findOne.mockResolvedValue({
        _id: 'someUserId',
        email: 'testuser@example.com',
        password: 'hashedpassword',
        _doc: { email: 'testuser@example.com', username: 'testuser' }
      });
      jest.spyOn(bcryptjs, 'compareSync').mockReturnValue(true);
      const res = await request(app)
        .post('/auth/signin')
        .send({
          email: 'testuser@example.com',
          password: 'testpassword', // This should be valid when compared
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'User logged in successfully');
      expect(res.body).toHaveProperty('token'); // Check for the presence of a token
    });

    it('should return 400 if email is not found', async () => {
      // User.findOne.mockResolvedValue(null)
      const res = await request(app)
        .post('/auth/signin')
        .send({
          email: 'nonexistent@example.com',
          password: 'testpassword',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'User not found');
    });

    it('should return 400 for incorrect password', async () => {
      User.findOne.mockResolvedValue({
        _id: 'someUserId',
        email: 'testuser@example.com',
        password: 'hashedpassword',
        _doc: { email: 'testuser@example.com', username: 'testuser' }
      })
      jest.spyOn(bcryptjs, 'compareSync').mockReturnValue(false);
      const res = await request(app)
        .post('/auth/signin')
        .send({
          email: 'testuser@example.com',
          password: 'pass',
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'Invalid password');
    });
  });
  //   describe('Post auth/google',  () => {
  //     it('should return 200 and log in an existing user via Google', async () => {
  //         User.findOne.mockResolvedValue({
  //             _id:'someUserId',
  //             email: 'testuser@example.com',
  //             _doc:{email: 'testuser@example.com', username: 'testuser'}
  //         })
  //         const res = await request(app)
  //         .post('/auth/google')
  //         .send({
  //             username:'testuser',
  //             email:'testuser@example.com',
  //             avatar:'avatarUrld'c
  //         });
  //         expect(res.statusCode).toBe(200);
  //         expect(res.body).toHaveProperty('success', true);
  //         expect(res.body).toHaveProperty('message', 'User logged in successfully');
  //         expect(res.body).toHaveProperty('token')
  //     });
  //   });
});


