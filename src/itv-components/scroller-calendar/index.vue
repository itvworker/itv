<template>
    <div class="itv-scroller-calendar">
        <div class="itv-scroller-calendar-week">
            <div class="itv-week" v-for="(item, index) in weekTextArr" :key="index">
                {{item}}
            </div>
        </div>
        <itv-scroller pattern="vertical" ref="body" :percent="0.95" :speed="50" >
            <template v-for="(item, index) in list" >
                <div class="itv-scorller-title" :key="item[15].timestamp"> {{item[15].ym}} </div>
                <div class="calendar-month"  :key="index" >
                    <div class="tips-month">
                        {{item[15].month}}
                    </div>
                    <div 
                    class="calendar-day" 
                    @click="select(day)" 
                    :class="{'prev-month': day.type === 'prev', 'active': day.ymdnumber === beginPoint || day.ymdnumber === endPoint, 'selected': day.ymdnumber > beginPoint && day.ymdnumber < endPoint  }"
                     v-for="day in item" :key="day.timestamp">
                     <div class="day-item">
                        <div class="day-number">{{day.day}}</div>
                        <div class="day-now" v-if="day.ymdnumber ===  beginPoint">
                            {{startText}}
                        </div>
                        <div class="day-now" v-if="day.ymdnumber ===  endPoint">
                            {{endText}}
                        </div>  
                     </div>
                    </div>
                </div>
            </template>    
        </itv-scroller>
    </div>
</template>

<script>
import calendar from '../../libs/calendar';
import itvScroller from '../scroller/index.vue';
// import itvElevator from '../scroller-elevator/index.vue';
export default {
    name:'itv-scroller-calendar',
    components: {
        itvScroller,
        // itvElevator
    },
    props: {
        minDate:{
            type: String,
            default:"2021-01-01"
        },
        maxDate:{
            type: String,
            default:"2023-12-31"
        },
        weekType: {
            type: Number,
            defualt: 0
        },
        pattern: {
            type: String,
            default:"normal"
        },
        weekText: { //星期的多语言数组
            type: Array,
            default: () => ["日", "一", "二", "三", "四", "五", "六"]
        },
        startText: {
            type: String,
            default: '开始'
        },
        endText: {
            type: String,
            default: '结束'
        }
    },
   
    data() {
        return {
            list:[],
            columnIndex: 0,
            beginPoint: null,
            endPoint: null  
        }
    },
    computed: {
        beginYMD() {
            
            if(this.beginPoint) {
                let beginPoint = this.beginPoint.toString();
                return `${beginPoint.slice(0,4)}-${beginPoint.slice(4,6)}-${beginPoint.slice(6,8)}`
              
            }

            return null
        },
        endYMD() {
            if(this.endPoint) {
                let endPoint = this.endPoint.toString();
                return `${endPoint.slice(0,4)}-${endPoint.slice(4,6)}-${endPoint.slice(6,8)}`
            }

            return null
        },
        weekTextArr() {
            if(this.weekType===0) {
                return this.weekText
            }
            let arr = [].concat(this.weekText);
            arr.push(arr.splice(0,1)[0])
            return arr;
        }
    },
    
    methods: {
        getMonth(year, month) {
            let nowMonth = calendar.getMonthArray(year, month, 'curent', this.minDate, this.maxDate);
                nowMonth = calendar.fillPrveMonth(nowMonth, this.weekType); //使用上一个月填充
                return nowMonth;
        },
        getMonthArr() {
            let minArr = this.minDate.split('-');
            let maxArr = this.maxDate.split('-');
            let minYm = parseInt(`${minArr[0]}${minArr[1]}`)
            let maxYm= parseInt(`${maxArr[0]}${maxArr[1]}`)
            let nowYm = minYm;
            let nowArr = minArr;
            let arr = []
            while (nowYm <= maxYm) {
                let year = parseInt(nowArr[0]);
                let month = parseInt(nowArr[1]);
                arr.push(this.getMonth(year, month));
                if(month === 12) {
                    month=1
                    year++
                }else{
                    month++
                };
                nowYm = parseInt(`${year}${calendar.gt(month)}`);
                nowArr = [`${year}`,calendar.gt(month)]
            }

            this.list = arr;

        },
        select(item) {
            if(item.type ==='prev') {
                return
            }

            if (!this.beginPoint && !this.endPoint) {
                this.beginPoint = item.ymdnumber
                return
            }

            if(this.pattern === 'normal') {
                this.normalSelect(item);
                return
            }
           
            this.flexSelect(item);
        },
        flexSelect(item) {
            if(this.beginPoint && !this.endPoint) { 
                if(this.beginPoint === item.ymdnumber) return
                if(this.beginPoint > item.ymdnumber ) {
                    this.endPoint = this.beginPoint;
                    this.beginPoint = item.ymdnumber;
                    return
                }
                this.endPoint = item.ymdnumber;
                return
            }
            if (this.beginPoint &&  this.endPoint) {
                if(item.ymdnumber === this.beginPoint || item.ymdnumber === this.endPoint) return;

                if(item.ymdnumber < this.beginPoint) {
                    // this.endPoint = item.ymdnumber;
                    this.beginPoint = item.ymdnumber;
                    return;
                }

                if(item.ymdnumber > this.endPoint) {
                    this.endPoint = item.ymdnumber;
                    return
                }
               
                let begin = new Date(this.beginYMD.replace(/-/ig, '/')).getTime();
                let end = new Date(this.endYMD.replace(/-/ig, '/')).getTime();
                let point1 = item.timestamp - begin;
                let point2 = end -item.timestamp;

                if(point1 >= point2) {
                    this.endPoint = item.ymdnumber
                }else{
                    this.beginPoint = item.ymdnumber
                }

            }


        },
        normalSelect(item) {
           

            if(this.beginPoint && !this.endPoint) {
                if(this.beginPoint === item.ymdnumber) return
                if(this.beginPoint > item.ymdnumber ) {
                    this.beginPoint = item.ymdnumber;
                    return
                }
                if(item.ymdnumber > this.beginPoint) {
                    this.endPoint = item.ymdnumber;
                    this.$emit('select', this.beginYMD, this.endYMD )
                    return
                }
            }

            if (this.beginPoint && this.endPoint) {
                this.beginPoint = item.ymdnumber;
                this.endPoint = null;
                return
            }
        }
    },
    created() {
        
        this.getMonthArr();
    },
    monthed() {
        this.$refs.body.calcMax();
    }
   

};
</script>

<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import './itv-scroller-calendar.less';
</style>


 