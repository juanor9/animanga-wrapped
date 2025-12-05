import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/navigation';
import { configureStore } from '@reduxjs/toolkit';
import ProfileClient from '../ProfileClient';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key) => key,
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Spinner component
jest.mock('../../../../../../components/Spinner/Spinner', () => {
  return function Spinner() {
    return <div data-testid="spinner">Loading...</div>;
  };
});

// Mock user reducer
const mockUserReducer = (
  state = {
    user: null,
    accessToken: null,
    refreshToken: null,
  },
  action
) => {
  switch (action.type) {
    case 'user/logout':
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};

describe('ProfileClient Component', () => {
  let mockRouter;
  let mockStore;

  beforeEach(() => {
    mockRouter = {
      push: jest.fn(),
    };
    useRouter.mockReturnValue(mockRouter);

    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithStore = (initialState = {}) => {
    mockStore = configureStore({
      reducer: {
        user: mockUserReducer,
      },
      preloadedState: {
        user: {
          user: null,
          accessToken: null,
          refreshToken: null,
          ...initialState.user,
        },
      },
    });

    return render(
      <Provider store={mockStore}>
        <ProfileClient />
      </Provider>
    );
  };

  it('should redirect to home if no access token', () => {
    renderWithStore();

    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('should show loading spinner while fetching profile', () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        user: {
          anilistUsername: 'testuser',
          email: 'test@example.com',
        },
      }),
    });

    renderWithStore({
      user: { accessToken: 'test-token' },
    });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should display profile data after fetching', async () => {
    const mockProfile = {
      anilistUsername: 'testuser',
      email: 'test@example.com',
      country: 'US',
      createdAt: new Date().toISOString(),
      emailVerified: true,
    };

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ user: mockProfile }),
    });

    renderWithStore({
      user: { accessToken: 'test-token' },
    });

    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });
  });

  it('should display error message on fetch failure', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Failed to fetch profile' }),
    });

    renderWithStore({
      user: { accessToken: 'test-token' },
    });

    await waitFor(() => {
      expect(screen.getByText('errorTitle')).toBeInTheDocument();
    });
  });
});
