import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
  autoFocus = false,
  showShortcut = false
}) => {
  return (
    <div className={`relative flex items-center w-full max-w-md ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full pl-9.5 pr-16 py-2 text-sm text-slate-800 placeholder-slate-400 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-xs"
      />

      <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1.5">
        {value ? (
          <button
            type="button"
            onClick={onClear}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : showShortcut ? (
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded">
            ⌘K
          </kbd>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;
