<template>
    <itv-container class="page-dialog">
        <itv-header>schedule-date</itv-header>
        <itv-main>
           
            <!-- <itv-scheduleclass="calendar-demo" :isClickNowMonth="false" isKeepRows initState="week" :isChangeState="false" v-model="currentDate" :min="minMonth" :max="maxMonth"  :bounceTop="false" @refresh="refresh" @pull="pull"  /> -->
            <!-- <itv-schedule class="calendar-demo" :calendarFormat="0" :weekHtml="weekHtml" :monthHtml="monthHtml" :isShowPrevMonth="false" :isClickNowMonth="true" endType="end"  initState="month" :isChangeState="true" v-model="currentDate" :min="minMonth" :max="maxMonth"  :bounceTop="false" @refresh="refresh" @pull="pull" /> -->
            <itv-schedule class="calendar-demo" endType="end" :calendarFormat="1" :weekHtml="weekHtml" :monthHtml="monthHtml" :isShowPrevMonth="false" :isClickNowMonth="true" :isKeepRows="false"  initState="month" :isChangeState="true" v-model="currentDate" :min="minMonth" :max="maxMonth"  :bounceTop="false" @refresh="refresh" @pull="pull" >
                <div class="bottom" slot="bottom">
                        bgIconColor
                </div>
                <div class="max-height">
                    有村大埼 
                </div>    
                <div class="max-height">
                    有村大埼 
                </div>    
            </itv-schedule>
        </itv-main>
    </itv-container>
</template>

<script>

export default {
  
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
    computed: {
    //    list() {
    //         let arr = [];
    //         for(let i = 0; i < 100; i++) {
    //             arr.push({
    //                 title: '测试内容'
    //             })
    //         }
    //         return arr;
    //    } 
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

};
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
</style>


 