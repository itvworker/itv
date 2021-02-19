
const { Compiler } = require("webpack");
const RuleSet = require('webpack/lib/RuleSet');
class ItvPlugin {
    constructor(content){
      this.options = content || {}
    }
    // 将 `apply` 定义为其原型方法，此方法以 compiler 作为参数
    apply(compiler) {
      let rawRules = compiler.options.module.rules;
      rawRules.forEach((item)=>{
        if(item&&item.resource && !item.resourceQuery) {
            let vueLoaderReg = /vue-loader/ig;
            let babelLoader = /babel-loader/ig;
            let tsLoader =/ts-loader/ig;
            let str = JSON.stringify(item.use);

            if(vueLoaderReg.test(str)) {
              item.use.push({
                loader:'itv-plugin/loaders/itv-loader',
                options: this.options
              })
              item.use.push({
                loader:'itv-plugin/loaders/itv-import-loader'
              })
            }

            if(babelLoader.test(str)) {
              item.use.push({
                loader:'itv-plugin/loaders/itv-import-loader'
              })
            }

            if(tsLoader.test(str)) {
              item.use.push({
                loader:'itv-plugin/loaders/itv-import-loader'
              })
            }
                        
        }
      })
     
      
    }
    
  }

  module.exports = ItvPlugin;