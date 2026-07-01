import { pipeline, TextGenerationPipeline } from '@huggingface/transformers';
import { ModelCache } from './ModelCache';
import { DeviceAnalyzer } from './DeviceAnalyzer';
import { ModelVersionManager } from './ModelVersionManager';

export class ModelLoader {
  static async load(onProgress: (info: any) => void): Promise<TextGenerationPipeline> {
    ModelCache.configure();
    const device = await DeviceAnalyzer.getBestBackend();
    const modelId = ModelVersionManager.getModelId();
    
    return await pipeline('text-generation', modelId, {
      device: device as any,
      progress_callback: onProgress
    }) as TextGenerationPipeline;
  }
}
