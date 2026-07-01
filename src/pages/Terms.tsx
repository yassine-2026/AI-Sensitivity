import React from 'react';
import { Helmet } from 'react-helmet-async';

export const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | AI Sensitivity</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold mb-10">Terms of Service</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using AI Sensitivity, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2>2. Use of Service</h2>
          <p>
            AI Sensitivity provides mathematical recommendations for in-game settings based on hardware inputs. We do not guarantee in-game performance improvements, nor are we affiliated with Free Fire or Garena.
          </p>

          <h2>3. Disclaimer of Warranties</h2>
          <p>
            The service is provided on an "as is" and "as available" basis without any warranties of any kind. Your use of the service is at your sole risk.
          </p>

          <h2>4. Limitation of Liability</h2>
          <p>
            In no event shall AI Sensitivity be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>
        </div>
      </div>
    </>
  );
};
