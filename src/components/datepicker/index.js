




const util = require('./date.js')

Component({
    properties: {
        value: { //是否显示
            type: Boolean,
            value: false,
        },
        hideOnClick:{ //是否点击背景关闭
            type: Boolean,
            value: true
        },
        className: { //给根元素添加class名
            type: String,
            value: ''
        },
        title: { //标题
            type: String,
            value: '请选择日期'
        },
        cancelText:{
            type: String,
            value:'取消'
        },
        confirmText:{
            type: String,
            value:'确定'
        },
        //日历类型  datetime 格式yyyy-mm-dd hh:mm;  ym:年月, date:为年月日 time时间
        type: {
            type: String,
            value: 'datetime'
        },
        startTime: {
            type: String,
            value:"1900-01-01 00:00"
        },
        endTime: {
            type: String,
            value: util.formatDate(null,'Y-M-D h:m')
        },
        pickerClassName:{
            type: String,
            value:null
        },
        defaultValue: {
            type: String,
            value: util.formatDate(null,'Y-M-D h:m')
        },
        //是否循环滑动
        isLoop: {
            type: Boolean,
            value: false
        },
        //行数，只能是5行7行
        rows:{
            type: Number,
            value: 5
        },
        //分钟步数
        step: {
            type: Number,
            value: 1
        },
        //至今
        toNow: {
            type: String,
            value: null
        },
        yearText:{
            type: String,
            value: "{value}年"
        },
        monthText:{
            type: String,
            value: "{value}月"
        },
        dayText: {
            type: String,
            value: "{value}日"
        },
        hourText:{
            type: String,
            value: "{value}时"
        },
        minuteText:{
            type: String,
            value: "{value}分"
        },
        isInteger: {
            type: Boolean,
            default: false
        }
    },
    data: {
        reload: 0,
        list: [],
        startTimeArr:[],
        endTimeArr:[],
        selectValue:[],
        timeIndex: 0,
    },
    created() {
    },
    methods: {
        init() {
            this.data.list = [];
            this.timeIndex = 0;
            
            switch (this.properties.type) {
                case 'time':

                    let startime = this.properties.startTime.split(' ');
                    let endtime = this.properties.endTime.split(' ');
                    let nowtime = this.properties.defaultValue.split(' ')

                    let start = '2020-01-01 ' + (startime[1] || startTime[0]);
                    let end = '2020-01-01 ' + (endtime[1] || endtime[0]);
                    let now =  '2020-01-01 ' +(nowtime [1] || nowtime[0]);
                   

                    this.data.startTimeArr = util.formatDate(start,"Y,M,D,h,m").split(','); // 将开始时间变为数组
                    this.data.endTimeArr = util.formatDate(end, "Y,M,D,h,m").split(','); //将结束时间变为数组
                    this.data.selectValue = util.formatDate(now, "Y,M,D,h,m").split(','); //将默认选中时间为数组
                    this.data.selectValue.splice(0,3)
                    this.data.timeIndex = 3;
                    let hour = util.getHourArr(this.properties.startTimeArr , this.data.endTimeArr, this.data.selectValue)
                    this.data.list = [];
                    this.data.list[0] = hour.map(item=>{
                        let value = item
                        if (this.properties.isInteger) {
                            value = parseInt(value)
                        }
                        return {
                            text: this.properties.hourText.replace('{value}', value),
                            value: value
                        }
                    })
                    this.setData({
                        list: this.data.list,
                        selectValue: this.data.selectValue
                    })
                    this.setTime(0);
                    break;
                case 'date':
                    this.data.startTimeArr = util.formatDate(this.properties.startTime,"Y,M,D,h,m").split(','); // 将开始时间变为数组
                    this.data.endTimeArr = util.formatDate(this.properties.endTime, "Y,M,D,h,m").split(','); //将结束时间变为数组
                    this.data.selectValue = util.formatDate(this.properties.defaultValue, "Y,M,D,h,m").split(','); //将默认选中时间为数组
                    this.data.list = [];
                    this.data.list[0] = util.getBeignEndArr(this.data.startTimeArr[0], this.data.endTimeArr[0], this.properties.toNow);

                    if(this.properties.toNow  === this.properties.defaultValue) {
                        this.data.selectValue = [this.properties.toNow, this.properties.toNow, this.properties.toNow]
                        this.data.list[1] = [this.properties.toNow];
                        this.data.list[2] = [this.properties.toNow];
                    }
                    this.setDate(0)
                    break;
                case 'ym':
                    this.data.startTimeArr = util.formatDate(this.properties.startTime,"Y,M,D,h,m").split(','); // 将开始时间变为数组
                    this.data.endTimeArr = util.formatDate(this.properties.endTime, "Y,M,D,h,m").split(','); //将结束时间变为数组
                    this.data.selectValue = util.formatDate(this.properties.defaultValue, "Y,M,D,h,m").split(','); //将默认选中时间为数组
                    this.data.list = [];
                    let lists = util.getBeignEndArr(this.properties.startTimeArr[0], this.properties.endTimeArr[0],this.properties.toNow);
                    this.data.list[0] = lists.map(item=>{
                        let value = item
                        if (this.properties.isInteger) {
                            value = parseInt(value)
                        }
                        return {
                            text: this.properties.yearText.replace('{value}', value),
                            value: item
                        }
                    }) 
                    
                    if(this.properties.toNow  === this.properties.defaultValue) {
                        this.data.selectValue = [this.properties.toNow, this.properties.toNow]
                        this.data.list[1] = [this.properties.toNow];
                    }else{
                        this.setYm(0)
                    }
                    
                    break;
            
                default:
                    this.data.startTimeArr = util.formatDate(this.properties.startTime,"Y,M,D,h,m").split(','); // 将开始时间变为数组
                    this.data.endTimeArr = util.formatDate(this.properties.endTime, "Y,M,D,h,m").split(','); //将结束时间变为数组
                    this.data.selectValue = util.formatDate(this.properties.defaultValue, "Y,M,D,h,m").split(','); //将默认选中时间为数组
                    this.data.list = [];
                    let list = util.getBeignEndArr(this.data.startTimeArr[0], this.data.endTimeArr[0], this.properties.toNow);
                    this.data.list[0] = list.map(item=>{
                        let value = item
                        if (this.properties.isInteger) {
                            value = parseInt(value)
                        }
                        return {
                            text: this.properties.yearText.replace('{value}', value),
                            value: item
                        }
                    }) 
                    
                    this.setData({
                        list: this.data.list,
                        selectValue: this.data.selectValue
                    })
                    this.setDatatime(0);
                    break;
            }
        },

        setDatatime(index) {
            let month =  util.getMonthArr(this.data.startTimeArr , this.data.endTimeArr, this.data.selectValue);
            if(!util.isArrayEquality(this.data.list[1], month) &&  index>=0) { 
                this.data.list[1] = month.map(item=>{
                    let value = item
                    if (this.properties.isInteger) {
                        value = parseInt(value)
                    }
                    return {
                        text: this.properties.monthText.replace('{value}', value),
                        value: item
                    }
                });
            }

           
            let day = util.getDayArr(this.data.startTimeArr , this.data.endTimeArr, this.data.selectValue);
            if(!util.isArrayEquality(this.data.list[2], day) && index <=1) {
                this.data.list[2] = day.map(item=>{
                    let value = item
                    if (this.properties.isInteger) {
                        value = parseInt(value)
                    }
                    return {
                        text: this.properties.dayText.replace('{value}', value),
                        value: item
                    }
                });
            }

            let hour = util.getHourArr(this.data.startTimeArr , this.data.endTimeArr, this.data.selectValue)
            if(!util.isArrayEquality(this.data.list[3], hour) && index <=2) {
                this.data.list[3] =  hour.map(item=>{
                    let value = item
                    if (this.properties.isInteger) {
                        value = parseInt(value)
                    }
                    return {
                        text: this.properties.hourText.replace('{value}', value),
                        value: item
                    }
                });
            }

            let minute = util.getMinuteArr(this.data.startTimeArr, this.data.endTimeArr, this.data.selectValue, this.properties.step)
            if(!util.isArrayEquality(this.data.list[4], minute) && index <=3) {
                this.data.list[4] =  minute.map(item=>{
                    let value = item
                    if (this.properties.isInteger) {
                        value = parseInt(value)
                    }
                    return {
                        text: this.properties.minuteText.replace('{value}', value),
                        value: item
                    }
                });
            }
            this.setData({
                list: this.data.list
            })
        },
        chooseItem(res) {
            let value = res.detail.value;
            if (typeof value === 'object') {
                value = value.value
            } 
            switch (this.properties.type) {
                case 'time':
                    this.data.selectValue[res.detail.keyIndex+this.data.timeIndex] = value;
                    this.setTime(res.detail.keyIndex);
                    break;
                case 'date':
                    this.data.selectValue[res.detail.keyIndex] = value
                    this.setDate(res.detail.keyIndex, value === this.properties.toNow);
                    break;
                case 'ym':
                    this.data.selectValue[res.detail.keyIndex] = value;
                    this.setYm(res.detail.keyIndex,  value === this.properties.toNow);
                    break;
                default:
                    this.data.selectValue[res.detail.keyIndex] = value;
                    this.setData({
                        selectValue: this.data.selectValue
                    })
                    this.setDatatime(res.detail.keyIndex);
                    break;
            }
        },
        onClose() {
            this.triggerEvent("close", {}, {})
        },
        onConfirm(res) {
            this.triggerEvent("confirm", this.data.selectValue, this.data.selectValue)
        },
        /**
         * @param {Number} index 当type==='datetime' picker的索引
         */
         setYm(index, isToNow) {
            if(!this.data.selectValue[1] && this.data.startTimeArr[0]===this.data.selectValue[0]) {
                this.data.selectValue[1]=this.data.startTimeArr[1];
            }
            
            let month =  util.getMonthArr(this.data.startTimeArr , this.data.endTimeArr, this.data.selectValue);
            if(isToNow) {
                month = [this.properties.toNow]
            }
            
            if(!util.isArrayEquality(this.data.list[1], month) &&  index>=0) { 
                this.data.list[1] = month.map(item=>{
                    let value = item
                    if (this.properties.isInteger) {
                        value = parseInt(value)
                    }
                    return {
                        text: this.properties.monthText.replace('{value}', value),
                        value: item
                    }
                });
                this.setData({
                    list:this.data.list,
                    selectValue: this.data.selectValue
                })
            }
        },
        setTime(index) {
            let minute = util.getMinuteArr(this.data.startTimeArr, this.data.endTimeArr, this.data.selectValue, this.properties.step);
            if(!util.isArrayEquality(this.data.list[1], minute) && index <=0) {
                this.data.list[1]= minute.map(item=>{
                    let value = item
                    if (this.properties.isInteger) {
                        value = parseInt(value)
                    }
                    return {
                        text: this.properties.minuteText.replace('{value}', value),
                        value: item
                    }
                })
            }
            this.setData({
                list: this.data.list,
                selectValue: this.data.selectValue
            })
        },
        /**
         * 年月日的变更
         */
         setDate(index, isToNow) {
            let month =  util.getMonthArr(this.data.startTimeArr , this.data.endTimeArr, this.data.selectValue);
            if(isToNow) {
                month = [this.properties.toNow]
            }
            if(!util.isArrayEquality(this.data.list[1], month) &&  index>=0) { 
                this.data.list[1] = month.map(item=>{
                    let value = item
                    if (this.properties.isInteger) {
                        value = parseInt(value)
                    }
                    return {
                        text: this.properties.monthText.replace('{value}', value),
                        value: item
                    }
                });
            }
           
            let day = util.getDayArr(this.data.startTimeArr , this.data.endTimeArr, this.data.selectValue);
            if(isToNow) {
                day = [this.toNow]
            }
            if(!util.isArrayEquality(this.data.list[2], day) && index <=1) {
                this.data.list[2] = day.map(item=>{
                    let value = item
                    if (this.properties.isInteger) {
                        value = parseInt(value)
                    }
                    return {
                        text: this.properties.dayText.replace('{value}', value),
                        value: item
                    }
                });
            }
            this.setData({
                list: this.data.list,
                selectValue: this.data.selectValue
            })
        },
    }
  
})