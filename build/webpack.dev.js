const path = require('path')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WatchDonePlugin = require('./watch');
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: resolve(''),
    mode:"development",
    target: 'web',
    entry: {
        app: ['@babel/polyfill', './src/main.ts']
    },
    output: {
        path: resolve('dist'),
        filename: 'static/js/[name].[hash:4].js', // [name]打包后的文件名称,进入是什么名字出来也是
        chunkFilename: 'static/js/[name].[hash].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.tsx', '.ts'],
        alias: {
            // vue$: 'vue/dist/vue.esm.js',
            vue: 'vue/dist/vue.esm-browser.js',
            '@': resolve('src'),
        },
    },
    
    devServer: {
        // 设置基本结构
        contentBase: resolve('dist'),
        host: '0.0.0.0', // 服务器IP地址,可以是localhost
        compress: true, // 服务端压缩是否开启
        open: false, // 自动打开浏览器
        hot: true, // 开启热更新
        port: 8888
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)(\?.*)?$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
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
                        loader: 'less-loader'
                    },
                    // {
                    //     loader: 'sass-resources-loader',
                    //     options: {
                    //         resources: [resolve('src/assets/css/animate.less'), resolve('src/assets/css/page.less')]
                    //     },
                    // },
                ],
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

            
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '/public/index.dev.html',
            inject: true
        }),
        new WatchDonePlugin()
    ]
}
