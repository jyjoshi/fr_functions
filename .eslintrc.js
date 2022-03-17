module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    // "eslint:recommended",
    'google',
  ],
  rules: {
    // quotes: ["error", "double"],
    'linebreak-style': ['error', (process.platform === 'win64' ? 'windows' : 'unix')],
    'max-len': ['error', 120, 4],

  },
};
