import { pipeline, env, TextGenerationPipeline } from '@huggingface/transformers';

// Configure environment for browser caching and performance
env.allowLocalModels = false;
env.useBrowserCache = true;
// @ts-ignore - WebGPU setting
env.backends.onnx.wasm.numThreads = 1;

let generator: TextGenerationPipeline | null = null;
let currentModelId = 'Xenova/Qwen1.5-0.5B-Chat';

// To calculate speed
let lastTime = performance.now();
let lastLoadedBytes = 0;

self.addEventListener('message', async (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'INIT_MODEL':
      try {
        if (generator) {
          self.postMessage({ type: 'STATUS', status: 'ready' });
          return;
        }

        self.postMessage({ type: 'STATUS', status: 'loading' });
        
        let device = 'wasm';
        
        // Check WebGPU support
        if ((navigator as any).gpu) {
          try {
            const adapter = await (navigator as any).gpu.requestAdapter();
            if (adapter) {
              device = 'webgpu';
            }
          } catch (e) {
            console.warn('WebGPU not supported, falling back to wasm', e);
          }
        }

        generator = await pipeline('text-generation', currentModelId, {
          device: device as any,
          progress_callback: (progressInfo: any) => {
            if (progressInfo.status === 'progress') {
              const now = performance.now();
              const timeDiffSec = (now - lastTime) / 1000;
              const loadedDiff = progressInfo.loaded - lastLoadedBytes;
              
              let speed = 0;
              if (timeDiffSec > 0.5) {
                speed = loadedDiff / timeDiffSec;
                lastTime = now;
                lastLoadedBytes = progressInfo.loaded;
              }

              const timeRemaining = speed > 0 ? (progressInfo.total - progressInfo.loaded) / speed : 0;

              self.postMessage({
                type: 'PROGRESS',
                progress: {
                  progress: progressInfo.progress || (progressInfo.loaded / progressInfo.total) * 100,
                  downloadedBytes: progressInfo.loaded,
                  totalBytes: progressInfo.total,
                  speedBytesPerSec: speed,
                  timeRemainingSec: timeRemaining
                }
              });
            } else if (progressInfo.status === 'ready') {
              self.postMessage({ type: 'STATUS', status: 'ready' });
            } else if (progressInfo.status === 'downloading') {
              self.postMessage({ type: 'STATUS', status: 'loading' });
            }
          }
        });
        
        self.postMessage({ type: 'STATUS', status: 'ready' });

      } catch (error: any) {
        console.error('Error initializing model:', error);
        self.postMessage({ type: 'ERROR', message: error.message || 'Failed to load model' });
      }
      break;

    case 'GENERATE':
      if (!generator) {
        self.postMessage({ type: 'ERROR', message: 'Model not initialized' });
        return;
      }
      try {
        const { prompt, id } = data;
        
        // Simple chat template
        const messages = [
          { role: 'system', content: 'You are an AI that calculates Free Fire sensitivity settings based on device hardware. Return ONLY JSON.' },
          { role: 'user', content: prompt }
        ];

        const text = generator.tokenizer.apply_chat_template(messages, { tokenize: false, add_generation_prompt: true }) as string;

        const result = await generator(text, {
          max_new_tokens: 256,
          temperature: 0.1,
          repetition_penalty: 1.1,
        });

        self.postMessage({
          type: 'GENERATE_RESULT',
          id,
          // @ts-ignore
          result: result[0]?.generated_text || 'Error generating text'
        });

      } catch (error: any) {
        self.postMessage({ type: 'ERROR', message: error.message || 'Error generating response' });
      }
      break;
      
    case 'DISPOSE':
      if (generator) {
        await generator.dispose();
        generator = null;
        self.postMessage({ type: 'STATUS', status: 'offline' });
      }
      break;
  }
});
