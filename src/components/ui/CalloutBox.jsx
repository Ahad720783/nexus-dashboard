import React from 'react';
import { Info, AlertCircle } from 'lucide-react';

export const CalloutBox = ({
  children,
  variant = 'blue', // blue, amber, neutral
  title,
  icon = true,
  className = ''
}) => {
  const styles = {
    blue: 'bg-blue-50/80 border-blue-200 text-blue-900',
    amber: 'bg-amber-50/80 border-amber-200 text-amber-900',
    neutral: 'bg-slate-50 border-slate-200 text-slate-700'
  };

  const icons = {
    blue: <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />,
    amber: <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />,
    neutral: <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
  };

  return (
    <div
      className={`rounded-lg border p-3.5 text-xs leading-relaxed flex items-start gap-2.5 ${
        styles[variant] || styles.blue
      } ${className}`}
    >
      {icon && (icons[variant] || icons.blue)}
      <div className="flex-1">
        {title && <div className="font-semibold mb-1">{title}</div>}
        <div className="text-inherit opacity-90">{children}</div>
      </div>
    </div>
  );
};

export default CalloutBox;
