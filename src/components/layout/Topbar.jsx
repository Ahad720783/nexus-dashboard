import React, { useState, useRef, useEffect } from 'react';
import { Search, Menu, LogOut } from 'lucide-react';
import { UserAvatar } from '../../assets/UserAvatar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { formatNameFromEmail } from '../../services/authService';

export const getInitials = (name, email) => {
  if (name && typeof name === 'string' && name.trim()) {
    const clean = name.trim().replace(/[^a-zA-Z\s]/g, '');
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    if (parts.length === 1 && parts[0].length >= 2) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }
  }
  if (email && typeof email === 'string' && email.trim()) {
    const localPart = email.split('@')[0].replace(/[^a-zA-Z\s._-]/g, '');
    const parts = localPart.split(/[._-]+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    if (parts.length === 1 && parts[0].length >= 2) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }
  }
  return 'IR';
};

export const Topbar = ({ onOpenMobileMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isGuest } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const displayName = isGuest
    ? 'Guest Reviewer'
    : user?.name || (user?.email ? formatNameFromEmail(user.email) : 'Institutional Reviewer');

  const initials = isGuest ? 'Guest' : getInitials(displayName, user?.email);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await logout();
    navigate('/sign-in');
  };

  // Determine current breadcrumbs based on pathname
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path.includes('/algorithms/new')) {
      return (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Add algorithm</span>
        </div>
      );
    }
    if (path.includes('/analysis/equations')) {
      return (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link to="/algorithms/new" className="hover:text-blue-600 transition-colors">Add algorithm</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Equation representation</span>
        </div>
      );
    }
    if (path.includes('/analysis/structure')) {
      return (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="text-slate-500">Analysis</span>
          <span>/</span>
          <span className="font-semibold text-slate-800">Structural features</span>
        </div>
      );
    }
    if (path === '/compare') {
      return (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="text-slate-500">Analysis</span>
          <span>/</span>
          <span className="font-semibold text-slate-800">Comparison</span>
        </div>
      );
    }
    if (path.includes('/novelty')) {
      return (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link to="/results/A-0219" className="hover:text-blue-600 transition-colors">Results</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Novelty evaluation</span>
        </div>
      );
    }
    if (path.includes('/results/')) {
      return (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link to="/compare" className="hover:text-blue-600 transition-colors">Compare</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Equivalence result</span>
        </div>
      );
    }
    if (path.includes('/reports/')) {
      return (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link to="/results/A-0219" className="hover:text-blue-600 transition-colors">Results</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Detailed report</span>
        </div>
      );
    }
    if (path === '/history') {
      return (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">History</span>
        </div>
      );
    }
    if (path === '/reference-algorithms') {
      return (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Reference algorithms</span>
        </div>
      );
    }
    return (
      <span className="text-sm font-semibold text-slate-900 tracking-tight">
        Dashboard
      </span>
    );
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="p-1.5 rounded text-slate-500 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>{getBreadcrumbs()}</div>
      </div>

      {/* Right: Search Box & RK User Avatar */}
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block w-56 md:w-64">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            placeholder="Search algorithms"
            className="w-full pl-8 pr-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-2xs"
          />
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            aria-label="User profile menu"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500/40 rounded-full cursor-pointer transition-transform active:scale-95"
          >
            <UserAvatar
              initials={initials}
              isGuest={isGuest}
              size="w-7 h-7"
            />
          </button>

          {isDropdownOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-64 rounded-lg bg-white border border-slate-200 shadow-lg py-1 z-50"
              role="menu"
            >
              {isGuest ? (
                <>
                  <div className="px-4 py-3 border-b border-slate-100">
                    <span className="inline-block px-1.5 py-0.5 mb-1.5 text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 rounded">
                      Guest Session
                    </span>
                    <p className="text-xs font-semibold text-slate-900">
                      Guest Reviewer
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                      Comparisons enabled · History disabled
                    </p>
                  </div>

                  <div className="p-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors text-left cursor-pointer"
                      role="menuitem"
                    >
                      <LogOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600" />
                      <span>Exit Guest Session</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="px-4 py-3 border-b border-slate-100">
                    <span className="inline-block px-1.5 py-0.5 mb-1.5 text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 rounded">
                      Institutional Account
                    </span>
                    <p className="text-xs font-semibold text-slate-900 truncate">
                      {displayName}
                    </p>
                    {user?.email && (
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {user.email}
                      </p>
                    )}
                  </div>

                  <div className="p-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-md transition-colors text-left cursor-pointer"
                      role="menuitem"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
