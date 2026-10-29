import { delay } from './api';
import { users as initialUsers } from '../data/mockData';
import { getStorageItem, setStorageItem } from '../utils/storage';

const USERS_STORAGE_KEY = 'nexus_mock_users';

// Helper to get active user list
const getLocalUsers = () => {
  const stored = getStorageItem(USERS_STORAGE_KEY);
  if (!stored) {
    setStorageItem(USERS_STORAGE_KEY, initialUsers);
    return initialUsers;
  }
  return stored;
};

// Helper to save user list
const saveLocalUsers = (users) => {
  setStorageItem(USERS_STORAGE_KEY, users);
};

/**
 * Fetch paginated, filtered, and searched users
 * @param {Object} params - { search, role, status, page, limit, sortBy, sortOrder }
 */
export const getUsers = async (params = {}) => {
  await delay(300); // Simulate network latency

  const {
    search = '',
    role = 'All',
    status = 'All',
    page = 1,
    limit = 6,
    sortBy = 'id',
    sortOrder = 'asc'
  } = params;

  let filtered = [...getLocalUsers()];

  // Search filter (name or email)
  if (search.trim()) {
    const query = search.toLowerCase().trim();
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.department.toLowerCase().includes(query)
    );
  }

  // Role filter
  if (role && role !== 'All') {
    filtered = filtered.filter((u) => u.role.toLowerCase() === role.toLowerCase());
  }

  // Status filter
  if (status && status !== 'All') {
    filtered = filtered.filter((u) => u.status.toLowerCase() === status.toLowerCase());
  }

  // Sorting
  filtered.sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * limit;
  const paginatedData = filtered.slice(startIndex, startIndex + limit);

  return {
    data: paginatedData,
    pagination: {
      currentPage,
      totalPages,
      total,
      limit,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    }
  };
};

/**
 * Fetch single user by ID
 */
export const getUserById = async (id) => {
  await delay(200);
  const users = getLocalUsers();
  const user = users.find((u) => u.id === Number(id));
  if (!user) throw new Error(`User with ID ${id} not found`);
  return user;
};

/**
 * Create a new user
 */
export const createUser = async (userData) => {
  await delay(350);
  const users = getLocalUsers();

  const newUser = {
    id: Date.now(),
    avatar: userData.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
    joinedDate: new Date().toISOString().split('T')[0],
    lastActive: 'Just now',
    status: userData.status || 'Active',
    phone: userData.phone || '+1 (555) 000-0000',
    location: userData.location || 'Remote',
    ...userData
  };

  const updatedUsers = [newUser, ...users];
  saveLocalUsers(updatedUsers);
  return newUser;
};

/**
 * Update an existing user
 */
export const updateUser = async (id, updatedData) => {
  await delay(300);
  const users = getLocalUsers();
  const index = users.findIndex((u) => u.id === Number(id));

  if (index === -1) {
    throw new Error(`User with ID ${id} not found`);
  }

  const updatedUser = { ...users[index], ...updatedData };
  users[index] = updatedUser;
  saveLocalUsers(users);
  return updatedUser;
};

/**
 * Delete a user by ID
 */
export const deleteUser = async (id) => {
  await delay(250);
  const users = getLocalUsers();
  const filtered = users.filter((u) => u.id !== Number(id));
  saveLocalUsers(filtered);
  return { success: true, message: `User ${id} removed` };
};

/**
 * Bulk delete users by an array of IDs
 */
export const bulkDeleteUsers = async (ids = []) => {
  await delay(300);
  const users = getLocalUsers();
  const idSet = new Set(ids.map((id) => Number(id)));
  const remaining = users.filter((u) => !idSet.has(u.id));
  saveLocalUsers(remaining);
  return { success: true, count: ids.length };
};

/**
 * Generate and trigger CSV export
 */
export const exportUsersCSV = async () => {
  await delay(300);
  const users = getLocalUsers();
  
  const headers = ['ID', 'Name', 'Email', 'Role', 'Department', 'Status', 'Joined Date'];
  const rows = users.map((u) => [
    u.id,
    `"${u.name}"`,
    `"${u.email}"`,
    `"${u.role}"`,
    `"${u.department}"`,
    `"${u.status}"`,
    `"${u.joinedDate}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `nexus_users_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return { success: true, count: users.length };
};
