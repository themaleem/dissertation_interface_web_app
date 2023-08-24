import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    screenshotOnRunFailure: false,
    video: false
  },
  retries:{
    runMode:2,
  }
});
