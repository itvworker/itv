<template>
    <itv-container class="page-dialog">
        <itv-header>schedule-date</itv-header>
        <itv-main>
            <!-- <itv-scheduleclass="calendar-demo" :isClickNowMonth="false" isKeepRows initState="week" :isChangeState="false" v-model="currentDate" :min="minMonth" :max="maxMonth"  :bounceTop="false" @refresh="refresh" @pull="pull"  /> -->
            <!-- <itv-schedule class="calendar-demo" :calendarFormat="0" :weekHtml="weekHtml" :monthHtml="monthHtml" :isShowPrevMonth="false" :isClickNowMonth="true" endType="end"  initState="month" :isChangeState="true" v-model="currentDate" :min="minMonth" :max="maxMonth"  :bounceTop="false" @refresh="refresh" @pull="pull" /> -->
            <itv-schedule class="calendar-demo" endType="end" :calendarFormat="1"  :isShowPrevMonth="false" :isClickNowMonth="true" :isKeepRows="false"  initState="month" :isChangeState="true" v-model="currentDate" :min="minMonth" :max="maxMonth"  :bounceTop="false" @refresh="refresh" @pull="pull" >
                <div class="item-list" v-for="(item, index) in list" :key="index">
                    {{item.title}}{{index}}
                </div>  
            </itv-schedule> 
        </itv-main>
    </itv-container>
</template>

<script>
import {defineComponent} from 'vue';
import ItvSchedule from './index.vue';
export default defineComponent({
    components:{
        ItvSchedule
    },
    data() {
        return {
            list:[],
            currentDate: '2021/01/10',
            minMonth:'2020/10',
            maxMonth: '2022/12',
            weekHtml:`
                <div class="itv-block">
                    <span class="month-name" v-if="item.day===1 || index === 0" >{{monthText[item.month-1]}}</span>
                    <div class="active">{{item.day}}</div>
                </div>
            `,
            monthHtml:`
                <div class="active">{{item.day}}</div>
            `
        }
    },
    methods: {
       refresh() {
           setTimeout(()=>{
                this.$refs.schedule.refresh()
           },2000)
       },
       pull(y) {
           console.log(y);
       }
    },
    created() {
      
    },
    mounted() {
        setInterval(()=>{
            this.list.push({
                title: '测试内容'
            })
        },500)

    }

});
</script>

<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
.test-list {
    padding:15ipx 15ipx;
    border-bottom: #ddd solid 1px;
   
}
.calendar-demo{
    height:100%;
}
.max-height{
    height:500ipx;
    margin-bottom:10ipx;
    background:#ddd;
}
.item-list{
    height: 50ipx;
    line-height: 50ipx;
    padding: 0 15px;
    border-bottom: #ddd solid 1px;
}
</style>


 