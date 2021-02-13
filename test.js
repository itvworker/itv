let arr = [
    {
        test: /\.vue$/,
        use: [
            {loader: 'vue-loader'}
        ]

    },
    {
        test: /\.css$/,
        use: [
            'vue-style-loader',
            'css-loader'
        ]

    },
    {
        test: /\.less$/,
        use: [ //loader从后向前执行，顺序不能乱，会不能编译
            {
                loader: 'vue-style-loader'
            },
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
                loader: 'sass-resources-loader'
            }

        ],
        include: [resolve('src')]
    },
    {
        test: /\.js$/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    sourceMap: true,
                }
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
            name: 'static/img/[name].[hash:7].[ext]'
        }
    },
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            esModule: false,
            limit: 1000,
            name: 'static/media/[name].[hash:7].[ext]'
        }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            esModule: false,
            limit: 1000,
            name: 'static/font/[name].[hash:7].[ext]'
        }
    }
]
[
    {
        test: /\.vue$/,
        use: [
            {loader: 'vue-loader'}
        ]

    },
    {
        test: /\.css$/,
        use: [
            'vue-style-loader',
            'css-loader'
        ]

    },
    {
        test: /\.less$/,
        use: [ //loader从后向前执行，顺序不能乱，会不能编译
            {
                loader: 'vue-style-loader'
            },
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
                    resources: []
                }
            }

        ]
    },
    {
        test: /\.js$/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    sourceMap: true,
                }
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
            name: 'static/img/[name].[hash:7].[ext]'
        }
    },
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            esModule: false,
            limit: 1000,
            name: 'static/media/[name].[hash:7].[ext]'
        }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            esModule: false,
            limit: 1000,
            name: 'static/font/[name].[hash:7].[ext]'
        }
    }
]
