import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Shield,
  Key,
  Bell,
  Save,
  CheckCircle2
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { isValidEmail } from '../utils/validators';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { success, error: toastError } = useToast();

  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // General profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    title: user?.title || 'CTO & Head of Platform',
    department: user?.department || 'Executive',
    phone: user?.phone || '+1 (555) 234-5678',
    location: user?.location || 'San Francisco, CA',
    bio: user?.bio || 'Leading technology initiatives and digital transformation. Passionate about scalable architecture.'
  });
  const [profileErrors, setProfileErrors] = useState({});

  // Security password state
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [securityErrors, setSecurityErrors] = useState({});

  // Notification toggles state
  const [notifications, setNotifications] = useState(
    user?.notifications || {
      emailAlerts: true,
      securityAlerts: true,
      weeklyDigest: false,
      desktopPush: true
    }
  );

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
    if (profileErrors[name]) {
      setProfileErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityForm((prev) => ({ ...prev, [name]: value }));
    if (securityErrors[name]) {
      setSecurityErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleToggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!profileForm.name.trim()) errors.name = 'Full name is required';
    if (!profileForm.email.trim()) errors.email = 'Email address is required';
    else if (!isValidEmail(profileForm.email)) errors.email = 'Invalid email address';

    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }

    setIsSaving(true);
    try {
      await updateProfile(profileForm);
      success('Profile details updated successfully!');
    } catch (err) {
      toastError('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSecurity = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!securityForm.currentPassword) errors.currentPassword = 'Required';
    if (!securityForm.newPassword) errors.newPassword = 'Required';
    else if (securityForm.newPassword.length < 6) errors.newPassword = 'Min 6 characters';

    if (securityForm.newPassword !== securityForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setSecurityErrors(errors);
      return;
    }

    setIsSaving(true);
    try {
      await new Promise((res) => setTimeout(res, 400));
      success('Password updated successfully!');
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toastError('Failed to change password.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    try {
      await updateProfile({ notifications });
      success('Notification preferences updated!');
    } catch (err) {
      toastError('Failed to save preferences.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header Card */}
      <Card bodyClassName="p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-indigo-950 text-white border-slate-800">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={user?.name || 'User'}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white/10 shadow-2xl"
          />

          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                {user?.name || 'Alex Morgan'}
              </h1>
              <Badge variant={user?.role || 'Super Admin'} size="md">
                {user?.role || 'Super Admin'}
              </Badge>
            </div>

            <p className="text-sm text-indigo-200">{profileForm.title}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>{profileForm.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                <span>{profileForm.department}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200">
        {[
          { id: 'general', label: 'Personal Information', icon: User },
          { id: 'security', label: 'Security & Password', icon: Shield },
          { id: 'notifications', label: 'Notification Preferences', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                isActive
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: General Info Form */}
      {activeTab === 'general' && (
        <Card title="Edit Personal Details" subtitle="Update your profile information">
          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
                error={profileErrors.name}
                required
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                error={profileErrors.email}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Job Title"
                name="title"
                value={profileForm.title}
                onChange={handleProfileChange}
              />

              <Input
                label="Department"
                name="department"
                value={profileForm.department}
                onChange={handleProfileChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
                icon={Phone}
              />

              <Input
                label="Location"
                name="location"
                value={profileForm.location}
                onChange={handleProfileChange}
                icon={MapPin}
              />
            </div>

            <Input
              label="Bio"
              name="bio"
              type="textarea"
              value={profileForm.bio}
              onChange={handleProfileChange}
              rows={3}
              helperText="Brief summary for your internal team profile."
            />

            <div className="pt-3">
              <Button
                type="submit"
                variant="primary"
                isLoading={isSaving}
                icon={Save}
              >
                Save Profile Changes
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tab 2: Security & Password Form */}
      {activeTab === 'security' && (
        <Card
          title="Account Security"
          subtitle="Change your password and secure your authentication credentials"
        >
          <form onSubmit={handleSaveSecurity} className="space-y-4 max-w-lg">
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              value={securityForm.currentPassword}
              onChange={handleSecurityChange}
              placeholder="Enter current password"
              error={securityErrors.currentPassword}
              required
            />

            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={securityForm.newPassword}
              onChange={handleSecurityChange}
              placeholder="Min 6 characters"
              error={securityErrors.newPassword}
              required
            />

            <Input
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={securityForm.confirmPassword}
              onChange={handleSecurityChange}
              placeholder="Re-enter new password"
              error={securityErrors.confirmPassword}
              required
            />

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 text-slate-600">
              <span className="font-semibold text-slate-800">Password requirements:</span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                <li>Minimum of 6 characters</li>
                <li>Recommended combination of uppercase and symbols</li>
              </ul>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                isLoading={isSaving}
                icon={Key}
              >
                Update Password
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tab 3: Notifications Form */}
      {activeTab === 'notifications' && (
        <Card
          title="Notification Settings"
          subtitle="Choose how and when Nexus delivers alert updates"
        >
          <div className="space-y-5 max-w-xl">
            {[
              {
                key: 'emailAlerts',
                title: 'System Email Alerts',
                desc: 'Receive critical server alerts and deploy updates via email.'
              },
              {
                key: 'securityAlerts',
                title: 'Security & Access Warnings',
                desc: 'Notify when a new device logs in or permission changes occur.'
              },
              {
                key: 'weeklyDigest',
                title: 'Weekly Performance Digest',
                desc: 'Summary of user growth and revenue statistics delivered every Monday.'
              },
              {
                key: 'desktopPush',
                title: 'Browser Push Notifications',
                desc: 'Real-time badge toasts when in-app actions happen.'
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div>
                  <span className="font-semibold text-xs text-slate-900 block">
                    {item.title}
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    {item.desc}
                  </span>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                  <input
                    type="checkbox"
                    checked={notifications[item.key]}
                    onChange={() => handleToggleNotification(item.key)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            ))}

            <div className="pt-2">
              <Button
                variant="primary"
                onClick={handleSaveNotifications}
                isLoading={isSaving}
                icon={Save}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Profile;
