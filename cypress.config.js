const { defineConfig } = require("cypress");

module.exports = defineConfig({
  nodeRequire: {
    faker: "faker"
  },
  
  e2e: {
    baseUrl: "https://inctagram-neon.vercel.app",
    email: "cargo@insbro.ru",
    password: "Qwerty123!",
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
  },
 });

