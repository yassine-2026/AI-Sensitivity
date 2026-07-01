import { TextGenerationPipeline } from '@huggingface/transformers';

export class InferenceEngine {
  private generator: TextGenerationPipeline | null = null;
  
  setGenerator(generator: TextGenerationPipeline) {
    this.generator = generator;
  }
  
  isReady() {
    return this.generator !== null;
  }
  
  async generate(prompt: string): Promise<string> {
    if (!this.generator) throw new Error('Engine not ready');
    
    const messages = [
      { role: 'system', content: 'You are an AI that calculates Free Fire sensitivity settings based on device hardware. Return ONLY valid JSON containing numeric values 0-100.' },
      { role: 'user', content: prompt }
    ];

    const text = this.generator.tokenizer.apply_chat_template(messages, { tokenize: false, add_generation_prompt: true }) as string;

    const result = await this.generator(text, {
      max_new_tokens: 256,
      temperature: 0.1,
      repetition_penalty: 1.1,
    });

    return (result as any)[0]?.generated_text || '';
  }
  
  async dispose() {
    if (this.generator) {
      await this.generator.dispose();
      this.generator = null;
    }
  }
}
