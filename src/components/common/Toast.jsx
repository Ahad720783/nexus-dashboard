import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const Toast = ({ toasts = [], onDismiss }) => {
  if (!toasts.length) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />
  };

  const borders = {
    success: 'border-l-4 border-l-emerald-500',
    error: 'border-l-4 border-l-rose-500',
    warning: 'border-l-4 border-l-amber-500',
    info: 'border-l-4 border-l-indigo-500'
  };

  return (
    <div
      aria-live="assertive"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 bg-white rounded-xl shadow-elevated border border-slate-200 ${
            borders[toast.type] || borders.info
          } animate-slide-in transition-all`}
        >
          {icons[toast.type] || icons.info}

          <div className="flex-1 text-sm">
            {toast.title && (
              <h5 className="font-semibold text-slate-900 leading-tight">
                {toast.title}
              </h5>
            )}
            <p className="text-slate-600 mt-0.5 leading-snug">{toast.message}</p>
          </div>

          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
