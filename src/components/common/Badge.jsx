import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  showDot = true,
  className = ''
}) => {
  const normalized = String(variant).toLowerCase();

  const variantStyles = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    
    inactive: 'bg-slate-100 text-slate-600 border-slate-200',
    revoked: 'bg-slate-100 text-slate-600 border-slate-200',
    
    suspended: 'bg-rose-50 text-rose-700 border-rose-200',
    failed: 'bg-rose-50 text-rose-700 border-rose-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    error: 'bg-rose-50 text-rose-700 border-rose-200',
    
    processing: 'bg-amber-50 text-amber-700 border-amber-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    
    admin: 'bg-purple-50 text-purple-700 border-purple-200',
    'super admin': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    manager: 'bg-blue-50 text-blue-700 border-blue-200',
    editor: 'bg-teal-50 text-teal-700 border-teal-200',
    viewer: 'bg-slate-100 text-slate-700 border-slate-200',
    
    default: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const dotStyles = {
    active: 'bg-emerald-500',
    completed: 'bg-emerald-500',
    success: 'bg-emerald-500',
    inactive: 'bg-slate-400',
    revoked: 'bg-slate-400',
    suspended: 'bg-rose-500',
    failed: 'bg-rose-500',
    danger: 'bg-rose-500',
    error: 'bg-rose-500',
    processing: 'bg-amber-500 animate-pulse',
    pending: 'bg-amber-500',
    warning: 'bg-amber-500',
    admin: 'bg-purple-500',
    'super admin': 'bg-indigo-500',
    manager: 'bg-blue-500',
    editor: 'bg-teal-500',
    viewer: 'bg-slate-400',
    default: 'bg-slate-400'
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2'
  };

  const currentVariant = variantStyles[normalized] || variantStyles.default;
  const currentDot = dotStyles[normalized] || dotStyles.default;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${currentVariant} ${sizeStyles[size]} ${className}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${currentDot}`} />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
