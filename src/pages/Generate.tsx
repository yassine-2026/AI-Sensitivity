import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Crosshair, Smartphone, Cpu, Activity, LayoutGrid } from 'lucide-react';
import { DeviceSpecs } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { aiManager } from '@/ai/AIManager';

export const Generate = () => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<DeviceSpecs>({
    deviceType: 'phone',
    deviceName: '',
    manufacturer: '',
    os: 'android',
    osVersion: '',
    ram: '8',
    processor: '',
    resolution: '1080x2400',
    screenSize: '6.5',
    refreshRate: '60',
    fps: '60',
    playStyle: 'balanced'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setResultMessage(null);
    
    try {
      const result = await aiManager.generateSensitivity(formData);
      setResultMessage(result);
    } catch (err: any) {
      setResultMessage(`Error: ${err.message || 'Failed to generate settings. Please ensure the model is downloaded.'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('generate.title')} | AI Sensitivity</title>
        <meta name="description" content={t('generate.desc')} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('generate.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('generate.desc')}</p>
        </div>

        <div className="bg-white dark:bg-[#111] rounded-3xl border border-gray-200 dark:border-white/10 p-6 md:p-10 shadow-2xl shadow-indigo-500/5">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Device Info */}
            <div>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-indigo-500" />
                {t('generate.deviceInfo')}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <FormSelect label="Device Type" name="deviceType" value={formData.deviceType} onChange={handleChange} options={[
                  { value: 'phone', label: 'Phone' },
                  { value: 'tablet', label: 'Tablet / iPad' }
                ]} />
                <FormInput label="Manufacturer (e.g. Samsung, Apple)" name="manufacturer" value={formData.manufacturer} onChange={handleChange} placeholder="Samsung" required />
                <FormInput label="Device Model Name" name="deviceName" value={formData.deviceName} onChange={handleChange} placeholder="Galaxy S23 Ultra" required />
                <FormSelect label="Operating System" name="os" value={formData.os} onChange={handleChange} options={[
                  { value: 'android', label: 'Android' },
                  { value: 'ios', label: 'iOS' }
                ]} />
                <FormInput label="OS Version (e.g. 14, 17.4)" name="osVersion" value={formData.osVersion} onChange={handleChange} placeholder="14" required />
              </div>
            </div>

            {/* Hardware Specs */}
            <div className="pt-6 border-t border-gray-100 dark:border-white/5">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-500" />
                {t('generate.hardware')}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <FormSelect label="RAM (GB)" name="ram" value={formData.ram} onChange={handleChange} options={[
                  { value: '2', label: '2 GB' }, { value: '3', label: '3 GB' }, { value: '4', label: '4 GB' },
                  { value: '6', label: '6 GB' }, { value: '8', label: '8 GB' }, { value: '12', label: '12 GB' },
                  { value: '16', label: '16 GB' }
                ]} />
                <FormInput label="Processor / Chipset" name="processor" value={formData.processor} onChange={handleChange} placeholder="Snapdragon 8 Gen 2" required />
              </div>
            </div>

            {/* Display Specs */}
            <div className="pt-6 border-t border-gray-100 dark:border-white/5">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-indigo-500" />
                {t('generate.display')}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <FormInput label="Screen Size (Inches)" name="screenSize" value={formData.screenSize} onChange={handleChange} placeholder="6.8" required />
                <FormInput label="Resolution (e.g. 1080x2400)" name="resolution" value={formData.resolution} onChange={handleChange} placeholder="1080x2400" required />
                <FormSelect label="Refresh Rate (Hz)" name="refreshRate" value={formData.refreshRate} onChange={handleChange} options={[
                  { value: '60', label: '60 Hz' }, { value: '90', label: '90 Hz' },
                  { value: '120', label: '120 Hz' }, { value: '144', label: '144 Hz' }
                ]} />
              </div>
            </div>

            {/* Gaming Preferences */}
            <div className="pt-6 border-t border-gray-100 dark:border-white/5">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" />
                {t('generate.gaming')}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <FormSelect label="Target In-Game FPS" name="fps" value={formData.fps} onChange={handleChange} options={[
                  { value: '30', label: '30 FPS' }, { value: '60', label: '60 FPS' },
                  { value: '90', label: '90 FPS' }
                ]} />
                <FormSelect label="Play Style" name="playStyle" value={formData.playStyle} onChange={handleChange} options={[
                  { value: 'aggressive', label: 'Aggressive (Fast turns)' },
                  { value: 'balanced', label: 'Balanced' },
                  { value: 'precision', label: 'Precision (Sniper focus)' }
                ]} />
              </div>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white p-4 rounded-xl font-bold text-lg transition-all"
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    />
                    {t('generate.btn.loading')}
                  </>
                ) : (
                  <>
                    <Crosshair className="w-5 h-5" />
                    {t('generate.btn')}
                  </>
                )}
              </button>
            </div>
            
            {/* Result Message */}
            {resultMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 text-left font-medium"
              >
                <h3 className="text-lg font-bold mb-4 text-indigo-900 dark:text-indigo-300">Generated Settings</h3>
                <pre className="text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-mono overflow-auto max-h-96">
                  {resultMessage}
                </pre>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

const FormInput = ({ label, name, value, onChange, placeholder, required }: any) => (
  <div>
    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-shadow text-gray-900 dark:text-white"
    />
  </div>
);

const FormSelect = ({ label, name, value, onChange, options }: any) => (
  <div>
    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-shadow text-gray-900 dark:text-white appearance-none cursor-pointer"
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value} className="bg-white dark:bg-black">{opt.label}</option>
      ))}
    </select>
  </div>
);
