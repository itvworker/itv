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
                :default-value="selectValue[index]"
                :is-update="isUpdate"
                :list-data="item"
                @chooseItem="onChooseItem"
                :key="index"
                :key-index="index"
                :rows="rows"
                :isLoop="isLoop"
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
        isLoop: {
            type: Boolean,
            default: false
        },
        rows:{
            type: Number,
            default: 5
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
            endTimeArr:[] //结速时间数
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
            
        },
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            switch (this.type) {
                case 'date':
                    
                    break;
            
                default:
                    let startTime = formatDate(this.startTime,"Y,M,D,h,m").split(','); // 将开始时间变为数组
                    let endTime = formatDate(this.endTime, "Y,M,D,h,m").split(','); //将结束时间变为数组
                    this.selectValue = formatDate(this.endTime, "Y,M,D,h,m").split(','); //将默认选中时间为数组
                    this.items = [];
                    this.items[0] = util.getBeignEndArr(startTime[0], endTime[0]);
                    this.items[1] = util.getMonthArr(startTime, endTime, this.selectValue)
                    
                    break;
            }
        },
        //点击确认
        onConfirm() {

        },
        //关闭
        onClose() {

        },
        //变更项
        onChooseItem() {

        }

    },
    created() {
       
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-datepicker.less';
</style>