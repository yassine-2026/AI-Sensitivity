import React from 'react';
import { Helmet } from 'react-helmet-async';

export const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | AI Sensitivity</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold mb-10">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Introduction</h2>
          <p>
            Welcome to AI Sensitivity. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.
          </p>

          <h2>2. Data We Collect</h2>
          <p>
            Our core AI generation operates completely on-device. When generating sensitivity settings, your hardware specifications (RAM, CPU, Screen size, etc.) are processed locally in your browser and are <strong>not</strong> transmitted to our servers.
          </p>

          <h2>3. Cookies and Local Storage</h2>
          <p>
            We use IndexedDB and Cache Storage to save the local AI model (in the future) and your theme/language preferences to provide a seamless offline experience (PWA). No tracking cookies are used.
          </p>

          <h2>4. Third-Party Services</h2>
          <p>
            Our website is hosted securely and may collect standard server logs (IP address, user agent) strictly for security and rate-limiting purposes to prevent abuse.
          </p>
        </div>
      </div>
    </>
  );
};
