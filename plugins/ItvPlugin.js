const RuleSet = require('webpack/lib/RuleSet');
class ItvPlugin {
    constructor(content){
      this.content = content;
    }
    // 将 `apply` 定义为其原型方法，此方法以 compiler 作为参数
    apply(compiler) {
      let rawRules = compiler.options.module.rules;

      //标准化rules
      const { rules } = new RuleSet(rawRules);
      //查找对应该的规则
      let ruleIndex = rawRules.findIndex(this.createMatcher(`foo.vue`))

      
      console.log('less-------');
      console.log(rules[ruleIndex].use);
      // console.log(rulesIndex);
      // console.log(rules)
      // rules.forEach(element => {
      //   console.log('----------------')
      //   console.log(element.use)
         
         
      // });

      // compiler.hooks.beforeRun.tapAsync('ItvPlugin', (context, entry) => {
      //   console.log(context);
        
      // });
      

      // 指定要附加到的事件钩子函数
      // console.log(compiler);
      // compiler.hooks.emit.tapAsync(
      //   'TestPlugin',
      //   (compilation, callback) => {
      //     console.log('This is an example plugin!');
      //     console.log('Here’s the `compilation` object which represents a single build of assets:', compilation);
          
        
      //     callback();x
      //   }
      // );
      // compiler.options.module.rules.push({ test: /\.(css)$/, loader: 'css-loader' })
   
      // console.log(compiler.options);
      
      // compiler.hooks.entryOption.tapAsync('TestPlugin',(arg, callback)=>{
      //   console.log('-----------------------');
      //   console.log(arguments);
      //   callback()
      // })
      
      
      
    }
    createMatcher (fakeFile) {
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