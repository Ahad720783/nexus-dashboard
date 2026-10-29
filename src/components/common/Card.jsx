import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  action,
  footer,
  className = '',
  bodyClassName = 'p-6',
  headerClassName = 'px-6 py-4.5 border-b border-slate-100',
  footerClassName = 'px-6 py-4 border-t border-slate-100 bg-slate-50/50',
  hover = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/80 shadow-card overflow-hidden transition-all duration-200 ${
        hover ? 'hover:shadow-elevated hover:border-slate-300' : ''
      } ${className}`}
      {...props}
    >
      {(title || subtitle || action) && (
        <div className={`flex items-center justify-between gap-4 ${headerClassName}`}>
          <div>
            {title && (
              <h3 className="text-base font-semibold text-slate-800 tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}

      <div className={bodyClassName}>{children}</div>

      {footer && <div className={footerClassName}>{footer}</div>}
    </div>
  );
};

export default Card;
