const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
// const uglifyJsContents = require('uglify-js');
const jsonminify= require('jsonminify');

module.exports = {

    entry: {
        bundle: './src/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.min.js'
    },


    resolve: {
        modules: ['node_modules']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|dist)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'src/images',
                to: 'images'
            }
        ]),
        new CopyWebpackPlugin([{
            from: './src/data/',
            to: 'data',
            transform: function(fileContent, path) {
                let pattJSON = /\.json$/gi; // filter json file
                if(pattJSON.test(path)){
                    return jsonminify(fileContent.toString());
                }
                return fileContent;
            }
        }])
    ]
};
