import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { isValidEmail } from '../utils/validators';

const Login = () => {
  const { login } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

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

  const handleDemoFill = () => {
    setFormData({
      email: 'alex.morgan@nexus.io',
      password: 'password123',
      rememberMe: true
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      success('Welcome back to Nexus Admin!');
      navigate(from, { replace: true });
    } catch (err) {
      toastError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Sign in to your account
        </h2>
        <p className="text-sm text-slate-500 mt-1.5">
          Enter your credentials or use the demo login shortcut below.
        </p>
      </div>

      {/* Demo helper banner */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <div className="text-xs text-indigo-900">
            <span className="font-semibold">Demo Credentials:</span> alex.morgan@nexus.io
          </div>
        </div>
        <button
          type="button"
          onClick={handleDemoFill}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-white px-2.5 py-1 rounded-md shadow-xs border border-indigo-200 transition-colors"
        >
          Auto-fill
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@company.com"
          icon={Mail}
          error={errors.email}
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          icon={Lock}
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span>Remember me for 30 days</span>
          </label>

          <button
            type="button"
            onClick={() => alert('Demo reset instructions sent to registered email.')}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full mt-2"
          iconRight={ArrowRight}
        >
          Sign In
        </Button>
      </form>

      <div className="mt-8 text-center text-xs text-slate-500">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-800">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default Login;
