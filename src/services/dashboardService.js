import { delay } from './api';
import {
  dashboardStats,
  revenueAnalytics,
  recentActivities,
  recentTransactions
} from '../data/mockData';

/**
 * Dashboard & Analytics Service
 * Backend-ready: Replace with apiClient.get('/dashboard/...') later.
 */
export const dashboardService = {
  async getStats() {
    await delay(200);
    return dashboardStats;
  },

  async getRevenueAnalytics() {
    await delay(250);
    return revenueAnalytics;
  },

  async getRecentActivities() {
    await delay(200);
    return recentActivities;
  },

  async getRecentTransactions() {
    await delay(250);
    return recentTransactions;
  },

  async getOverviewData() {
    await delay(300);
    return {
      stats: dashboardStats,
      revenueAnalytics,
      recentActivities,
      recentTransactions
    };
  }
};
