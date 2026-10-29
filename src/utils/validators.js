/**
 * Common validation utilities for form handling
 */

export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
};

export const isNotEmpty = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
};

export const isValidPassword = (password) => {
  // At least 6 characters
  return typeof password === 'string' && password.length >= 6;
};

export const validateUserForm = (formData) => {
  const errors = {};

  if (!isNotEmpty(formData.name)) {
    errors.name = "Full name is required";
  } else if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!isNotEmpty(formData.email)) {
    errors.email = "Email address is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!isNotEmpty(formData.role)) {
    errors.role = "Role is required";
  }

  if (!isNotEmpty(formData.department)) {
    errors.department = "Department is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
