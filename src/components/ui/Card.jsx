import React from 'react';

export const Card = ({
  children,
  title,
  subtitle,
  action,
  className = '',
  bodyClassName = 'p-5',
  headerClassName = 'px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between',
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden ${className}`}
      {...props}
    >
      {(title || action) && (
        <div className={headerClassName}>
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-slate-800 tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
};

export default Card;
