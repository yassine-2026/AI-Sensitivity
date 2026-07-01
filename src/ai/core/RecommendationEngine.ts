export class RecommendationEngine {
  static buildPrompt(specs: any): string {
    return `Calculate optimal Free Fire sensitivity settings for:
Device: ${specs.manufacturer} ${specs.deviceName}
RAM: ${specs.ram}GB
Processor: ${specs.processor}
Refresh Rate: ${specs.refreshRate}Hz
Screen Size: ${specs.screenSize} inches
Resolution: ${specs.resolution}
Target FPS: ${specs.fps}
Play Style: ${specs.playStyle}

Provide the following settings as JSON properties mapped to a number between 0 and 100:
"general", "redDot", "scope2x", "scope4x", "sniperScope", "freeLook".

Output ONLY valid JSON.
Example: {"general": 95, "redDot": 90, "scope2x": 85, "scope4x": 80, "sniperScope": 50, "freeLook": 70}`;
  }
  
  static parseResult(resultText: string): any {
    try {
      // Find JSON block if it was wrapped in markdown
      const match = resultText.match(/\{[\s\S]*\}/);
      if (match) {
        return JSON.parse(match[0]);
      }
      return JSON.parse(resultText);
    } catch (e) {
      throw new Error('Failed to parse AI output as JSON. Raw output: ' + resultText);
    }
  }
  
  static formatForDisplay(parsed: any): string {
    if (!parsed) return '';
    return JSON.stringify(parsed, null, 2);
  }
}
