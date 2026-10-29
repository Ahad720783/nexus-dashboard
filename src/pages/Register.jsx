import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Building } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { isValidEmail } from '../utils/validators';

const Register = () => {
  const { register } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid work email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        department: formData.department,
        password: formData.password
      });
      success('Account created successfully! Welcome to Nexus.');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toastError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Create an enterprise account
        </h2>
        <p className="text-sm text-slate-500 mt-1.5">
          Get started with role-based access control and analytics.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Jordan Hayes"
          icon={User}
          error={errors.name}
          required
        />

        <Input
          label="Work Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="jordan@company.com"
          icon={Mail}
          error={errors.email}
          required
        />

        <Input
          label="Department"
          name="department"
          type="select"
          value={formData.department}
          onChange={handleChange}
          icon={Building}
          options={[
            { value: 'Engineering', label: 'Engineering' },
            { value: 'Product', label: 'Product' },
            { value: 'Marketing', label: 'Marketing' },
            { value: 'Sales', label: 'Sales' },
            { value: 'Operations', label: 'Operations' },
            { value: 'Design', label: 'Design' }
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min 6 characters"
            icon={Lock}
            error={errors.password}
            required
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat password"
            icon={Lock}
            error={errors.confirmPassword}
            required
          />
        </div>

        <div className="pt-1">
          <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span>
              I agree to the <span className="text-indigo-600 font-medium">Terms of Service</span> and{' '}
              <span className="text-indigo-600 font-medium">Privacy Policy</span>.
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-xs text-rose-600 mt-1">{errors.agreeTerms}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full mt-2"
          iconRight={ArrowRight}
        >
          Create Account
        </Button>
      </form>

      <div className="mt-8 text-center text-xs text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-800">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
