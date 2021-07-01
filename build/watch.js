chalk = require('chalk')
class WatchDonePlugin {
  apply(compiler) {
    let obj = compiler.options.devServer
    compiler.hooks.done.tap('WatchDonePlugin', (
      stats /* stats is passed as an argument when done hook is tapped.  */
    ) => {
      setTimeout(()=>{
        let url = `http://${obj.host?obj.host:localhost}:${obj.port}`
        url =`Project is running at ${chalk.cyan(url)}`
        console.log(url);
      })
    });
  }
}

module.exports = WatchDonePlugin;