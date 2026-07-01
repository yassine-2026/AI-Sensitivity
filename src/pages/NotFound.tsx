import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Not Found | AI Sensitivity</title>
      </Helmet>

      <div className="flex-grow flex flex-col items-center justify-center px-4 py-32 text-center">
        <h1 className="text-9xl font-black text-indigo-600/20 dark:text-indigo-400/20 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </>
  );
};
