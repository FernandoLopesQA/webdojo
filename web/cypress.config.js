const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // experimentalStudio: true
    // Configuração de timeout implícito - não usar
    // defaultCommandTimeout: 10000
  },
});
