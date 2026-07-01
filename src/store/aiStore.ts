import { create } from 'zustand';

export type AIModelStatus = 'offline' | 'loading' | 'ready' | 'updating' | 'error';

interface AIState {
  status: AIModelStatus;
  progress: number;
  downloadedBytes: number;
  totalBytes: number;
  speedBytesPerSec: number;
  timeRemainingSec: number;
  errorMessage: string | null;
  setStatus: (status: AIModelStatus) => void;
  setProgress: (data: { progress: number, downloadedBytes: number, totalBytes: number, speedBytesPerSec: number, timeRemainingSec: number }) => void;
  setError: (error: string) => void;
}

export const useAIStore = create<AIState>((set) => ({
  status: 'offline',
  progress: 0,
  downloadedBytes: 0,
  totalBytes: 0,
  speedBytesPerSec: 0,
  timeRemainingSec: 0,
  errorMessage: null,
  setStatus: (status) => set({ status }),
  setProgress: (data) => set(data),
  setError: (errorMessage) => set({ status: 'error', errorMessage }),
}));
