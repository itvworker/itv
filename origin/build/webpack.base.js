const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: resolve(''),
    target: 'web',
    entry: {
        app: ['@babel/polyfill', './src/main.js'],
    },
    output: {
        path: resolve('dist'),
        filename: 'static/js/[name].[hash:4].js', // [name]打包后的文件名称,进入是什么名字出来也是
        chunkFilename: 'static/js/[name].[hash].js',
        publicPath: './',
    },
    
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            soureMap: true,
                        },
                    },
                ],
            },

            {
                test: /\.(less|css)$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? {
                            loader: 'vue-style-loader',
                        }
                        : {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../../',
                            },
                        },

                    {
                        loader: 'css-loader',
                    },
                    
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            importLoaders: 5,
                            javascriptEnabled: true,
                        },
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [resolve('src/assets/css/animate.less'), resolve('src/assets/css/page.less')]
                        },
                    },
                ],
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: "markdown-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [{ loader: 'babel-loader' }],
                // include: [resolve('src'),  resolve('node_modules/itv-ui'), resolve('node_modules/webpack-dev-server/client')],
                // include: [resolve('src'),  resolve('node_modules/webpack-dev-server/client')],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,

                loader: 'url-loader',
                options: {
                    limit: 1000,
                    fallback: 'file-loader',
                    esModule: false,
                    outputPath: './static/assets/img',
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    fallback: 'file-loader',
                    esModule: false,
                    outputPath: './static/assets/media',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    fallback: 'file-loader',
                    esModule: false,
                    outputPath: './static/assets/font',
                },
            },
        ],
    },
}
