

const common = {
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.css$/, loader: ['style-loader', 'css-loader']}
    ]
  },
  devtool: "source-map"
}

const client = {
  entry: './client/src/index.jsx',
  output: {
    filename: './client/dist/bundle.js'
  }
};

const server = {
  entry: './server.js',
  target: 'node',
  output: {
    filename: './client/dist/bundle-server.js'
    libraryTarget: 'commonjs-module'
  }
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];