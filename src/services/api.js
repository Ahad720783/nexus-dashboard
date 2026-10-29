/**
 * Central API Client Configuration
 *
 * Designed to be BACKEND-READY.
 * Currently simulates network latency with mock data.
 * To connect to a live backend in the future:
 * 1. Define VITE_API_BASE_URL in .env (e.g., https://api.nexus.io/v1)
 * 2. Set isMockMode = false or switch service functions to use apiClient.get/post directly.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const isMockMode = !API_BASE_URL;

/**
 * Simulates network latency for realistic loading states
 */
export const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Standardized HTTP request client
 * Ready for future backend connection
 */
export const apiClient = {
  async get(endpoint, options = {}) {
    if (isMockMode) {
      throw new Error(`Mock mode active. Use service handlers for endpoint: ${endpoint}`);
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('nexus_auth_token') || ''}`,
        ...options.headers,
      },
      ...options,
    });
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return response.json();
  },

  async post(endpoint, body, options = {}) {
    if (isMockMode) {
      throw new Error(`Mock mode active. Use service handlers for endpoint: ${endpoint}`);
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('nexus_auth_token') || ''}`,
        ...options.headers,
      },
      body: JSON.stringify(body),
      ...options,
    });
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return response.json();
  },

  async put(endpoint, body, options = {}) {
    if (isMockMode) {
      throw new Error(`Mock mode active. Use service handlers for endpoint: ${endpoint}`);
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('nexus_auth_token') || ''}`,
        ...options.headers,
      },
      body: JSON.stringify(body),
      ...options,
    });
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return response.json();
  },

  async delete(endpoint, options = {}) {
    if (isMockMode) {
      throw new Error(`Mock mode active. Use service handlers for endpoint: ${endpoint}`);
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('nexus_auth_token') || ''}`,
        ...options.headers,
      },
      ...options,
    });
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return response.json();
  },
};
