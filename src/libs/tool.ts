// let content = `<svg t="1580716909778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M512 64a448 448 0 1 1-448 448 448 448 0 0 1 448-448m0-64a512 512 0 1 0 512 512 512 512 0 0 0-512-512z" fill="iconColor"></path><path d="M768 362.24a32 32 0 0 0-44.8 0L448 632.96 302.72 486.4a32 32 0 1 0-46.72 44.8l148.48 147.2 45.44 45.44L768 407.68a32 32 0 0 0 0-45.44z" fill="iconColor"></path></svg>`
// content = content.replace(/</ig,'%3c').replace(/\//ig,'%2f').replace(/>/ig, '%3e').replace(/"/ig, "'")
// console.log(content);

export function svgXml(content:string):string {
    content = content.replace(/</ig,'%3c').replace(/\//ig,'%2f').replace(/>/ig, '%3e').replace(/"/ig, "'");
    return 'data:image/svg+xml,'+ content;
}


export function slideHeight (dom: any) {
    return function(height:number) {
        dom.style.height = height + 'px';
    };
}

/**
 * 格式化时间
 * @param {String,Number} arg 时戳或日期字符串
 * @param {String} format 格式化的时间 Y：年 M:月 D:日 h：时 m:分 s:秒
 */
export function formatDate(arg:any="", format:string):string {
    // console.log(typeof arg.toString());
   

    if(typeof arg === "string") {
        arg = arg.replace(/-/ig, '/');
        if(arg.indexOf('/')<0) {
            arg = parseInt(arg);
        }
        if(arg.length===7 && arg.indexOf('/')===4) {
            arg = arg+'/01'
        }
    }
    
    format = format || "Y/M/D h:m";
    let now:any = ''
    if(!arg) {
        now = new Date();
    }else{
        now = new Date(arg);
    }
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    month = month >= 10 ? month : "0" + month;
    var date = now.getDate();
    date = date >= 10 ? date : "0" + date;
    var hour = now.getHours();
    hour = hour >= 10 ? hour : "0" + hour;
    var minute = now.getMinutes();
  
    minute = minute >= 10 ? minute : "0" + minute;
    var second = now.getSeconds();
    second = second >= 10 ? second : "0" + second;
    return format
      .replace("Y", year)
      .replace("M", month)
      .replace("D", date)
      .replace("h", hour)
      .replace("m", minute)
      .replace("s", second);
  }
  /**
   * 压缩html字符串
   */
export function compressHtmlStr(value:string) {
    return value.replace(/\n/g, '').replace(/(^\s*)|(\s*$)/g, "").replace(/(>)(\s*)(<)/g, function (match, p1, p2, p3, offset) {
        return p1 + p3
    });      　　 
}
/**
 * 驼峰命名转换为前-号命名
 */
export function humpToFront(name: string) {
        let arr:number[] = [];
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
                console.log(newName);
            }else{
                newName += '-'+name.substring(arr[index-1], item);
            }
        });
        if(arr.length>=1) {
            newName += '-'+name.substring(arr[arr.length-1],name.length)
        }
        return newName;
}

/**
 * @description 判断数据类型
 * @param {any} value 
 */
export function dataType(value: any):string{
    return Object.prototype.toString.call(value).slice(8,-1).toLowerCase()
}
/**
 * @description 去除前后两边空格
 * @param {String} value 
 */
export function tirmRL(str:string):string {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * @description 删除左边的空格
 * @param {String} value 
 */
export function tirmL(str: string):string {
    return str.replace(/(^\s*)/g,"");
}

/**
 * @description 删除右边的空格
 * @param {String} value 
 */
export function tirmR(str: string):string {
    return str.replace(/(\s*$)/g,"");
}

/**
 * @description 删除所有空格
 * @param {String} value 
 */
 export function tirm(str: string):string {
    return str.replace(/\s/g,"");
}

