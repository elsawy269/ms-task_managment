const UserService = require('../utils/userService'); 
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const RefreshToken = require('../models/refreshToken.model');

jest.mock('../models/user.model');
jest.mock('jsonwebtoken');
jest.mock('../models/refreshToken.model');

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should return 409 if email is already in use', async () => {
      User.findOne.mockResolvedValue({ email: 'test@example.com' });

      const result = await UserService.registerUser({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      });

      expect(result).toEqual({
        status: 409,
        success: false,
        message: 'Email already in use.'
      });
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    it('should return 201 if user is successfully registered', async () => {
      User.findOne.mockResolvedValue(null);
      const mockSave = jest.fn().mockResolvedValue({
        _id: 'user_id',
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      });
      User.mockImplementation(() => ({ save: mockSave }));

      const result = await UserService.registerUser({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      });

      expect(result).toEqual({
        status: 201,
        success: true,
        data: expect.any(Object),
        message: 'User registered successfully.'
      });
      expect(mockSave).toHaveBeenCalled();
    });
  });

  describe('loginUser', () => {
    it('should return 404 if user is not found', async () => {
      User.findOne.mockResolvedValue(null);

      const result = await UserService.loginUser({
        email: 'notfound@example.com',
        password: 'password123'
      });

      expect(result).toEqual({
        status: 404,
        success: false,
        message: 'User not found.'
      });
      expect(User.findOne).toHaveBeenCalledWith({ email: 'notfound@example.com' });
    });

    it('should return 401 if password does not match', async () => {
      const mockUser = {
        comparePassword: jest.fn().mockResolvedValue(false)
      };
      User.findOne.mockResolvedValue(mockUser);

      const result = await UserService.loginUser({
        email: 'test@example.com',
        password: 'wrongpassword'
      });

      expect(result).toEqual({
        status: 401,
        success: false,
        message: 'Invalid credentials.'
      });
      expect(mockUser.comparePassword).toHaveBeenCalledWith('wrongpassword');
    });

    it('should return 200 and tokens on successful login', async () => {
      const mockUser = {
        _id: 'user_id',
        comparePassword: jest.fn().mockResolvedValue(true)
      };
      User.findOne.mockResolvedValue(mockUser);

      const mockTokens = {
        accessToken: 'access_token',
        refreshToken: 'refresh_token'
      };
      UserService.generateTokens = jest.fn().mockResolvedValue(mockTokens);

      const result = await UserService.loginUser({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(result).toEqual({
        status: 200,
        success: true,
        data: {
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
          user: mockUser
        },
        message: 'Login successful.'
      });
      expect(UserService.generateTokens).toHaveBeenCalledWith(mockUser._id);
    });
  });

  describe('getUserById', () => {
    it('should return 400 if invalid user ID is provided', async () => {
      const result = await UserService.getUserById('invalid_id');

      expect(result).toEqual({
        status: 400,
        success: false,
        message: 'Invalid User ID'
      });
    });

    it('should return 404 if user is not found', async () => {
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
      User.findById.mockResolvedValue(null);

      const result = await UserService.getUserById('valid_id');

      expect(result).toEqual({
        status: 404,
        success: false,
        message: 'User not found'
      });
    });

    it('should return 200 and user data on success', async () => {
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
      const mockUser = { _id: 'user_id', username: 'testuser' };
      User.findById.mockResolvedValue(mockUser);

      const result = await UserService.getUserById('valid_id');

      expect(result).toEqual({
        status: 200,
        success: true,
        data: mockUser
      });
      expect(User.findById).toHaveBeenCalledWith('valid_id');
    });
  });
});