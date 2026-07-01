import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Target, Users, Code } from 'lucide-react';

export const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | AI Sensitivity</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-center mb-16">About AI Sensitivity</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
          <p className="lead text-xl mb-12 text-center text-gray-900 dark:text-white font-medium">
            We are dedicated to bridging the gap between casual players and professional esports athletes through advanced technology.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl text-center">
              <Target className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Our Mission</h3>
              <p className="text-sm">To provide players with the exact mathematical sensitivity needed to maximize their mechanical skill and aim accuracy.</p>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl text-center">
              <Code className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Technology</h3>
              <p className="text-sm">We leverage on-device machine learning to analyze hardware constraints and calculate optimal settings securely.</p>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl text-center">
              <Users className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Community</h3>
              <p className="text-sm">Built by players, for players. We continuously refine our models based on top-tier competitive play data.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111] p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">The Next Evolution</h2>
            <p className="mb-4">
              The upcoming stage of AI Sensitivity will introduce a fully offline, local AI model. This means your device specifications are processed instantly on your own hardware without relying on an internet connection.
            </p>
            <p>
              This architectural choice ensures absolute privacy while delivering zero-latency generation. Stay tuned for the integration.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
