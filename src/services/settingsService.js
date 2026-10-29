import { delay } from './api';
import { initialApiKeys } from '../data/mockData';
import { getStorageItem, setStorageItem } from '../utils/storage';

const API_KEYS_STORAGE_KEY = 'nexus_api_keys';
const SETTINGS_STORAGE_KEY = 'nexus_system_settings';

const defaultSettings = {
  organizationName: 'Nexus Global Technologies',
  supportEmail: 'support@nexus.io',
  timezone: 'America/Los_Angeles (GMT-7)',
  currency: 'USD',
  twoFactorAuth: true,
  sessionTimeout: '30m',
  dataRetentionDays: 90,
  emailDigests: true,
  systemAlerts: true
};

export const settingsService = {
  async getSettings() {
    await delay(200);
    return getStorageItem(SETTINGS_STORAGE_KEY, defaultSettings);
  },

  async updateSettings(newSettings) {
    await delay(300);
    const current = getStorageItem(SETTINGS_STORAGE_KEY, defaultSettings);
    const updated = { ...current, ...newSettings };
    setStorageItem(SETTINGS_STORAGE_KEY, updated);
    return updated;
  },

  async getApiKeys() {
    await delay(200);
    return getStorageItem(API_KEYS_STORAGE_KEY, initialApiKeys);
  },

  async createApiKey(name) {
    await delay(350);
    const keys = getStorageItem(API_KEYS_STORAGE_KEY, initialApiKeys);
    const randomHex = Math.random().toString(36).substring(2, 8);
    const newKey = {
      id: `key-${Date.now()}`,
      name: name || 'New API Key',
      prefix: `nx_live_${randomHex}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'Active'
    };
    const updated = [newKey, ...keys];
    setStorageItem(API_KEYS_STORAGE_KEY, updated);
    return newKey;
  },

  async revokeApiKey(id) {
    await delay(250);
    const keys = getStorageItem(API_KEYS_STORAGE_KEY, initialApiKeys);
    const updated = keys.map((key) =>
      key.id === id ? { ...key, status: 'Revoked' } : key
    );
    setStorageItem(API_KEYS_STORAGE_KEY, updated);
    return { success: true };
  }
};
