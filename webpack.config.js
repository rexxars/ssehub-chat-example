'use strict';

var webpack = require('webpack');
var path = require('path');

var production = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: production ? null : 'eval',
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['jsx?harmony'], exclude: /node_modules/ }
        ],
        noParse: [/react(-with-addons)?\.min\.js/]
    },

    output: {
        path: path.join(__dirname, 'public', 'js'),
        filename: 'chat-app.min.js',
        publicPath: '/public/js'
    },

    entry: path.join(__dirname, '/frontend/index.js'),

    plugins: production ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin()
    ] : [
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        alias: production ? {
            'react': 'react/dist/react.min.js'
        } : {}
    }
};
