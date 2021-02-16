let loaderUtils = require('loader-utils');
module.exports = function (source) {
    // const options = loaderUtils.getOptions(this)
    let opt = loaderUtils.getOptions(this) 
    // console.log(opt);
    if(opt && opt.theme) {
        source = source.replace(/\.\.\/\.\.\/assets\/css\/itv-theme.less/ig, opt.theme);
    }
    

    // console.log(source);
    // let str = ""
    
    //  if(opt && opt.resources) {
    //     opt.resources.forEach(element => {
    //         str +="@import '"+element+"';"
    //     });
    //  }
    // source =str+source

    // console.log(source);
    return source
}