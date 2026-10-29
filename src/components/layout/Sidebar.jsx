import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  GitCompare,
  CheckSquare,
  BookOpen,
  History,
  FileText
} from 'lucide-react';
import { MetaEquivLogo } from '../../assets/MetaEquivLogo';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: '+ Add algorithm', path: '/algorithms/new', icon: PlusCircle },
  { name: 'Compare', path: '/compare', icon: GitCompare },
  { name: 'Results', path: '/results/A-0219', icon: CheckSquare },
];

const libraryItems = [
  { name: 'Reference algorithms', path: '/reference-algorithms', icon: BookOpen },
  { name: 'History', path: '/history', icon: History },
  { name: 'Reports', path: '/reports/A-0219', icon: FileText },
];

export const Sidebar = ({ className = '', onItemClick }) => {
  return (
    <aside
      className={`flex flex-col h-full w-60 bg-[#121927] text-slate-300 border-r border-[#1e293b] select-none text-xs ${className}`}
    >
      {/* Brand Header */}
      <div className="flex items-center px-4 h-16 border-b border-[#1e293b]">
        <MetaEquivLogo light />
      </div>

      {/* Main Nav Links */}
      <div className="flex-1 py-4 px-2 space-y-5 overflow-y-auto">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onItemClick}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-300 hover:bg-[#1a2333] hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Library Section */}
        <div>
          <div className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Library
          </div>
          <div className="space-y-0.5">
            {libraryItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onItemClick}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-slate-300 hover:bg-[#1a2333] hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="p-3.5 border-t border-[#1e293b] text-[11px] text-slate-400 leading-snug">
        <div className="font-medium text-slate-300">Reference library · 34 algorithms</div>
        <div className="text-slate-400 mt-0.5">Last synced 12 Sep 2026</div>
      </div>
    </aside>
  );
};

export default Sidebar;
