const debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
module.exports = {
    context: __dirname + "/public/js",
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./lib/home",
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0'],
                    plugins: ['transform-class-properties', 'transform-decorators-legacy']
                }
            }
        ]
    },
    output: {
        path: __dirname + "/public/js/min",
        filename: "[name].min.js"
    },
    watch: true,
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};