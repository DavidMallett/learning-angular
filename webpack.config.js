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
        test: /\.tsx?$/,
        exclude: [/node_modules/, /dist/],
        loader: 'ts-loader'
      }
    ]
  }
};
