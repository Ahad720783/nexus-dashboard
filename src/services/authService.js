import { delay } from './api';
import { currentUser as defaultUser } from '../data/mockData';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';

const AUTH_USER_KEY = 'nexus_current_user';
const AUTH_TOKEN_KEY = 'nexus_auth_token';

export const formatNameFromEmail = (email) => {
  if (!email || typeof email !== 'string') return 'Institutional Reviewer';
  const local = email.split('@')[0];
  const parts = local.split(/[._-]+/).filter(Boolean);
  if (parts.length === 0) return 'Institutional Reviewer';
  return parts
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Mock authentication service
 * Backend-ready: Replace simulated logic with apiClient.post('/auth/login', ...) later.
 */
export const authService = {
  async login(email, password) {
    await delay(300); // Simulate network latency

    if (!email) {
      throw new Error('Please provide an institutional email.');
    }

    const trimmedEmail = email.trim();
    const formattedName = formatNameFromEmail(trimmedEmail);

    const user = {
      id: `inst-${Date.now()}`,
      name: formattedName,
      email: trimmedEmail,
      role: 'Institutional Reviewer',
      sessionType: 'institutional',
      isGuest: false,
    };

    const mockToken = `mock-jwt-token-${Date.now()}`;
    setStorageItem(AUTH_USER_KEY, user);
    setStorageItem(AUTH_TOKEN_KEY, mockToken);

    return { user, token: mockToken };
  },

  async loginGuest() {
    await delay(200);

    const guestUser = {
      id: `guest-${Date.now()}`,
      name: 'Guest Reviewer',
      email: null,
      role: 'Guest Reviewer',
      sessionType: 'guest',
      isGuest: true,
    };

    const mockToken = `mock-guest-token-${Date.now()}`;
    setStorageItem(AUTH_USER_KEY, guestUser);
    setStorageItem(AUTH_TOKEN_KEY, mockToken);

    return { user: guestUser, token: mockToken };
  },

  async register(data) {
    await delay(500);

    const user = {
      ...defaultUser,
      name: data.name,
      email: data.email,
      role: 'Editor',
      isGuest: false,
    };

    const mockToken = `mock-jwt-token-${Date.now()}`;
    setStorageItem(AUTH_USER_KEY, user);
    setStorageItem(AUTH_TOKEN_KEY, mockToken);

    return { user, token: mockToken };
  },

  async getCurrentUser() {
    await delay(100);
    const storedUser = getStorageItem(AUTH_USER_KEY, null);
    const token = storedUser ? getStorageItem(AUTH_TOKEN_KEY, null) : null;
    return { user: storedUser, token };
  },

  async updateProfile(profileData) {
    await delay(300);
    const current = getStorageItem(AUTH_USER_KEY, null) || {};
    const updated = { ...current, ...profileData };
    setStorageItem(AUTH_USER_KEY, updated);
    return updated;
  },

  async logout() {
    await delay(100);
    removeStorageItem(AUTH_USER_KEY);
    removeStorageItem(AUTH_TOKEN_KEY);
    return { success: true };
  }
};
