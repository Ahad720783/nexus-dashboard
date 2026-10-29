import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  rows = 3,
  options = [], // for type="select"
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const computedType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const baseInputStyles = `
    w-full px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 bg-white
    border rounded-lg transition-colors duration-150
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
    ${error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'}
    ${Icon ? 'pl-10' : ''}
    ${isPassword || IconRight ? 'pr-10' : ''}
  `;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={`${baseInputStyles} resize-y`}
            {...props}
          />
        ) : type === 'select' ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={baseInputStyles}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value ?? opt} value={opt.value ?? opt}>
                {opt.label ?? opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={computedType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={baseInputStyles}
            {...props}
          />
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
            tabIndex="-1"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}

        {!isPassword && IconRight && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <IconRight className="w-4 h-4" />
          </div>
        )}
      </div>

      {error ? (
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-600">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
