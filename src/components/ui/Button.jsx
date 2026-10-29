import React from 'react';

export const Button = ({
  children,
  type = 'button',
  variant = 'primary', // primary, outline, ghost, dark, danger
  size = 'md', // sm, md, lg
  disabled = false,
  icon: Icon,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-md transition-colors select-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    xs: 'text-xs px-2 py-1 gap-1',
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-3.5 py-1.5 sm:py-2 gap-2',
    lg: 'text-sm px-4 py-2.5 gap-2 font-medium',
  };

  const variantStyles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 border border-transparent shadow-xs',
    outline:
      'bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 border border-slate-300 shadow-xs',
    ghost:
      'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent',
    secondary:
      'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200',
    dark:
      'bg-slate-900 text-white hover:bg-slate-800 border border-slate-800',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 border border-transparent'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
