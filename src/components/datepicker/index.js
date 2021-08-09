function formatDate(arg="", format) {
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
    let now = ''
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
            value: formatDate(null,'Y-M-D h:m')
        },
        pickerClassName:{
            type: String,
            value:null
        },
        defaultValue: {
            type: String,
            value: formatDate(null,'Y-M-D h:m')
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
            value:null
        }
    },
    data: {
        reload: 0,
        list: [
            [
                {
                    text: '1900年',
                    value: 0
                },
                {
                    text: '1901年',
                    value: 1
                },
                {
                    text: '1901年',
                    value: 2
                }
            ],
            [
                {
                    text: '1月',
                    value: 1
                },
                {
                    text: '2月',
                    value: 2
                },
                {
                    text: '3月',
                    value: 3
                }
            ]
            
        ],
        selceted:[]
    },
    created() {
        console.log(this.data.list);
    },
    methods: {
        init(){
            console.log('datepicker-load');
        },
        chooseItem(res) {
            console.log(res.detail);
        },
        onClose() {
            this.triggerEvent("close", {}, {})
        }
    }
  
})