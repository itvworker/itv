module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                targets: {
                    chrome: '58',
                    ie: '11',
                    node:'current'
                }
            },
        ],
    ],
    plugins: [
        '@vue/babel-plugin-transform-vue-jsx',
        'babel-plugin-remove-vconsole',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-modules-commonjs',
        "@babel/plugin-transform-classes",
        "@babel/plugin-proposal-class-static-block",
        "@babel/plugin-proposal-class-properties"
    ],
}
