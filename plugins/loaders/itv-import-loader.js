let loaderUtils = require('loader-utils');
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
module.exports = function (source) {
    let reg = /import[ ]+\{[\w, ]+\}[ ]+from[ ]+["']+itv-ui["']+[ ]*[;]*/ig;
    source = source.replace("console.error('itv-ui没有引入itvPlugin，可能会导致打包过大');",'');    
    source = source.replace(reg, (str, index)=>{
      
            str = str.split('{')[1];
            str = str.split('}')[0];
            str = str.replace(/\s/ig,'');
            let strArr = str.split(',');
            let replaceStr = "";
           

            strArr.forEach((item, index)=>{
                if(item.indexOf('Plugin')===0 || item.indexOf('plugin')===0) {
                    let humpStr = item.substring(6,item.length);
                    let initial = humpStr.substring(0, 1).toLowerCase();
                        humpStr = humpStr.substring(1,humpStr.length);
                        replaceStr+=`import ${item} from "itv-ui/plugins/${initial+humpStr}.js";\n`
                }else{
                    let pathName = "itv-ui/itv-components/"+humpToFront(item)+"/index.js";
                    replaceStr+=`import ${item} from "${pathName}";\n`;
                } 
            })
            return replaceStr
        })

    return source
}