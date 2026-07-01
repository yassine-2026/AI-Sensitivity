import React from 'react';
import { useAIStore } from '@/store/aiStore';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, CheckCircle2, AlertCircle, X } from 'lucide-react';

export const AIStatusOverlay = () => {
  const { status, progress, downloadedBytes, totalBytes, speedBytesPerSec, timeRemainingSec, errorMessage } = useAIStore();
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (status === 'ready') {
      const timer = setTimeout(() => setDismissed(true), 5000);
      return () => clearTimeout(timer);
    }
    if (status === 'loading') {
      setDismissed(false);
    }
  }, [status]);

  if (status === 'offline' || dismissed) return null;

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds) || seconds < 0) return '--:--';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-4 right-4 z-50 w-80 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-4"
      >
        <button 
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 mb-3">
          <div className={`p-2 rounded-xl ${
            status === 'ready' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
            status === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
            'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
          }`}>
            {status === 'ready' ? <CheckCircle2 className="w-5 h-5" /> : 
             status === 'error' ? <AlertCircle className="w-5 h-5" /> : 
             <Bot className="w-5 h-5 animate-pulse" />}
          </div>
          
          <div className="flex-1">
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">
              {status === 'ready' ? 'AI Model Ready' : 
               status === 'error' ? 'AI Model Error' : 
               'Downloading AI Model...'}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {status === 'ready' ? 'Running locally in your browser' : 
               status === 'error' ? errorMessage : 
               'Required for generating settings'}
            </p>
          </div>
        </div>

        {status === 'loading' && (
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                transition={{ type: 'tween' }}
              />
            </div>
            
            <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {progress.toFixed(1)}%
              </span>
              <span>
                {formatBytes(downloadedBytes)} / {totalBytes ? formatBytes(totalBytes) : '??'}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono pt-1">
              <span>{formatBytes(speedBytesPerSec)}/s</span>
              <span>{formatTime(timeRemainingSec)} left</span>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
