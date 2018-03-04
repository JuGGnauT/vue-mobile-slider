var webpack = require('webpack');
var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var productionOptions = {
    entry: path.join(__dirname, 'src/index'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'vue-mobile-slider.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devtool:'source-map'
}
var devOptions = {
    entry: path.join(__dirname, 'src/index'),
    output: {
        path: path.join(__dirname, 'demo'),
        filename: 'vue-mobile-slider.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devtool:'source-map'
}

var base = {
    // devtool: 'inline-sourcemap',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /(node_modules)/
            },
            {
                test: /\.vue/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        css: 'style-loader!css-loader'
                    }
                }
            }
        ]
    },
    plugins: []
}
module.exports = Object.assign(base,productionOptions)
