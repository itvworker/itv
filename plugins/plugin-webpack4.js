
const { Compiler } = require("webpack");
const RuleSet = require('webpack/lib/RuleSet');
class ItvPlugin {
    constructor(content){
      this.options = content || {}
    }
    // 将 `apply` 定义为其原型方法，此方法以 compiler 作为参数
    apply(compiler) {
      let rawRules = compiler.options.module.rules;
      // console.log(rawRules);
      //标准化rules
      // const { rules } = new RuleSet(rawRules);
      //查找对应该的规则
      // let ruleIndex = rawRules.findIndex(this.createMatcher(`foo.vue`));
      // console.log(ruleIndex);
      // let ruleJsIndex = rawRules.findIndex(this.createMatcher(`foo.js`))
      // let ruleTsIndex = rawRules.findIndex(this.createMatcher(`foo.ts`))
      // console.log('---------------+++ ==== ==== === ==++++======-----');
      // console.log(ruleIndex);
      // console.log(rules[ruleIndex].use);
      rawRules.forEach((item)=>{
        if(item&&item.resource && !item.resourceQuery) {
            let vueLoaderReg = /vue-loader/ig;
            let babelLoader = /babel-loader/ig;
            let tsLoader =/ts-loader/ig;
            let str = JSON.stringify(item.use);

            if(vueLoaderReg.test(str)) {
              item.use.push({
                loader:'/loaders/itv-loader'
              })
            }

            if(babelLoader.test(str)) {
              item.use.push({
                loader:'/loaders/itv-import-loader'
              })
            }

            if(tsLoader.test(str)) {
              item.use.push({
                loader:'/loaders/itv-import-loader'
              })
            }
                        
        }
      })
     
      rawRules.forEach((item)=>{
        console.log(item.use);
      })

      
      
      
    }
    createMatcher (fakeFile) {
      console.log(fakeFile);
      return (rule, i) => {
        //跳过include
        const clone = Object.assign({}, rule)
        delete clone.include //
        const normalized = RuleSet.normalizeRule(clone, {}, '')
        return (
          !rule.enforce &&
          normalized.resource &&
          normalized.resource(fakeFile)
        )
      }
    }
    
  }

  module.exports = ItvPlugin;