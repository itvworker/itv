module.exports = {
    presets: [
        [
            '@babel/preset-env',
            // "@babel/preset-typescript",
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
}
