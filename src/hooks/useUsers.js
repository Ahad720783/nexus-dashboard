import { useState, useEffect, useCallback } from 'react';
import * as userService from '../services/userService';
import { useToast } from './useToast';

export const useUsers = (initialParams = {}) => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    limit: 6,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [filters, setFilters] = useState({
    search: '',
    role: 'All',
    status: 'All',
    page: 1,
    limit: 6,
    sortBy: 'name',
    sortOrder: 'asc',
    ...initialParams
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { success, error: toastError } = useToast();

  // Fetch users whenever filters change
  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await userService.getUsers(filters);
      setUsers(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message || 'Failed to load users');
      toastError('Could not retrieve users.');
    } finally {
      setIsLoading(false);
    }
  }, [filters, toastError]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // If search/role/status changes, reset to page 1 unless page explicitly provided
      page: newFilters.page !== undefined ? newFilters.page : 1
    }));
  }, []);

  const createUser = async (userData) => {
    setIsSubmitting(true);
    try {
      const created = await userService.createUser(userData);
      success(`User "${created.name}" created successfully!`);
      await loadUsers();
      return created;
    } catch (err) {
      toastError(err.message || 'Failed to create user');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateUser = async (id, updatedData) => {
    setIsSubmitting(true);
    try {
      const updated = await userService.updateUser(id, updatedData);
      success(`User "${updated.name}" updated successfully!`);
      await loadUsers();
      return updated;
    } catch (err) {
      toastError(err.message || 'Failed to update user');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteUser = async (id, userName = 'User') => {
    setIsSubmitting(true);
    try {
      await userService.deleteUser(id);
      success(`User "${userName}" has been deleted.`);
      await loadUsers();
    } catch (err) {
      toastError(err.message || 'Failed to delete user');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportCSV = async () => {
    try {
      await userService.exportUsersCSV();
      success('User export downloaded successfully!');
    } catch (err) {
      toastError('Failed to export CSV');
    }
  };

  return {
    users,
    pagination,
    filters,
    isLoading,
    isSubmitting,
    error,
    updateFilters,
    reload: loadUsers,
    createUser,
    updateUser,
    deleteUser,
    exportCSV
  };
};

export default useUsers;
