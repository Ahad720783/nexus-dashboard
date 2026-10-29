import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layers, ShieldCheck, Zap, Database, ArrowRight } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Column: Branding & Feature Highlights */}
      <div className="hidden md:flex md:w-1/2 lg:w-5/12 bg-slate-900 flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Background decorative gradient circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-glow">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight">Nexus Admin</span>
            <span className="block text-xs text-indigo-300">Enterprise SaaS Suite</span>
          </div>
        </div>

        {/* Feature showcase */}
        <div className="relative z-10 my-auto py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
            <Zap className="w-3.5 h-3.5" />
            Backend-Ready Frontend
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white leading-tight mb-4">
            Manage your workforce and analytics with confidence.
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-8">
            Experience high-performance enterprise dashboard architecture powered by clean, decoupled service layers and production UI components.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="p-1 rounded-lg bg-indigo-500/20 text-indigo-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Role-based user permissions and audit activity logs</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="p-1 rounded-lg bg-indigo-500/20 text-indigo-400">
                <Database className="w-4 h-4" />
              </div>
              <span>Decoupled mock services ready for 1-click backend integration</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 pt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>&copy; {new Date().getFullYear()} Nexus Inc.</span>
          <span>System Version 2.8.4</span>
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-12">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Header */}
          <div className="flex items-center gap-2.5 mb-8 md:hidden">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-bold text-base text-slate-900">Nexus Admin</span>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
