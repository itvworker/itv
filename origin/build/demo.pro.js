
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const webpackConfig = require('./webpack.dome.pro.js')
const ora = require('ora')

console.log(
    '  Tip:\n' +
        '  Built files are meant to be served over an HTTP server.\n' +
        "  Opening index.html over file:// won't work.\n"
)

const spinner = ora('building for production...')
spinner.start()




webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    console.log(stats);
    console.log(err)
   
})
