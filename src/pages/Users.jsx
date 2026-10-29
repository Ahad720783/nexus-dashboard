import React, { useState } from 'react';
import {
  Plus,
  Download,
  Edit2,
  Trash2,
  Filter,
  UserPlus,
  RefreshCw,
  Mail,
  Building,
  Shield,
  Phone,
  MapPin
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Table from '../components/common/Table';
import Badge from '../components/common/Badge';
import SearchBar from '../components/common/SearchBar';
import Dropdown from '../components/common/Dropdown';
import Pagination from '../components/common/Pagination';
import Modal from '../components/common/Modal';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import { useUsers } from '../hooks/useUsers';
import { validateUserForm } from '../utils/validators';

const roleOptions = [
  { value: 'All', label: 'All Roles' },
  { value: 'Super Admin', label: 'Super Admin' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Editor', label: 'Editor' },
  { value: 'Viewer', label: 'Viewer' }
];

const statusOptions = [
  { value: 'All', label: 'All Statuses' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'Suspended', label: 'Suspended' }
];

const departmentOptions = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Product', label: 'Product' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Design', label: 'Design' },
  { value: 'Support', label: 'Support' },
  { value: 'Executive', label: 'Executive' }
];

const Users = () => {
  const {
    users,
    pagination,
    filters,
    isLoading,
    isSubmitting,
    updateFilters,
    reload,
    createUser,
    updateUser,
    deleteUser,
    exportCSV
  } = useUsers({ limit: 6 });

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Editor',
    department: 'Engineering',
    status: 'Active',
    phone: '',
    location: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      email: '',
      role: 'Editor',
      department: 'Engineering',
      status: 'Active',
      phone: '',
      location: ''
    });
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status,
      phone: user.phone || '',
      location: user.location || ''
    });
    setFormErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const validation = validateUserForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    try {
      await createUser(formData);
      setIsAddModalOpen(false);
    } catch (err) {
      // toast error handled in hook
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const validation = validateUserForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    try {
      await updateUser(editingUser.id, formData);
      setEditingUser(null);
    } catch (err) {
      // toast error handled in hook
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingUser) return;
    try {
      await deleteUser(deletingUser.id, deletingUser.name);
      setDeletingUser(null);
    } catch (err) {
      // toast error handled in hook
    }
  };

  const columns = [
    {
      title: 'User Profile',
      key: 'name',
      sortable: true,
      render: (user) => (
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
          />
          <div>
            <span className="font-semibold text-slate-900 block text-sm leading-tight">
              {user.name}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <Mail className="w-3 h-3" />
              {user.email}
            </span>
          </div>
        </div>
      )
    },
    {
      title: 'Role',
      key: 'role',
      sortable: true,
      render: (user) => <Badge variant={user.role}>{user.role}</Badge>
    },
    {
      title: 'Department',
      key: 'department',
      sortable: true,
      render: (user) => (
        <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
          <Building className="w-3.5 h-3.5 text-slate-400" />
          {user.department}
        </span>
      )
    },
    {
      title: 'Status',
      key: 'status',
      sortable: true,
      render: (user) => <Badge variant={user.status}>{user.status}</Badge>
    },
    {
      title: 'Joined Date',
      key: 'joinedDate',
      sortable: true,
      render: (user) => (
        <span className="text-xs text-slate-500">{user.joinedDate}</span>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right',
      render: (user) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => handleOpenEditModal(user)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            title="Edit User"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setDeletingUser(user)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete User"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Team & User Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Control platform members, permission assignments, and status.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="md"
            icon={Download}
            onClick={exportCSV}
          >
            Export CSV
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={UserPlus}
            onClick={handleOpenAddModal}
          >
            Add New User
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <Card bodyClassName="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <SearchBar
            value={filters.search}
            onChange={(val) => updateFilters({ search: val })}
            onClear={() => updateFilters({ search: '' })}
            placeholder="Search by name, email, or department..."
            className="max-w-md"
          />

          <div className="flex flex-wrap items-center gap-2.5">
            <Dropdown
              value={filters.role}
              onChange={(val) => updateFilters({ role: val })}
              options={roleOptions}
              icon={Shield}
            />

            <Dropdown
              value={filters.status}
              onChange={(val) => updateFilters({ status: val })}
              options={statusOptions}
              icon={Filter}
            />

            <Button
              variant="ghost"
              size="md"
              icon={RefreshCw}
              onClick={reload}
              title="Refresh users"
            >
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Users Data Table */}
      <Card bodyClassName="p-0">
        <Table
          columns={columns}
          data={users}
          isLoading={isLoading}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onSort={(columnKey) => {
            const nextOrder =
              filters.sortBy === columnKey && filters.sortOrder === 'asc'
                ? 'desc'
                : 'asc';
            updateFilters({ sortBy: columnKey, sortOrder: nextOrder });
          }}
          emptyMessage="No users match your criteria"
          emptyDescription="Try clearing your search term or choosing 'All' for roles and statuses."
        />

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          total={pagination.total}
          limit={pagination.limit}
          onPageChange={(page) => updateFilters({ page })}
        />
      </Card>

      {/* Modal: Add New User */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Team Member"
        subtitle="Create a new user account with role permissions"
        maxWidth="lg"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="e.g. Maya Lin"
            error={formErrors.name}
            required
          />

          <Input
            label="Work Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleFormChange}
            placeholder="maya@nexus.io"
            error={formErrors.email}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Role"
              name="role"
              type="select"
              value={formData.role}
              onChange={handleFormChange}
              options={roleOptions.filter((r) => r.value !== 'All')}
              required
            />

            <Input
              label="Department"
              name="department"
              type="select"
              value={formData.department}
              onChange={handleFormChange}
              options={departmentOptions}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Status"
              name="status"
              type="select"
              value={formData.status}
              onChange={handleFormChange}
              options={statusOptions.filter((s) => s.value !== 'All')}
            />

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleFormChange}
            placeholder="e.g. San Francisco, CA"
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              Create Member
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Edit Existing User */}
      <Modal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        title="Edit User Profile"
        subtitle={`Updating settings for ${editingUser?.name || ''}`}
        maxWidth="lg"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            error={formErrors.name}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleFormChange}
            error={formErrors.email}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Role"
              name="role"
              type="select"
              value={formData.role}
              onChange={handleFormChange}
              options={roleOptions.filter((r) => r.value !== 'All')}
              required
            />

            <Input
              label="Department"
              name="department"
              type="select"
              value={formData.department}
              onChange={handleFormChange}
              options={departmentOptions}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Status"
              name="status"
              type="select"
              value={formData.status}
              onChange={handleFormChange}
              options={statusOptions.filter((s) => s.value !== 'All')}
            />

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              onClick={() => setEditingUser(null)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirmation: Delete User */}
      <ConfirmationDialog
        isOpen={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Team Member"
        message={`Are you sure you want to remove ${deletingUser?.name} (${deletingUser?.email})? They will immediately lose platform access.`}
        confirmText="Delete User"
        variant="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Users;
