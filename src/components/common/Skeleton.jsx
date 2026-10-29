import React from 'react';

export const Skeleton = ({ className = '', rounded = 'rounded-md' }) => {
  return (
    <div
      className={`animate-pulse bg-slate-200/80 ${rounded} ${className}`}
    />
  );
};

export const TableRowSkeleton = ({ columns = 5 }) => {
  return (
    <tr className="border-b border-slate-100 animate-pulse">
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-6 py-4">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        </td>
      ))}
    </tr>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-card animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
      </div>
      <div className="h-7 bg-slate-200 rounded w-1/2"></div>
      <div className="h-3 bg-slate-200 rounded w-1/4"></div>
    </div>
  );
};

export default Skeleton;
