export default function Vaildata(value, rules) {
    let valueType = this.dataType(value);
    this.rulesType = this.dataType(rules);
    this.valueType = valueType;
    this.value = value;
    this.rules = rules;
    
    if(valueType === 'number') {
        value = value.toString();
        this.valueType = 'string'
    }
    if(valueType === 'null') {
        this.value = '';
        this.valueType = 'string'
    }
    
    if(this.rulesType==='object') {
        this.rules = [rules];
        this.rulesType = 'array';
    }
    
}

Vaildata.prototype = {
    dataType(value) {
        return Object.prototype.toString.call(value).slice(8,-1).toLowerCase()
    },
    getResult() {
        switch (this.rulesType) {
            case 'function':
                return this.rules(this.value);
            case 'array':
                return this.verify()  
            default:
                throw new Error("ruls规则有问题，rules必须是一个数组对象，或者是一个匿名funtion");
        }
    },
    /**
     * 验证
     */
    verify() {
        if(this.valueType !== "string") {
            throw new Error("此类型无法通过已有的规则完成验证，请自定义验证规则");
        }
        this.value = this.value.toString().replace(/(^\s*)|(\s*$)/g, "");
        for(let i = 0, l = this.rules.length; i < l; i++) {
            //假如不是必要的，并且没有值，验证通过
            if(!this.rules[i].required && !this.value) {
                continue;
            }
            //假如是必要的，没有值不通过验证
            if(!this.value) {
                return {
                    type: 'required',
                    message: this.rules[i].requiredMessage || this.rules[i].message
                }
            }
            
            if(this.value) {
                let name = this.rules[i].rule;
                let ruleType = this.dataType(name);

                if(ruleType=== 'regexp') {
                    if(!name.test(this.value)) {
                        return {
                            type: 'regexp',
                            message: this.rules[i].message
                        }
                    }
                }

                if(ruleType === 'function') {
                    if(this.rules[i].rule(this.value)) {
                        return {
                            type: 'function',
                            message: this.rules[i].message
                        }
                    }
                }
                 
                if(ruleType==='string') {
                    name = name.replace(/\s/g, "");
                    if(this[name]()) {
                        return {
                            type: name,
                            message: this.rules[i].message
                        }
                    }                    
                }
            }
        }
    },
    /**
     * 手机号码验证
     */
    phone() {
        let reg =/^1[3|4|5|6|7|8|9][0-9]{9}$/ig;
        if(!reg.test(this.value)) {
            return true;
        }
    },
    /**
     * @description 验证值的最大值不能大于该值
     * @param {Number} value 最大值 
     */
    max(value) {
        let num = parseFloat(this.value);
        if(num > value) {
            return true
        }
    },
    /**
     * @description 验证值的最小值不能小于该值
     * @param {Number} value 最小值 
     */
    min(value) {
        let num = parseFloat(this.value);
        if(num < value) {
            return true
        }
    },
    /**
     * @description 验证值是不是在此大小之间
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     */
    between(min, max) {
        if(this.min(min)){
            return true;
        }
        if(this.max(max)) {
            return true;
        }
    },
    /**
     * @description 验证字符长度是否大于该值
     * @param {*} value 
     */
    maxLength(value) {
        if(this.value.length > value) {
            return true
        }
    },
    /**
     * @description 验证字符长度是否小于该值
     * @param {*} value 
     */
    minLength(value) {
        if(this.value.length < value) {
            return true
        }
    },
    /**
     * @description 验证字符串长度是不是在此大小之间
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     */
    betweenLength(min, max) {
        if(this.minLength(min)){
            return true;
        }
        if(this.maxLength(max)) {
            return true;
        }
    },
    /**
     * @description 正整数验证
     */
    int() {
        let reg = /^[1-9]\d*$/;
        if(!reg.test(this.value)) {
            return true;
        } 
    },
    /**
     * @description 负整数验证
     */
    uint() {
        let reg = /^-[1-9]\d*$/;
        if(!reg.test(this.value)) {
            return true;
        } 
    },
    /**
     * @description 正浮点数验证
     */
    float() {
        let reg =/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
        if(!reg.test(this.value)) {
            return true;
        } 
    },
    /**
     * @description 负浮点数验证
     */
    ufloat() {
        let reg =/^-[1-9]\d*\.\d*|-0\.\d*[1-9]\d*$/;
        if(!reg.test(this.value)) {
            return true;
        } 
    },
    /**
     * @description 国内固话验证 020-5454545格式
     */
    telephone() {
        let reg =/^[0-9]{3,4}-\d{7,8}$/
        if(!reg.test(this.value)) {
            return true;
        }
    },
    /**
     * @description 18位身份证验证 110101199003078371
     * @param {Number} min 年份最小值
     * @param {Number} max 年份最大值
     */
    id(min=0, max = new Date().getFullYear()) {
        if(this.value.length !==18) {
            return true
        }
        let value = this.value.toUpperCase();
        let year = parseInt(value.substring(6,10));
        let month = parseInt(value.substring(10,12));
        let day = parseInt(value.substring(12,14));
        
        //判断年份是否合格
        if (parseInt(year) < min || max < parseInt(year)) {
            return true
        }

        //判断月份是否合格
        if (parseInt(month) > 12) {
            return true
        }
        //日
        let dayArr =[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let leapYear = year%4;
        if(!leapYear && month===2) {
            if(day>29){
                return true
            }
        }
        if(leapYear && day > dayArr[month-1]) {
            return true
        }    

        //最后一位数验证
        let arr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        let valueArr = value.split('');
        let dict = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2]
        let num = 0;
        arr.forEach((item, index)=>{
            num+= item*valueArr[index]
        })
        if(dict[num%11]!=valueArr[valueArr.length-1]) {
            return true
        }
        
    },
    /**
     * 邮箱地址
     */
    email() {
        let reg =/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        if(!reg.test(this.value)) {
            return true;
        }
    },
    /**
     * 汉字校验证
     */
    chinese() {
        let reg = /^[\u4e00-\u9fa5]{0,}$/
        if(!reg.test(this.value)) {
            return true;
        }
    }
}

