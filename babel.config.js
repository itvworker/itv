module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: 'entry',
                targets: {
                    chrome: '58',
                    ie: '10',
                },
            },
        ],
        "@babel/typescript",
    ],
    plugins: [
        "@vue/babel-plugin-jsx",
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-modules-commonjs',
        "@babel/plugin-transform-classes",
        "@babel/plugin-proposal-class-static-block",
        "@babel/plugin-proposal-class-properties"
    ],
    overrides: [ //必要，用于转换vue文件的ts,tsx文件
        {
            test: /\.vue$/,
            plugins: [
                '@babel/transform-typescript',
            ]
        }
    ]
}
