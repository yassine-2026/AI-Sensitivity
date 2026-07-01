import { useAIStore } from '@/store/aiStore';

class AIManager {
  private worker: Worker | null = null;
  private messageCallbacks: Map<string, (result: string) => void> = new Map();
  private generateCounter = 0;

  public initialize() {
    if (this.worker) return;

    this.worker = new Worker(new URL('./worker.ts', import.meta.url), {
      type: 'module',
    });

    this.worker.onmessage = (event) => {
      const { type, status, progress, message, id, result } = event.data;
      const store = useAIStore.getState();

      switch (type) {
        case 'STATUS':
          store.setStatus(status);
          break;
        case 'PROGRESS':
          store.setProgress(progress);
          break;
        case 'ERROR':
          store.setError(message);
          break;
        case 'GENERATE_RESULT':
          if (id && this.messageCallbacks.has(id)) {
            const cb = this.messageCallbacks.get(id);
            if (cb) cb(result);
            this.messageCallbacks.delete(id);
          }
          break;
      }
    };

    this.worker.onerror = (error) => {
      console.error('Worker error:', error);
      useAIStore.getState().setError('Worker execution failed');
    };

    // Auto-init model
    this.worker.postMessage({ type: 'INIT_MODEL' });
  }

  public async generateSensitivity(specs: any): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.worker) {
        reject(new Error('AI Worker not initialized'));
        return;
      }

      const status = useAIStore.getState().status;
      if (status !== 'ready') {
        reject(new Error('Model is not ready yet'));
        return;
      }

      const id = `gen_${this.generateCounter++}`;
      
      const prompt = `Calculate Free Fire sensitivity for: 
      Device: ${specs.manufacturer} ${specs.deviceName}
      RAM: ${specs.ram}GB
      Processor: ${specs.processor}
      Refresh Rate: ${specs.refreshRate}Hz
      Screen Size: ${specs.screenSize} inches
      Resolution: ${specs.resolution}
      Target FPS: ${specs.fps}
      Play Style: ${specs.playStyle}
      
      Provide general, redDot, scope2x, scope4x, sniperScope, and freeLook as numbers from 0 to 100 in JSON format.`;

      this.messageCallbacks.set(id, (result) => {
        resolve(result);
      });

      this.worker.postMessage({ type: 'GENERATE', data: { prompt, id } });
    });
  }
  
  public dispose() {
    if (this.worker) {
      this.worker.postMessage({ type: 'DISPOSE' });
      this.worker.terminate();
      this.worker = null;
    }
  }
}

export const aiManager = new AIManager();
