export interface DeviceSpecs {
  deviceType: string;
  deviceName: string;
  manufacturer: string;
  os: string;
  osVersion: string;
  ram: string;
  processor: string;
  resolution: string;
  screenSize: string;
  refreshRate: string;
  fps: string;
  playStyle: string;
}

export interface SensitivitySettings {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniperScope: number;
  freeLook: number;
}
