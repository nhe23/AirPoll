module.exports = {
  exclude: [ 'node_modules/apollo-link-http/**', 'node_modules/apollo-link/**', 'node_modules/apollo-client/**'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
}