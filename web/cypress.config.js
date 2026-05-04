const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true,
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440,
    viewportHeight: 900
    // video: true
    // Configuração de timeout implícito - não usar
    // defaultCommandTimeout: 10000
  },
});
