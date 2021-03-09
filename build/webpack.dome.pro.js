const path = require('path')
const config = require('./config')
const loader = require('./loader')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ItvPlugin = require('itv-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { log } = require('console')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

console.log(resolve("dist"));

module.exports = {
    mode: 'production',
    context: resolve(''),
    target: 'web',
    entry: {
        app: ['@babel/polyfill', './src/main.js']
    },
    output: {
        path: resolve('dist'),
        filename: '[name].[hash:4].js', // [name]打包后的文件名称,进入是什么名字出来也是
        chunkFilename: '[name].[hash].js',
        publicPath: './'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    optimization: {
        minimize: true,
        splitChunks: {
            cacheGroups: {
                common: {
                    chunks: 'initial',
                    name: 'repeat', // 打包后的文件名
                    minSize: 0,
                    minChunks: 2, // 重复2次才能打包到此模块
                },
                vendor: {
                    priority: 1, // 优先级配置，优先匹配优先级更高的规则，不设置的规则优先级默认为0
                    test: /node_modules/, // 匹配对应文件
                    chunks: 'initial',
                    name: 'vendor',
                    minSize: 0,
                    minChunks: 1,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {loader: 'vue-loader'},
                    
                ]

            },
           
            {
                test: /\.(less|css)$/,
                use: [ //loader从后向前执行，顺序不能乱，会不能编译
                  
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            importLoaders: 5,
                            javascriptEnabled: true
                        }
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [resolve('src/assets/css/animate.less'), resolve('src/assets/css/page.less')]
                        }
                    }

                ]
                // include: [resolve('src'),resolve('node_modules/itv-ui')]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
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
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    esModule: false,
                    name: './static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 1000,
                    name: './static/media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 1000,
                    name: './static/font/[name].[hash:7].[ext]'
                }
            }
        ]

    },
  
    plugins: [
        new VueLoaderPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.dev.html',
            inject: true
        }),
       
        new ItvPlugin({
            theme:resolve('src/assets/theme.less')
        }),
       
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: './static',
                ignore: ['.*'],
            },
        ]),
        new CleanWebpackPlugin(),
    ]
}
