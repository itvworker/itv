<template>
<itv-dialog v-model="currentValue" :hideOnClick="hideOnClick" type="bottom">
    <div class="itv-picker-ui" :class="className"> 
        <div class="title-bar">
            <div class="left-btn" @click="onClose">{{cancelText}}</div>
            {{title}}
            <div class="right-btn" @click="onConfirm">{{confirmText}}</div>
        </div>
        <div class="itv-picker-panel">
            <picker-slot :class="pickerClassName"  v-for="(item, index) of items" :ref="`picer-slot-${(index)}`"
                :default-value="selectValue[index+timeIndex]"
                :is-update="isUpdate"
                :list-data="item"
                @chooseItem="onChooseItem"
                :key="index"
                :key-index="index"
                :rows="rows"
                :isLoop="isLoop"
                :isInteger="isInteger"
                :word="words[index]"
            ></picker-slot>
        </div>
    </div>
</itv-dialog>    
</template>
<script>
import pickerSlot from "../picker/picker-slot.vue";
import ItvDialog from "../dialoger/index.vue";
import { formatDate } from '../../libs/tool.js'
import util from '../../libs/date.js';
export default {
    name:'itv-datepicker',
    props: {
        value: { //是否显示
            type: Boolean,
            default: false,
        },
        hideOnClick:{ //是否点击背景关闭
            type: Boolean,
            default: true
        },
        className: { //给根元素添加class名
            type: String,
            default: ''
        },
        title: { //标题
            type: String,
            default: '请选择日期'
        },
        cancelText:{
            type: String,
            default:'取消'
        },
        confirmText:{
            type: String,
            default:'确定'
        },
        //日历类型  datetime 格式yyyy-mm-dd hh:mm;  ym:年月, date:为年月日 time时间
        type: {
            type: String,
            default: 'datetime'
        },
        startTime: {
            type: String,
            default:"1900-01-01 00:00"
        },
        endTime: {
            type: String,
            default: formatDate(null,'Y-M-D h:m')
        },
        pickerClassName:{
            type: String,
            default:null
        },
        defaultValue: {
            type: String,
            default: formatDate(null,'Y-M-D h:m')
        },
        //是否循环滑动
        isLoop: {
            type: Boolean,
            default: false
        },
        //行数，只能是5行7行
        rows:{
            type: Number,
            default: 5
        },
        //分钟步数
        step: {
            type: Number,
            default: 1
        },
        //至今
        toNow: {
            type: String,
            default:null
        },
        words:{
            type: Array,
            default: ()=>["{value}","{value}","{value}","{value}","{value}"],
        },
        isInteger:{
            type: Boolean,
            default: false,
        }
    },
    components: {
        pickerSlot,
        ItvDialog
    },
    computed: {
        list() {
            return JSON.parse(JSON.stringify(this.listData))
        }
    },
    data() {
        return {
            chooseValueData: [],
            cacheValueData: [],
            isUpdate: false,
            currentValue: this.value,
            selectValue:[], //默认项目
            items:[], //选项
            startTimeArr:[], //开始时间数组
            endTimeArr:[], //结速时间数
            timeIndex: 0,
            initing: true, //是否在初始化
        };
    },
    watch: {
        'defaultValueData': function() {
            this.chooseValueData = [...this.defaultValueData];
            this.cacheValueData = [...this.defaultValueData];
            // this.$emit('onConfirm', this.cacheValueData);
        },
        value(n, o) {
            this.currentValue = n;
        },
        currentValue(n) {
            if(!n) {
                this.$emit('input', false);
                this.$emit('onCancel');
            }
            
        }
    },
    methods: {
        init() {
            this.items = [];
            this.timeIndex = 0;
            
            switch (this.type) {
                case 'time':
                    let start = '2020-01-01 ' + this.startTime;
                    let end = '2020-01-01 ' + this.endTime;
                    let now =  '2020-01-01 ' +this.defaultValue;
                    this.startTimeArr = formatDate(start,"Y,M,D,h,m").split(','); // 将开始时间变为数组
                    this.endTimeArr = formatDate(end, "Y,M,D,h,m").split(','); //将结束时间变为数组
                    this.selectValue = formatDate(now, "Y,M,D,h,m").split(','); //将默认选中时间为数组
                    this.timeIndex = 3;
                    let hour = util.getHourArr(this.startTimeArr , this.endTimeArr, this.selectValue)
                    this.$set(this.items, 0, hour);
                    this.setTime(0);
                    break;
                case 'date':
                    this.startTimeArr = formatDate(this.startTime,"Y,M,D,h,m").split(','); // 将开始时间变为数组
                    this.endTimeArr = formatDate(this.endTime, "Y,M,D,h,m").split(','); //将结束时间变为数组
                    this.selectValue = formatDate(this.defaultValue, "Y,M,D,h,m").split(','); //将默认选中时间为数组
                    this.items = [];
                    this.items[0] = util.getBeignEndArr(this.startTimeArr[0], this.endTimeArr[0], this.toNow);

                    if(this.toNow  === this.defaultValue) {
                        this.selectValue = [this.toNow,this.toNow,this.toNow]
                        this.items[1] = [this.toNow];
                        this.items[2] = [this.toNow];
                    }
                    this.setDate(0)
                    break;
                case 'ym':
                    this.startTimeArr = formatDate(this.startTime,"Y,M,D,h,m").split(','); // 将开始时间变为数组
                    this.endTimeArr = formatDate(this.endTime, "Y,M,D,h,m").split(','); //将结束时间变为数组
                    this.selectValue = formatDate(this.defaultValue, "Y,M,D,h,m").split(','); //将默认选中时间为数组
                    
                    this.items = [];
                    this.items[0] = util.getBeignEndArr(this.startTimeArr[0], this.endTimeArr[0],this.toNow);
                    if(this.toNow  === this.defaultValue) {
                        this.selectValue = [this.toNow, this.toNow]
                        this.items[1] = [this.toNow];
                    }else{
                        this.setYm(0)
                    }
                    
                    break;
            
                default:
                    this.startTimeArr = formatDate(this.startTime,"Y,M,D,h,m").split(','); // 将开始时间变为数组
                    this.endTimeArr = formatDate(this.endTime, "Y,M,D,h,m").split(','); //将结束时间变为数组
                    this.selectValue = formatDate(this.defaultValue, "Y,M,D,h,m").split(','); //将默认选中时间为数组
                    this.items = [];
                    this.items[0] = util.getBeignEndArr(this.startTimeArr[0], this.endTimeArr[0], this.toNow);
                    this.setDatatime(0);
                    break;
            }
        },
        setTime(index) {
            
            let minute = util.getMinuteArr(this.startTimeArr, this.endTimeArr, this.selectValue, this.step);
            if(!util.isArrayEquality(this.items[1], minute) && index <=0) {
                this.$set(this.items, 1, minute)
            }
        },
        /**
         * 年月日的变更
         */
        setDate(index, isToNow) {
           

            let month =  util.getMonthArr(this.startTimeArr , this.endTimeArr, this.selectValue);
            if(isToNow) {
                month = [this.toNow]
            }
            if(!util.isArrayEquality(this.items[1], month) &&  index>=0) { 
                this.$set(this.items, 1, month)
            }
           
            let day = util.getDayArr(this.startTimeArr , this.endTimeArr, this.selectValue);
            if(isToNow) {
                day = [this.toNow]
            }
            if(!util.isArrayEquality(this.items[2], day) && index <=1) {
                this.$set(this.items, 2, day)
            }
        },
        /**
         * @param {Number} index 当type==='datetime' picker的索引
         */
        setYm(index, isToNow) {
            if(!this.selectValue[1] && this.startTimeArr[0]===this.selectValue[0]) {
                this.selectValue[1]=this.startTimeArr[1];
            }
            
            let month =  util.getMonthArr(this.startTimeArr , this.endTimeArr, this.selectValue);
             if(isToNow) {
                month = [this.toNow]
            }
            
            if(!util.isArrayEquality(this.items[1], month) &&  index>=0) { 
                this.$set(this.items, 1, month)
            }
        },
        /**
         * @param {Number} index 当type==='datetime' picker的索引
         */
        setDatatime(index) {
            let month =  util.getMonthArr(this.startTimeArr , this.endTimeArr, this.selectValue);
            if(!util.isArrayEquality(this.items[1], month) &&  index>=0) { 
                this.$set(this.items, 1, month)
            }
           
            let day = util.getDayArr(this.startTimeArr , this.endTimeArr, this.selectValue);
            if(!util.isArrayEquality(this.items[2], day) && index <=1) {
                this.$set(this.items, 2, day)
            }

            let hour = util.getHourArr(this.startTimeArr , this.endTimeArr, this.selectValue)
            if(!util.isArrayEquality(this.items[3], hour) && index <=2) {
                this.$set(this.items, 3, hour)
            }

            let minute = util.getMinuteArr(this.startTimeArr, this.endTimeArr, this.selectValue, this.step)
            if(!util.isArrayEquality(this.items[4], minute) && index <=3) {
                this.$set(this.items, 4, minute)
            }
        },
        //点击确认
        onConfirm() {
            switch (this.type) {
                case 'time':
                    this.$emit('onConfirm', this.selectValue[3]+':'+this.selectValue[4])
                    break;
                case 'date':
                    this.$emit('onConfirm', this.selectValue[0]+'-'+this.selectValue[1]+'-'+this.selectValue[2])
                   
                    break;
                case 'ym':
                    this.$emit('onConfirm', this.selectValue[0]+'-'+this.selectValue[1])
                   
                    break;
                default:
                    this.$emit('onConfirm', this.selectValue[0]+'-'+this.selectValue[1]+'-'+this.selectValue[2]+' '+this.selectValue[3]+':'+this.selectValue[4])
                    break;
            } 
            this.$emit('input', false)
        },
        //关闭
        onClose() {
            this.$emit('input', false)
        },
        //变更项
        onChooseItem(item, index) {
            switch (this.type) {
                case 'time':
                    this.selectValue[index+this.timeIndex] = item;
                    this.setTime(index);
                    break;
                case 'date':
                    this.selectValue[index] = item;
                    this.setDate(index, item === this.toNow);
                    break;
                case 'ym':
                    this.selectValue[index] = item;
                    this.setYm(index,  item === this.toNow);
                    break;
                default:
                    this.selectValue[index] = item;
                    this.setDatatime(index);
                    break;
            }
           
            this.$emit('onChangeItem', this.selectValue);
            
        }

    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-datepicker.less';
</style>