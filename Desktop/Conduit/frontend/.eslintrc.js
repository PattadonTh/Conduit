module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint', // Ensure you're using the babel-eslint parser
    ecmaVersion: 12,
    sourceType: 'module',
    requireConfigFile: false, // Disable config file checking if needed
  },
  rules: {
    // Add custom rules here
    'vue/multi-word-component-names': 'off', // Example of allowing single-word component names
  },
};
