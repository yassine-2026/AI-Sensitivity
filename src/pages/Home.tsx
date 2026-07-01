import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Cpu, ShieldCheck, Zap, Crosshair } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/hooks/useTranslation';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>AI Sensitivity | Perfect Free Fire Settings</title>
        <meta name="description" content="Generate personalized Free Fire sensitivity settings using AI based on your device hardware." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white dark:from-indigo-900/20 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-8"
          >
            <Zap className="w-4 h-4" />
            <span>{t('home.hero.badge')}</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            {t('home.hero.title1')} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">{t('home.hero.title2')}</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
          >
            {t('home.hero.desc')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              to="/generate"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all hover:-translate-y-1"
            >
              <Crosshair className="w-5 h-5" />
              {t('home.hero.btn')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-white/[0.02] border-y border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('home.features.title')}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('home.features.desc')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Cpu className="w-8 h-8 text-blue-500" />}
              title={t('home.f1.title')}
              description={t('home.f1.desc')}
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-amber-500" />}
              title={t('home.f2.title')}
              description={t('home.f2.desc')}
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-emerald-500" />}
              title={t('home.f3.title')}
              description={t('home.f3.desc')}
            />
          </div>
        </div>
      </section>

      {/* Testimonials (Mock) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">{t('home.testimonials.title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard name="Alex M." device="iPhone 13 Pro" text="The generated red dot sensitivity completely changed my headshot rate. It feels incredibly smooth." />
            <TestimonialCard name="Sara K." device="Samsung S23 Ultra" text="Finally, an app that actually takes my 120Hz display into account. Best settings I've ever used." />
            <TestimonialCard name="Leo R." device="Poco X3 Pro" text="I was struggling with recoil control on my device. The AI gave me the perfect balance." />
          </div>
        </div>
      </section>
    </>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-gray-200 dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-colors">
    <div className="bg-gray-50 dark:bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const TestimonialCard = ({ name, device, text }: { name: string, device: string, text: string }) => (
  <div className="bg-gray-50 dark:bg-white/[0.02] p-6 rounded-2xl border border-gray-200 dark:border-white/5">
    <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{text}"</p>
    <div>
      <p className="font-bold">{name}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{device}</p>
    </div>
  </div>
);
