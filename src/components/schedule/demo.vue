<template>
    <itv-container class="page-dialog">
        <itv-header>schedule-date</itv-header>
        <itv-main>
            <schedule class="calendar-demo" endType="end" :calendarFormat="1"  :isShowPrevMonth="false" isClickNowMonth :isKeepRows="false"  initState="month" :isChangeState="true" v-model="currentDate" :min="minMonth" :max="maxMonth"  :bounceTop="false" @refresh="refresh" @pull="pull" >
                <div class="bottom" slot="bottom">
                        bgIconColor
                </div>
                <div class="max-height">
                    有村大埼 
                </div>    
                <div class="max-height">
                    有村大埼 
                </div>    
            </schedule>
        </itv-main>
    </itv-container>
</template>

<script>
import {defineComponent} from 'vue';
import schedule from './index.tsx';
export default defineComponent({
    components:{
        schedule
    },
    data() {
        return {
            list:[],
            currentDate: '2021/01/10',
            minMonth:'2020/10',
            maxMonth: '2022/12',
           
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
</style>


 