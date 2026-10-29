import React from 'react';

/**
 * Categorical and novelty status badges directly matching the reference PDF
 */
export const Badge = ({ variant = 'default', children, size = 'sm', className = '' }) => {
  const normalized = String(variant).toLowerCase();

  const styles = {
    'highly similar': 'bg-amber-50 text-amber-800 border-amber-200/90 font-medium',
    'equivalent': 'bg-rose-50 text-rose-700 border-rose-200/90 font-medium',
    'modified': 'bg-blue-50 text-blue-700 border-blue-200/90 font-medium',
    'potentially novel': 'bg-emerald-50 text-emerald-700 border-emerald-200/90 font-medium',
    'distinct': 'bg-slate-100 text-slate-700 border-slate-200 font-medium',
    'parsed': 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold',
    'match': 'text-emerald-700 font-semibold',
    'partial': 'text-amber-700 font-semibold',
    'different': 'text-rose-600 font-semibold',
    'very high': 'text-emerald-700 bg-emerald-50 border-emerald-200 font-semibold',
    'high': 'text-emerald-700 bg-emerald-50 border-emerald-200 font-medium',
    'moderate': 'text-amber-700 bg-amber-50 border-amber-200 font-medium',
    'low': 'text-slate-500 bg-slate-100 border-slate-200 font-medium',
    'yes': 'bg-amber-50 text-amber-800 border-amber-200 font-semibold',
    'no': 'bg-slate-100 text-slate-600 border-slate-200 font-medium',
    'default': 'bg-slate-100 text-slate-700 border-slate-200 font-normal'
  };

  const currentStyle = styles[normalized] || styles.default;
  const sizeStyle = size === 'xs' ? 'text-[11px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5';

  return (
    <span
      className={`inline-flex items-center rounded border tracking-tight ${sizeStyle} ${currentStyle} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
