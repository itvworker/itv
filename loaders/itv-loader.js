let loaderUtils = require('loader-utils');
//驼峰转换
function humpToFront(name) {
    let arr = [];
    let nameArr = name.split('')
    nameArr.forEach((item,index)=>{
        if(/[A-Z]/.test(item) && index!==0) {
            arr.push(index);
        }
    })
    name = name.toLowerCase();
    let newName = '';
    arr.forEach((item,index)=>{
        if(index===0) {
            newName = name.substring(index, item);
        }else{
            newName += '-'+name.substring(arr[index-1], item);
        }
    });
    if(arr.length>=1) {
        newName += '-'+name.substring(arr[arr.length-1],name.length)
    }

    if(arr.length<=0) {
        newName = name;
    }
    return newName;
}
module.exports = function (source,p) {
    // const options = loaderUtils.getOptions(this)
   
    let opt = loaderUtils.getOptions(this) 
    // console.log(opt);
    if(opt && opt.theme) {
        source = source.replace(/\.\.\/\.\.\/assets\/css\/itv-theme.less/ig, opt.theme);
    }
    if(opt) {
        Object.keys(opt).forEach((item,index)=>{
            let reg = new RegExp('itv-'+humpToFront(item)+'.less',"ig")
            source = source.replace(reg, opt[item]);
        })
    }
    
    return source
}