import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  Key,
  Copy,
  Trash2,
  Plus,
  RefreshCw,
  Save,
  Check,
  AlertTriangle,
  Database,
  ExternalLink
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import { settingsService } from '../services/settingsService';
import { useToast } from '../hooks/useToast';

const Settings = () => {
  const { success, info } = useToast();
  const [settings, setSettings] = useState(null);
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Modal states
  const [isNewKeyModalOpen, setIsNewKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [revokingKey, setRevokingKey] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [loadedSettings, loadedKeys] = await Promise.all([
          settingsService.getSettings(),
          settingsService.getApiKeys()
        ]);
        setSettings(loadedSettings);
        setApiKeys(loadedKeys);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await settingsService.updateSettings(settings);
      success('Workspace settings updated successfully!');
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateKey = async (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    try {
      const created = await settingsService.createApiKey(newKeyName.trim());
      setApiKeys((prev) => [created, ...prev]);
      setIsNewKeyModalOpen(false);
      setNewKeyName('');
      success(`API Key "${created.name}" generated!`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRevokeKeyConfirm = async () => {
    if (!revokingKey) return;
    try {
      await settingsService.revokeApiKey(revokingKey.id);
      setApiKeys((prev) =>
        prev.map((k) => (k.id === revokingKey.id ? { ...k, status: 'Revoked' } : k))
      );
      setRevokingKey(null);
      info(`Key ${revokingKey.name} has been revoked.`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyKey = (prefix) => {
    navigator.clipboard.writeText(`${prefix}_sample_secret_token_123456789`);
    success('Key copied to clipboard!');
  };

  const handleClearCache = () => {
    success('Local client cache cleared successfully.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Workspace Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage organization variables, developer integrations, and API keys.
          </p>
        </div>
      </div>

      {/* General Settings Card */}
      <Card
        title="Organization Configuration"
        subtitle="Global settings applicable to all workspaces"
      >
        <form onSubmit={handleSaveSettings} className="space-y-4 max-w-2xl">
          <Input
            label="Organization Name"
            name="organizationName"
            value={settings?.organizationName || ''}
            onChange={handleSettingsChange}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Support Email"
              name="supportEmail"
              type="email"
              value={settings?.supportEmail || ''}
              onChange={handleSettingsChange}
              required
            />

            <Input
              label="Default Currency"
              name="currency"
              type="select"
              value={settings?.currency || 'USD'}
              onChange={handleSettingsChange}
              options={[
                { value: 'USD', label: 'USD ($) - US Dollar' },
                { value: 'EUR', label: 'EUR (€) - Euro' },
                { value: 'GBP', label: 'GBP (£) - British Pound' }
              ]}
            />
          </div>

          <Input
            label="Default Timezone"
            name="timezone"
            value={settings?.timezone || ''}
            onChange={handleSettingsChange}
          />

          <div className="pt-3">
            <Button
              type="submit"
              variant="primary"
              isLoading={isSaving}
              icon={Save}
            >
              Save Configuration
            </Button>
          </div>
        </form>
      </Card>

      {/* API Keys Management */}
      <Card
        title="Developer API Keys"
        subtitle="Tokens for programmatic access to the future backend API"
        action={
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsNewKeyModalOpen(true)}
          >
            Create API Key
          </Button>
        }
      >
        <div className="space-y-3">
          {apiKeys.map((key) => {
            const isRevoked = key.status === 'Revoked';
            return (
              <div
                key={key.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-indigo-600" />
                    <span className="font-semibold text-sm text-slate-900">
                      {key.name}
                    </span>
                    <Badge variant={key.status} size="sm">
                      {key.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                    <span className="bg-slate-200/70 px-2 py-0.5 rounded">
                      {key.prefix}••••••••••••••••
                    </span>
                    <span>Created: {key.created}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {!isRevoked && (
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Copy}
                      onClick={() => handleCopyKey(key.prefix)}
                    >
                      Copy Key
                    </Button>
                  )}

                  {!isRevoked && (
                    <button
                      type="button"
                      onClick={() => setRevokingKey(key)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Revoke key"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Maintenance & Cache */}
      <Card
        title="Maintenance & Data Health"
        subtitle="System diagnostics and local mock database management"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200/80 bg-slate-50/50">
          <div>
            <span className="font-semibold text-sm text-slate-900 block">
              Purge Local State Cache
            </span>
            <p className="text-xs text-slate-500 mt-0.5">
              Reset temporary localStorage overrides and reload mock dataset defaults.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            onClick={handleClearCache}
          >
            Clear Cache
          </Button>
        </div>
      </Card>

      {/* Modal: New API Key */}
      <Modal
        isOpen={isNewKeyModalOpen}
        onClose={() => setIsNewKeyModalOpen(false)}
        title="Create Developer API Key"
        subtitle="Generate a new secret token for backend integration"
      >
        <form onSubmit={handleGenerateKey} className="space-y-4">
          <Input
            label="Key Name / Identifier"
            name="keyName"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="e.g. CI/CD Deployment Bot"
            required
          />

          <p className="text-xs text-slate-500">
            Once generated, store your API key securely. In mock mode, this simulates a real bearer token.
          </p>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              onClick={() => setIsNewKeyModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              Generate Token
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirmation: Revoke API Key */}
      <ConfirmationDialog
        isOpen={!!revokingKey}
        onClose={() => setRevokingKey(null)}
        onConfirm={handleRevokeKeyConfirm}
        title="Revoke API Key"
        message={`Are you sure you want to revoke "${revokingKey?.name}"? Any service using this key will immediately fail to authenticate.`}
        confirmText="Revoke Key"
        variant="danger"
      />
    </div>
  );
};

export default Settings;
