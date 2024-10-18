const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    devtool: 'eval-source-map',
    output: {
        filename: 'bundle-[contenthash:6].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true 
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './assets/index.html',  
            filename: 'index.html',  
        })
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'assets'),  
        },   
    },
};