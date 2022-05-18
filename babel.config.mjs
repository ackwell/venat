export default {
  exclude: ['node_modules/**'],
  assumptions: { setPublicClassFields: true },
  presets: [
    ['@babel/preset-env', { targets: 'node 16.6' }],
    ['@babel/preset-typescript', { onlyRemoveTypeImports: true }],
  ],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
    '@babel/plugin-proposal-class-properties',
  ],
  // override: [{ include: ['node_modules/**/discord.js/typings/**/*'] }],
};
