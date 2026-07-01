export class DeviceAnalyzer {
  static async getBestBackend(): Promise<'webgpu' | 'wasm'> {
    if ((navigator as any).gpu) {
      try {
        const adapter = await (navigator as any).gpu.requestAdapter();
        if (adapter) return 'webgpu';
      } catch (e) {
        console.warn('WebGPU check failed, falling back to wasm', e);
      }
    }
    return 'wasm';
  }
}
