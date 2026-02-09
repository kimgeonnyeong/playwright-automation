import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'https://www.saucedemo.com',

    headless: false,

    launchOptions : {
      slowMo: 1000, 
        },

    video: 'on',

    screenshot: 'only-on-failure',

    trace: 'on-first-retry',
  },

  reporter: [
    ['html', { open: 'never' }],
  ],
});
