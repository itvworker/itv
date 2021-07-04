import touch from "./mixins/touch";
import initCalendar from "./mixins/init.calendar";
import calendar from "./mixins/calendar.js";
import methodsCalendar from './mixins/methods.calendar';
import { formatDate } from "../../libs/tool";
import calcScroll from './mixins/calc.scroll'
import animateScroll from './mixins/animate.scroll'
import animateScroller from './mixins/animate.scroller'
import move from './mixins/move'
import refreshIcon from './refresh'
import {svgXml} from '../../libs/tool'
import {defineComponent} from 'vue';
import './itv-schedule.less';
export default defineComponent({
    name:'schedule',
    mixins: [
        touch,
        initCalendar,
        calendar,
        methodsCalendar,
        calcScroll,
        animateScroll,
        animateScroller,
        move
    ],
    components: {
        refreshIcon
    },
    props: {
        //日历内参数
        value: {
            type: [String, Number],
            value: formatDate("", "Y/M/D")
        },
        //日历最大月分
        max: {
            type: String,
            value: ''
        },
        //日历最小月份
        min: {
            type: String,
            value: ''
        },
        //星期的文字
        weekText: {
            type: Array,
            default: () => ["日", "一", "二", "三", "四", "五", "六"]
        },
        monthText: {
            type: Array,
            default: () => ["1月", "2月","3月", "4月","5月", "6月","7月", "8月","9月", "10月","11月", "12月"]
        },
        iconBgColor: {
            type: String,
            default: 'rgba(29,120,244,0.1)'
        },
        iconColor: {
            type: String,
            default: 'rgba(29,120,244,1)'
        },
        toggleStatus: {
            type: Number,
            default: 1
        },
        //--------
        //是否启用下拉刷新
        bounceTop: {
            type: Boolean,
            default: true
        },
        //减慢的速度 百分比
        percent: {
            type: Number,
            default: 0.95
        },
        speed: {
            type: Number,
            default: 30 //滚动时的速度，1 - 100
        },
        //触发下拉加载的距离, 如果设置为0时将自动获取下拉刷新时，内容的高度
        pullDis: {
            type: Number,
            default: 0
        },
        isChangeState: { //是否可以在周与月之间切换
            type: Boolean,
            default: true
        },
        initState: { //初始化的类型  
            type: String,
            default: 'month'
        },
        //end补尾，尾部缺多少补多少， all保持日历6行
        endType: {
            type: String,
            default: null
        },
    
        //是否显显示上一个月月份
        isShowPrevMonth: {
            type: Boolean,
            default: false
        },
        //是否只能点当前前月份的日历
        isClickNowMonth:{
            type: Boolean,
            default: true
        },
        monthHtml: {
            type: Function,
            default:(item: any, index: number)=>{

                return (
                    <div class="active">{item.day}</div>
                )
            }
        },
        weekHtml: {
            type: Function,
            default:(item: any, index: number, monthText: any)=>{
                
                return (
                    <>
                    <span class="month-name">{monthText[item.month-1]}</span>
                    <div class="active">{item.day}</div>
                    </>
                )
            }
        },
        calendarFormat: {
            type: Number,
            default: 0
        },
        blockId: {
            type: String,
            default: 'block'
        }
    },
    computed: {
        weekTextArr():any {
            if(this.calendarFormat===0) {
                return this.weekText
            }
            let arr:any = [].concat(this.weekText);
            arr.push(arr.splice(0,1)[0])
            return arr;
        }
    },
    data() {
        return {
            nowMonth: [], //当前月份数组
            prevMonth: [], //上月月份数组
            nextMonth: [], //下月月份数组
            monthIndex: 1,
            today: formatDate('', 'YMD'),
            year: 0,
            month: 0,
            elWidth: 0, //元素的宽度,
            rowHeight: "", //每行的高度
            elHeight: "", //元素的高度
            slideHeight: "", //元素收缩的高度过
            calendarHeight: 0,
            nowWeek: [], // 当前星期
            prevWeek: [], //上一星期,
            nextWeek: [], //下一星期
            currentValue: new Date(formatDate(this.value, "Y/M/D")).getTime(),
            currentIndexWeek: 0,
            rows: 0,
            isAni: false,
            showTop: true,
            isRefresh: false,
            pullHeight:0,
            finishDom: false
        };
        
    },
   
    created() {
        this.finishDom = true;
    },
    mounted() {
        console.log(this.$refs);
        
        this.pullHeight = this.$refs.pull.clientHeight;
        
        
    },
    render() {
        
        
        
        return (
            <div class="itv-schedule-date" 
            onTouchstart={this.touchstart}
            onTouchmove={this.touchmove}
            onTouchend={this.touchend}
            onTouchcancel={this.touchend} >
                <div class="itv-schedule-scroller" ref="scroller">
                    <div class="itv-schedule-refresh" ref="pull">
                        <slot name="pull">
                            <refresh-icon bgIconColor={this.iconBgColor} iconColor={this.iconColor} value={this.isRefresh} top={this.py}></refresh-icon>
                        </slot>
                        
                    </div>
                </div>
                <slot name="top"></slot>
                {/* 日历部份  */}
                <div class="itv-schedule-calendar">
                    {/* 星期文字体  从周日到周六 */}
                    <div class="calendar-week-text">
                        {
                            this.weekTextArr.map((item)=>{
                                return (
                                    <div class="week-text-item" >{item}</div>
                                )
                            })
                        }
                    </div>

                    <div class="calendar-box" ref="calendar" style={{height: this.slideHeight+'px'}}> 
                     {/* /v-show="showTop" */}  
                        <div
                            ref="week"
                            style={{ transform: 'translateX('+this.weekX+'px)', 'display':this.showTop?null:'none'}}
                            class={{'week-slide':true, 'animating': this.isAni, 'slow-action': this.isMove}}
                            onTransitionend={this.aniamteend}
                        >   
                            <div  class={{'week-item':true,'none-item': this.isWeekMin}}>
                                {
                                    this.prevWeek.map((item, index)=>{
                                        return (
                                            <div class={{'day-item':true,'day-today': this.today === item.key, 'overtop':!item.overtop,'day-active': this.currentValue===item.time,'forbid':item.number > this.maxMonthNumber || item.number < this.minMonthNumber  }}
                                            >
                                            {this.weekHtml(item, index, this.monthText)}
                
                                        </div>
                                        )
                                    })
                                }
                            </div>
                            
                            <div  class="week-item">
                                {
                                    this.nowWeek.map((item: any, index: number)=>{
                                        return (
                                            <div 
                                            onClick={this.selected(index, item)}
                                            class={{'day-item':true, 'day-today': this.today === item.key ,'overtop':! item.overtop, 'day-active': this.currentValue===item.time }}
                                            >
                                            {this.weekHtml(item, index, this.monthText)}
                                        </div>
                                        )
                                    })
                                }
                            </div>

                            <div class={{'week-item':true,'none-item': this.isWeekMax}} >
                                {
                                    this.nextMonth.map((item, index)=>{
                                        return (
                                            <div 
                                            onClick={this.selected(index, item)}
                                            class={{'day-item':true, 'day-today': this.today === item.key ,'overtop':!item.overtop, 'day-active':this.currentValue===item.time }}
                                            >
                                            {this.weekHtml(item, index, this.monthText)}
                                        </div>
                                        )
                                    })
                                }
                            </div>           

                        </div>  

                        <div
                            ref="slide"
                            class={{'calendar':true,'animating': this.isAni, 'slow-action':this.isMove}}
                            onTransitionend={this.aniamteend}
                            style={{height:this.maxHeight+'px',transform: 'translateX('+this.calendarX+'px)'}}
                        >
                            <div class="calendar-content">
                                <div  class={{'month-item':true,'prev-item-month':true,'none-item':this.isCalendarMinMonth}}>
                                    <div class="year-tips">
                                        {this.prevMonth[15].year}
                                    </div>
                                    <div class="month-tips">   
                                        {this.prevMonth[15].month}
                                    </div>
                                    {
                                        this.prevMonth.map((item: any, index: number)=>{
                                            return (
                                                <div
                                                ref={'day'+index}
                                                class={{'day-item':true, 'day-today': this.today === item.key, 'overtop':!item.overtop, 'opacity-day':(item.type === 'prev' || item.type === 'next') && !this.isShowPrevMonth, 'prev-month': item.type === 'prev',  'next-month': item.type==='next'}}
                                            >
                                                {this.monthHtml(item, index)}
                                            </div>
                                            )
                                        })
                                    }
                                   
                                </div>

                                <div class="month-item now-item-month" >
                                    <div class="year-tips">
                                        {this.nowMonth[15].year}
                                    </div>
                                    <div class="month-tips">
                                        {this.nowMonth[15].month}
                                    </div>
                                    {
                                        this.nowMonth.map((item:any, index: number)=>{
                                            return (
                                                <div
                                               
                                                class={{'day-item':true, 'day-today': this.today === item.key ,'overtop':!item.overtop,'day-active':this.currentValue===item.time, 'opacity-day':(item.type==='prev'||item.type==='next') && !this.isShowPrevMonth, 'prev-month': item.type==='prev', 'next-month': item.type==='next'}}
                                                >
                                                    {this.currentValue}---{item.time}
                                                    {this.monthHtml(item, index)}
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div class={{'month-item':true,'prev-item-month':true,'none-item': this.isCalendarMaxMonth}}>
                                    <div class="year-tips">
                                        {this.nextMonth[15].year}
                                    </div>
                                    <div class="month-tips">
                                        {this.nextMonth[15].month}
                                    </div>
                                    {
                                         this.nextMonth.map((item:any, index: number)=>{
                                            return (
                                                <div
                                                class={{'day-item':true, 'day-today': this.today === item.key, 'overtop':!item.overtop, 'opacity-day':(item.type==='prev'||item.type==='next') && !this.isShowPrevMonth,'prev-month': item.type==='prev', 'next-month': item.type==='next'}}
                                                >
                                                    {this.monthHtml(item, index)}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>    
            </div>
        )
    },
    methods: {
        svgXml,
        refresh() {
            this.isRefresh = false;
            if(this.py > 0) {
                this.scrollerTo(0, 0, 1);
            }
            let dom:any = this.$refs.scroll;
            let parent = dom.parentNode;
            let ph = dom.clientHeight;
            this.sMaxY = ph - parent.clientHeight || 0;

            if(this.sy >= this.sMaxY) {
                this.scrollDom(0, this.sMaxY, 1) 
                this.sy = -this.sMaxY
            }
        },
        
        
        
    },
        
})