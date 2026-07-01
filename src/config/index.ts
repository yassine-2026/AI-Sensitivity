export const config = {
  apiBaseUrl: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api',
  appVersion: '1.0.0',
  isMaintenance: false,
};
