const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

jest.mock('../model/userModel.js', () => ({
  findByIdAndUpdate: jest.fn(),
}));

jest.mock('../middlewares/verifyToken', () => (req, res, next) => {
  req.user = { id: req.params.id };
  next();
});

const User = require('../model/userModel');
const userRouter = require('../router/userRouter');

const app = express();
app.use(express.json());
app.use('user/update', userRouter);

describe('User Update API', () => {
  const mockUserId = '123456789';
  const mockToken = jwt.sign({ id: mockUserId }, 'admin');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update user successfully', async () => {
    const updatedUser = {
      _id: mockUserId,
      username: 'newusername',
      email: 'newemail@example.com',
      _doc: {
        _id: mockUserId,
        username: 'newusername',
        email: 'newemail@example.com',
      },
    };

    User.findByIdAndUpdate.mockResolvedValue(updatedUser);

    const response = await request(app)
      .post(`/update/${mockUserId}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .send({
        username: 'newusername',
        email: 'newemail@example.com',
      });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User updated successfully');
    expect(response.body.user).toEqual(expect.objectContaining({
      _id: mockUserId,
      username: 'newusername',
      email: 'newemail@example.com',
    }));
  });
});