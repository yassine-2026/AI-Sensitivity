/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';

// Lazy loading pages for better performance
const Home = React.lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })));
const Generate = React.lazy(() => import('@/pages/Generate').then(m => ({ default: m.Generate })));
const FAQ = React.lazy(() => import('@/pages/FAQ').then(m => ({ default: m.FAQ })));
const About = React.lazy(() => import('@/pages/About').then(m => ({ default: m.About })));
const Contact = React.lazy(() => import('@/pages/Contact').then(m => ({ default: m.Contact })));
const Privacy = React.lazy(() => import('@/pages/Privacy').then(m => ({ default: m.Privacy })));
const Terms = React.lazy(() => import('@/pages/Terms').then(m => ({ default: m.Terms })));
const NotFound = React.lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })));

// Loading fallback
const PageLoader = () => (
  <div className="flex-grow flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<Layout><PageLoader /></Layout>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="generate" element={<Generate />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
