import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { X } from 'lucide-react';

export const AppLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isAnalysisPage =
    location.pathname.includes('/analysis') ||
    location.pathname.includes('/compare') ||
    location.pathname.includes('/results');

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-900 font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#121927] z-10 flex flex-col">
            <div className="absolute top-4 right-4 z-20">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar onItemClick={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden min-w-0">
        <Topbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />

          {/* Analysis ID Footer Tag when applicable */}
          {isAnalysisPage && (
            <div className="mt-8 pt-4 border-t border-slate-200 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Analysis #A-0219 · MPSO</span>
              <span className="text-[11px] text-slate-400">MetaEquiv Engine v0.9</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
