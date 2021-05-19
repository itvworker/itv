const webpack = require('webpack')
const VueLoaderPlugins = require('vue-loader/lib/plugin');
let VueLoaderPlugin = null
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '../../', dir)
}

let apply = VueLoaderPlugins.prototype.apply;

VueLoaderPlugins.prototype.apply = function(compiler) {
  let rawRules = compiler.options.module.rules;     
  
  rawRules.forEach(item => {
      if(item.test.test('foo.js')) {
        if(item.include) {
            if(Array.isArray(item.include)) {
              item.include.push(resolve('node_modules/itv-ui'))
            }else{
              item.include=[item.include, resolve('node_modules/itv-ui')]
            }
        }
      }
  });


  apply.call(this, compiler)
 
}

if (webpack.version && webpack.version[0] > 4) {
  // webpack5 and upper
  VueLoaderPlugin = require('./plugin-webpack5')
} else {
  // webpack4 and lower
  VueLoaderPlugin = require('./plugin-webpack4')
}

module.exports = VueLoaderPlugin
