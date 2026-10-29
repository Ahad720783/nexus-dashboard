import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600 mb-6 shadow-xs border border-indigo-100">
        <Compass className="w-12 h-12 animate-pulse" />
      </div>

      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
        404 - Page Not Found
      </h1>
      <p className="text-base text-slate-500 max-w-md mt-3">
        The page you requested doesn&apos;t exist or has been moved to another location.
      </p>

      <div className="mt-8">
        <Link to="/dashboard">
          <Button variant="primary" size="lg" icon={ArrowLeft}>
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
