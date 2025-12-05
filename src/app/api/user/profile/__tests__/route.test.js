import { NextRequest } from 'next/server';
import { GET, PUT } from '../route';

// Mock dependencies
jest.mock('../../../lib/db', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({}),
}));

jest.mock('../../../lib/auth', () => ({
  getUserFromRequest: jest.fn(),
}));

jest.mock('../../../models/User', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findOne: jest.fn(),
  },
}));

const { getUserFromRequest } = require('../../../lib/auth');
const User = require('../../../models/User').default;

describe('Profile API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/user/profile', () => {
    it('should return user profile for authenticated user', async () => {
      const mockUser = {
        _id: 'user123',
        anilistUsername: 'testuser',
        email: 'test@example.com',
        country: 'US',
        status: 'active',
        createdAt: new Date(),
      };

      getUserFromRequest.mockResolvedValue('user123');
      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      const request = new NextRequest('http://localhost/api/user/profile');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.user).toBeDefined();
      expect(data.user.anilistUsername).toBe('testuser');
    });

    it('should return 401 for unauthenticated user', async () => {
      getUserFromRequest.mockResolvedValue(null);

      const request = new NextRequest('http://localhost/api/user/profile');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('should return 404 when user not found', async () => {
      getUserFromRequest.mockResolvedValue('user123');
      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const request = new NextRequest('http://localhost/api/user/profile');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('User not found');
    });

    it('should return 403 for suspended account', async () => {
      const mockUser = {
        _id: 'user123',
        status: 'suspended',
        suspendedAt: new Date(),
        suspendedReason: 'User requested',
      };

      getUserFromRequest.mockResolvedValue('user123');
      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      const request = new NextRequest('http://localhost/api/user/profile');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error).toBe('Account suspended');
    });
  });

  describe('PUT /api/user/profile', () => {
    it('should update user profile successfully', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'old@example.com',
        country: 'US',
        status: 'active',
        save: jest.fn().mockResolvedValue({}),
      };

      const updatedUser = {
        ...mockUser,
        email: 'new@example.com',
        country: 'CA',
      };

      getUserFromRequest.mockResolvedValue('user123');
      User.findById.mockResolvedValueOnce(mockUser).mockReturnValueOnce({
        select: jest.fn().mockResolvedValue(updatedUser),
      });
      User.findOne.mockResolvedValue(null);

      const request = new NextRequest('http://localhost/api/user/profile', {
        method: 'PUT',
        body: JSON.stringify({
          email: 'new@example.com',
          country: 'CA',
        }),
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Profile updated successfully');
      expect(mockUser.save).toHaveBeenCalled();
    });

    it('should return 400 if email is already taken', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'old@example.com',
        status: 'active',
      };

      const existingUser = {
        _id: 'user456',
        email: 'new@example.com',
      };

      getUserFromRequest.mockResolvedValue('user123');
      User.findById.mockResolvedValue(mockUser);
      User.findOne.mockResolvedValue(existingUser);

      const request = new NextRequest('http://localhost/api/user/profile', {
        method: 'PUT',
        body: JSON.stringify({
          email: 'new@example.com',
        }),
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Email already in use');
    });

    it('should return 403 for suspended account', async () => {
      const mockUser = {
        _id: 'user123',
        status: 'suspended',
      };

      getUserFromRequest.mockResolvedValue('user123');
      User.findById.mockResolvedValue(mockUser);

      const request = new NextRequest('http://localhost/api/user/profile', {
        method: 'PUT',
        body: JSON.stringify({
          email: 'new@example.com',
        }),
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error).toBe('Cannot update suspended or deleted account');
    });
  });
});
