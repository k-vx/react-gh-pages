
var path = require('path');

module.exports = {
  entry: './project/frontend/src/index.js',
  output: {
    path: path.join(__dirname, 'project/frontend/static/frontend/'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      { 
        test: /\.(woff2?|svg)$/, 
        loader: 'url-loader?limit=10000' 
      },
      { 
        test: /\.(ttf|eot)$/, 
        loader: 'file-loader' 
      },
    ],
  },
};