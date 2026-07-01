import { ModelLoader } from './core/ModelLoader';
import { InferenceEngine } from './core/InferenceEngine';
import { ModelDownloader } from './core/ModelDownloader';

const engine = new InferenceEngine();
const downloader = new ModelDownloader();

self.addEventListener('message', async (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'INIT_MODEL':
      try {
        if (engine.isReady()) {
          self.postMessage({ type: 'STATUS', status: 'ready' });
          return;
        }

        self.postMessage({ type: 'STATUS', status: 'loading' });
        
        const generator = await ModelLoader.load((progressInfo: any) => {
          downloader.handleProgress(
            progressInfo,
            (progress, downloadedBytes, totalBytes, speedBytesPerSec, timeRemainingSec) => {
              self.postMessage({
                type: 'PROGRESS',
                progress: { progress, downloadedBytes, totalBytes, speedBytesPerSec, timeRemainingSec }
              });
            },
            () => self.postMessage({ type: 'STATUS', status: 'ready' }),
            () => self.postMessage({ type: 'STATUS', status: 'loading' })
          );
        });
        
        engine.setGenerator(generator);
        self.postMessage({ type: 'STATUS', status: 'ready' });

      } catch (error: any) {
        console.error('Error initializing model:', error);
        self.postMessage({ type: 'ERROR', message: error.message || 'Failed to load model' });
      }
      break;

    case 'GENERATE':
      if (!engine.isReady()) {
        self.postMessage({ type: 'ERROR', message: 'Model not initialized' });
        return;
      }
      try {
        const { prompt, id } = data;
        const result = await engine.generate(prompt);

        self.postMessage({
          type: 'GENERATE_RESULT',
          id,
          result
        });

      } catch (error: any) {
        self.postMessage({ type: 'ERROR', message: error.message || 'Error generating response' });
      }
      break;
      
    case 'DISPOSE':
      await engine.dispose();
      self.postMessage({ type: 'STATUS', status: 'offline' });
      break;
  }
});
