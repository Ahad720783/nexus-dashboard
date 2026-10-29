import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const Dropdown = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select option',
  className = '',
  buttonClassName = '',
  icon: Icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => (opt.value ?? opt) === value);
  const displayText = selectedOption ? (selectedOption.label ?? selectedOption) : placeholder;

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {label && (
        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
          {label}
        </span>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center justify-between gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-colors shadow-xs ${buttonClassName}`}
      >
        <span className="flex items-center gap-2 truncate">
          {Icon && <Icon className="w-4 h-4 text-slate-400 shrink-0" />}
          <span>{displayText}</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-30 mt-1.5 w-48 origin-top-right rounded-xl bg-white shadow-elevated border border-slate-200 py-1.5 focus:outline-none animate-scale-in">
          {options.map((opt) => {
            const optVal = opt.value ?? opt;
            const optLabel = opt.label ?? opt;
            const isSelected = optVal === value;

            return (
              <button
                key={optVal}
                type="button"
                onClick={() => {
                  onChange(optVal);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium transition-colors text-left ${
                  isSelected
                    ? 'bg-indigo-50/70 text-indigo-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="truncate">{optLabel}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
