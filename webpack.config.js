const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const lifecycleEvent = process.env.npm_lifecycle_event;
const sourcePath = path.join(__dirname, './src');
const isDev = lifecycleEvent === 'devserver';
const isProd = lifecycleEvent === 'build';

module.exports = function (env) {
    const config = {
        devtool: isProd ? 'source-map' : 'eval',
        context: sourcePath,
        entry: {
            app: './main.js'
        },
        output: {
            path: path.resolve(__dirname, './public'),
            filename: '[name].bundle.js'
        },
        resolve: {
            modules: [
                path.resolve(__dirname, 'node_modules'),
                sourcePath
            ],
            extensions: ['.json', '.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [/node_modules/, /public/],
                    use: [
                        'babel-loader'
                    ]
                },
                {
                    test: /\.gif$/,
                    use: {
                        loader: 'url-loader',
                        query: {
                            limit: '10000',
                            mimetype: 'image/gif'
                        }
                    }
                },
                {
                    test: /\.jpg$/,
                    use: {
                        loader: 'url-loader',
                        query: {
                            limit: '10000',
                            mimetype: 'image/jpg'
                        }
                    }
                },
                {
                    test: /\.png$/,
                    use: {
                        loader: 'url-loader',
                        query: {
                            limit: '10000',
                            mimetype: 'image/png$'
                        }
                    }
                },
                {
                    test: /\.svg$/,
                    use: {
                        loader: 'url-loader',
                        query: {
                            limit: '10000',
                            mimetype: 'image/svg+xml'
                        }
                    }
                },
                {
                    test: /\.jsx$/,
                    exclude: [/node_modules/, /public/],
                    use: [
                        "react-hot-loader",
                        "babel-loader"
                    ]
                },
                {
                    test: /\.json$/,
                    use: ["json-loader"]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|svg)$/i,
                    use: {
                        loader: 'file-loader',
                        query: {
                            name: 'fonts/[name]-[hash].[ext]'
                        }
                    }
                }
            ]
        }
    };

    if (isDev) {
        config.module.rules.push({
            test: /\.css$/,
            exclude: [/node_modules/, /public/],
            use: [
                "style-loader",
                "css-loader",
                "autoprefixer-loader"
            ]
        },
        {
            test: /\.less$/,
            use: [
                "style-loader",
                "css-loader",
                "autoprefixer-loader",
                "less-loader"
            ],
            exclude: [/node_modules/, /public/]
        });
    } else if (isProd) {
        config.module.rules.push({
            test: /\.css$/,
            use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
            exclude: [/node_modules/, /public/]
        },
        {
            test: /\.less$/,
            use: ExtractTextPlugin.extract(
                { fallback: 'style-loader', use: 'css-loader!autoprefixer-loader!less-loader' }
            ),
            exclude: [/node_modules/, /public/]
        });
        config.plugins = [
            new ExtractTextPlugin('styles.css')
        ];
    };
    return config;
};
