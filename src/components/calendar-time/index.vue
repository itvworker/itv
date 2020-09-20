<template>
   <itv-dialog v-model="isVisible" type="bottom" :hideOnClick="hideOnClick">
                <div class="itv-calendar-time">
                    <div class="itv-calendar-time-top" v-if="dateType==='calendar-time'">
                        <div class="date" :class="{'active':dataType===0}" @click="changeTab(0)">{{currentValue | formatDate('Y-M-D')}}</div>
                        <div class="time" :class="{'active':dataType===1}" @click="changeTab(1)">{{currentHour}}:{{currentMin}}</div>
                        <div class="btn-confirm">{{confirmText}}</div>
                    </div>

                    <div class="itv-calendar-top" v-if="dateType==='calendar'">
                        <div class="title">{{titleText}}</div>
                        
                        <div class="year-month">
                                    {{nowMonth[15]?nowMonth[15].msg.substring(0,7):''}}
                        </div>
                    </div>
                      
                    <div class="itv-calendar-time-change" :class="{'itv-select-time': dataType===1}">
                        <div class="week-bar">
                            <div class="week-item" v-for="(item, index) in weekText" :key="index">{{item}}</div>
                        </div> 
                        <swiper ref="swiper" :bounce="false"
                            direction="column" @change="change" 
                            @last="change(2)" @first="change(0)" 
                            :loop="false" 
                            v-model="columnIndex"
                            class="itv-swpier-calendar-time"
                            :beginBounce="beginBounce"
                           >
                            <swiper-item class="itv-swpier-calendar">
                               
                                <div class="month-number" v-if="!beginBounce">
                                    <div class="year">
                                        {{prevMonth[15]?prevMonth[15].year:''}}
                                    </div>
                                    <div class="month">
                                        {{prevMonth[15]?prevMonth[15].month:''}}
                                    </div>
                                </div>

                                <div class="month-number">
                                    
                                    
                                    
                                </div>
                                <div v-if="!beginBounce"
                                    class="day-item"
                                    @click="selectDay(index, item)"
                                    :class="{'day-active':currentValue===item.time,'prev-month': item.type==='prev', 'next-month': item.type==='next'}"
                                    v-for="(item, index) in prevMonth"
                                    :key="item.id"
                                >
                                    <div class="active">{{item.day}}</div>
                                </div>
                            </swiper-item>
                            <swiper-item class="itv-swpier-calendar">
                                <!-- <div class="year-month">
                                    {{nowMonth[15]?nowMonth[15].msg.substring(0,7):''}}
                                </div> -->
                                <div class="month-number">
                                    <div class="year">
                                        {{nowMonth[15]?nowMonth[15].year:''}}
                                    </div>
                                    <div class="month">
                                        {{nowMonth[15]?nowMonth[15].month:''}}
                                    </div>
                                    
                                    
                                </div>
                                <div
                                    class="day-item"
                                    @click="selectDay(index, item, 'select')"
                                    v-for="(item, index) in nowMonth"
                                    :class="{'day-active':currentValue===item.msg, 'forbid': item.ymdnumber > calcMaxYmd  || item.ymdnumber < calcMinYmd , 'prev-month': item.type==='prev', 'next-month': item.type==='next'}"
                                    :key="item.msg"
                                >
                                    <div class="active">{{item.day}}</div>
                                </div>
                            </swiper-item>
                            <swiper-item class="itv-swpier-calendar">
                                <div class="month-number">
                                    <div class="year">
                                        {{nextMonth[15]?nextMonth[15].year:''}}
                                    </div>
                                    <div class="month">
                                        {{nextMonth[15]?nextMonth[15].month:''}}
                                    </div>
                                </div>
                                <div
                                    class="day-item"
                                    @click="selectDay(index, item, 'select')"
                                    :class="{'day-active':currentValue===item.time,'prev-month': item.type==='prev', 'next-month': item.type==='next'}"
                                    v-for="(item, index) in nextMonth"
                                    :key="item.id"
                                >
                                    <div class="active">
                                        {{item.day}}
                                    </div>
                                </div>
                            </swiper-item>
                        </swiper>
                        <div class="itv-picker-slot-box" v-if="dateType==='calendar-time'">
                                <picker-slot ref="picker-0"
                                    :default-value="currentHour"
                                    :is-update="true"
                                    :list-data="startHourData"
                                    @chooseItem="chooseItem"
                                    :key-index="0"

                                ></picker-slot>

                              <div class="itv-picker-list itv-picker-list-mark ">
                                     <div class="itv-picker-indicator itv-picker-mark">
                                        ：
                                    </div>
                                </div>
                                <picker-slot 
                                    ref="picker-1"
                                    :default-value="currentMin"
                                    :is-update="false"
                                    :list-data="startMinutesData"
                                    @chooseItem="chooseItem"
                                    :key-index="1"
                                ></picker-slot>
                        </div>
                    </div>
                </div>       
    </itv-dialog> 
</template>



<script>
    import swiper from '../swiper/swiper'
    import swiperItem from '../swiper-item/swiper-item.vue'
    import pickerSlot from '../picker/picker-slot.vue'
    import ItvDialog from '../dialog/dialog'
    import calendar from './mixins/calendar'
    import init from './mixins/init'
    import time from './mixins/time'
    export default {
        name: 'calendarTime',
        mixins:[calendar, init, time],
        components: {
            swiper,
            swiperItem,
            pickerSlot,
            ItvDialog
        },
        props: {
            value: {
                type: String,
                default: '2020-08-26 11:12'
            },
            minDate: {
                type: String,
                default: '2020-07-26 11:12'
            },
            maxDate: {
                type: String,
                default: '2200-12-30 23:59'
            },
            dateType: {
                type: String,
                default:'calendar-time'
            },
            weekText: {
                type: Array,
                default: () => ["日", "一", "二", "三", "四", "五", "六"]
            },
            confirmText: {
                type: String,
                default: "确定"
            },
            titleText: {
                type: String,
                default:'请选择日期'
            }
        },
        watch: {
            value(n) {
                let arr = n.split(' ')
                this.currentValue = arr[0];
                if(this.dateType === 'calendar-time') {
                    let time = arr[1].split(':');
                    this.currentHour = time[0]
                    this.currentMin = time[1]
                }
                
            },
            isVisible(n) {
                if(!n && (this.dateType === 'calendar-time' || this.dateType === 'calendar')) {
                    setTimeout(()=>{
                        this.dataType = 0 
                        
                    },300)
                       
                }
            }
        },
        data() {
            return {
               isVisible: false,
               hideOnClick: true,
               columnIndex:1,
               currentValue: '2020-08-26', //选中日期
               currentHour: '11',
               currentMin:"12",
               beginBounce: false,
               year:0, //
               month:0,
               dataType: 0
            }
        },
        methods: {
            changeTab(index) {
                if(index === this.dataType) {
                    return
                }
                this.dataType = index;
            }, 
            change(index) {
               if(index===0) {
                    this.nextMonth = this.nowMonth
                    this.nowMonth = this.prevMonth
                    let _year = this.nowMonth[15].year
                    let _month = this.nowMonth[15].month
                    this.year = _year;
                    this.month = _month;
                    if (_month === 1) {
                        _month = 12
                        _year--
                    } else {
                        _month--
                    }
                    this.prevMonth = this.calcMonth(_year, _month)
                    let time = this.calcPrevSameDay()
                    let obj = this.findMonthIndex(time)
                    this.selectDay(obj.index, obj.item)
                    this.$refs.swiper.scrollTo(1, false)  
               }

               if(index===2) {
                   this.prevMonth = this.nowMonth
                   this.nowMonth = this.nextMonth

                    //计算下一个月的数组
                    let _year = this.nowMonth[15].year
                    let _month = this.nowMonth[15].month
                    this.year = _year;
                    this.month = _month;
                    if (_month === 12) {
                        _month = 1
                        _year++
                    } else {
                        _month++
                    }
                    this.nextMonth = this.calcMonth(_year, _month)
                    let time = this.calcNextSameDay()
                    let obj = this.findMonthIndex(time)
                    this.selectDay(obj.index, obj.item)
                    this.$refs.swiper.scrollTo(1, false)  
               }
               let arr =  this.currentValue.split('-');
               let num = parseInt(arr[0]+''+arr[1]);
               
               if(num <= this.calcMinDate) {
                   this.beginBounce = true
               }else{
                   this.beginBounce = false
               }

               if(num >= this.calcMaxDate) {
                   this.endBounce = true
                  
               }else{
                   this.endBounce = false
               }
               
           },
           selected(index, item) {
                this.currentValue = item.time;
               
                this.$emit("selected", item);
                this.calcInit(item.year, item.month);
                this.year = item.year;
                this.month = item.month;
            },
            selectDay(index, item, select) {
               
                switch (item.type) {
                    case "prev":
                        this.isClickChange = true;
                        this.isAni = true;
                        this.aniStatus = true;
                        this.calendarX = 0;
                        this.endStatus = 0;
                        this.currentValue = item.msg;
                        break;
                    case "next":
                        this.isClickChange = true;
                        this.isAni = true;
                        this.aniStatus = true;
                        this.calendarX = -2 * this.elWidth;
                        this.endStatus = 2;
                        this.currentValue = item.msg;
                        break;
                    default:
                        this.currentValue = item.msg;
                        this.$emit("selected", item);
                        this.year = item.year;
                        this.month = item.month;
                        this.rows = parseInt(index / 7);
                        break;
                     
                }
                if(select && this.dateType === 'calendar-time') {
                    this.dataType = 1;
                }   
            }   
        },
        mounted() {
            // setTimeout(()=>{
            //     this.$refs.swiper.scrollTo(1, false)
            // },5000)
        }

    };
</script>

<style lang="less" >
@import './index.less';
</style>



