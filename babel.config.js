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
    ],
    plugins: [
        '@vue/babel-plugin-transform-vue-jsx',
        'babel-plugin-remove-vconsole',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-transform-runtime', {
            "corejs":3
        }],
        '@babel/plugin-transform-modules-commonjs',
        "@babel/plugin-transform-classes",
        "@babel/plugin-proposal-class-static-block",
        "@babel/plugin-proposal-class-properties"
    ],
}
