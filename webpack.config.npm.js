const path = require('path');
const WebpackModules = require('webpack-modules');

module.exports = {
  entry: './src/main.mjs',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'commonjs2'
  },
  mode: 'production',
  plugins: [
    new WebpackModules()
  ],
  target: 'node'
};
