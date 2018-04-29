const path                  = require('path');
const webpack               = require('webpack');
const UglifyJsPlugin        = require('uglifyjs-webpack-plugin');
const GlobImporter          = require('node-sass-glob-importer');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const CleanWebpackPlugin    = require('clean-webpack-plugin');
const ImageminPlugin        = require('imagemin-webpack-plugin').default
const CopyWebpackPlugin     = require('copy-webpack-plugin');

// compile to single .css file
let extractPlugin         = new ExtractTextPlugin({
    filename: 'main.css'
});

module.exports = {
    mode: 'development',
    entry: {
        app: './client/src/app.js',
    },
    output: {
        path: path.resolve(__dirname, 'client/dist/'),
        filename: 'bundle.js',
        // publicPath: '/client/src' // not totally sure what this is for
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    },
                    {
                        loader: 'angularjs-template-loader',
                        options: {
                            relativeTo: path.resolve(__dirname, 'client/src/')
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader',
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: extractPlugin.extract({
                    use: [
                        'css-loader'
                    ]
                })
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            }, 
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            }, 
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: 'application/octet-stream'
                }
            }, 
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            }, 
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: "image/svg+xml"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            context: 'client/src/',
                            useRelativePath: false,
                            name: '[path][name].[ext]'
                        }
                    }
                ],
                exclude: path.resolve(__dirname, 'client/src/index.html')
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            async: 'async',
            Popper: ['popper.js', 'default'],
        }),
        extractPlugin,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'client/src/index.html'
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'admin.html',
        //     template: 'client/src/admin.html',
        //     chunks: []
        // }),
        new CopyWebpackPlugin([{
                context: 'client/src',
                from: 'robots.txt'
            },
            {
                context: 'client/src',
                from: 'assets',
                to: 'assets/'
            }
        ]),
        new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
        new CleanWebpackPlugin(['client/dist'])
    ],
    devServer: {
        // contentBase: path.join(__dirname, "client/dist/"),
        // compress: true,
        port: 9000
    }
};