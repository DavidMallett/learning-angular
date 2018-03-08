module.exports = {
  entry: './src/main.ts',
  output: {
    filename: 'dist/bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.ts?$/,
        exclude: [/node_modules/, /dist/],
        loader: 'ts-loader'
      }
    ],
    rules: [
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
