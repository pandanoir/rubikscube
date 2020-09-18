module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: require('path').resolve(__dirname, './src/cube.ts'),
  output: {
    filename: 'cube.js',
    path: require('path').resolve(__dirname, './dist'),
    library: 'Cube',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
};
