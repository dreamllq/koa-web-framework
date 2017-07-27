const webpack = require('atool-build/lib/webpack');
const path = require('path');

module.exports = function (webpackConfig) {
    webpackConfig.babel.plugins.push(['import', {
        style: "css",
        libraryName: 'antd'
    }]);
    webpackConfig.module.loaders.push(
        {test: /\.scss/, loader: "style!css!postcss!sass"}
    );
    webpackConfig.output.filename = "[name].admin.bundle.js";
    webpackConfig.output.publicPath = '/admin/build/';
    webpackConfig.output.chunkFilename = '[name].admin.chunk.js';

    webpackConfig.entry = {
        common: ['react', 'classnames', 'dva'],
        index: './public/admin/index.js'
    };

    webpackConfig.plugins.splice(4, 1);
    return webpackConfig;
};

