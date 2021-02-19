<template>
    <itv-container class="page-dialog">
        <itv-header>calendar-time</itv-header>
        <itv-main>
            <div class="h10"></div>
            <section>
                <cell :isLink="true" subTitle="插件模式" @click="confirm('html')" :showIcon="true" title="选择日期时间" :desc="calendarTime">
                   
                </cell>

                <cell :isLink="true" subTitle="插件模式" @click="alert('html')" :showIcon="true" title="日历类型" :desc="calendar">
                </cell>

                <cell :isLink="true" subTitle="插件模式" @click="openTime('html')" :showIcon="true" title="时间类型" :desc="time">
                </cell>

                <cell :isLink="true" subTitle="组件模式" @click="comCalendarTime" :showIcon="true" title="选择日期时间" :desc="calendarTime1">
                   
                </cell>
                
                <cell :isLink="true" subTitle="组件模式" @click="comCalendar" :showIcon="true" title="选择日期" :desc="calendar1">
                   
                </cell>

                 <cell :isLink="true" subTitle="组件模式" @click="comTimes" :showIcon="true" title="选择时间" :desc="time1">
                   
                </cell>
            </section>
          
           
        </itv-main>
        <calendar-time 
            teleport
            :isVisible="comTime.visible"
            @hide="comTime.visible=false"
            @confirm="confirmCom"
            :dateType="comTime.dateType"
            :value="comTime.value"
          
        />
    </itv-container>

</template>

<script>

let com = {
    name:"dome-name",
    props:{
        dome:{
            type: Object,
            default:()=>{}
        }
       
    },
    template:`
        <div class="dome-name" @click="echo">{{dome.name}}</div>
    `,
    methods: {

    }
}
import vue from 'vue';
import { setTimeout } from 'timers';
export default {
  data() {
    return {
        show:false,
        calendarTime:"2020-09-12 10:15",
        calendar:"2020-09-12",
        time:'10:15',
        calendarTime1: "2020-09-12 09:00",
        calendar1:"2020-10-12",
        time1:"20:10",
        demoName:{
            name:"title",
            number: 10
        },
        show: false,
        comTime: {
            visible: false,
            value: "2020-09-12 23:15",
            dateType:"calendar-time",
            minDate:"2021-02-19 23:12",
            maxDate:"2021-02-19 23:59"
            
        }
    };
  },
  methods: {
      open() {
          this.show = true
      },
      confirm(value) {
          this.$itv.calendarTime.show({
               minDate: '2020-08-05 10:56',
               value: this.calendarTime,
               maxDate: '2020-09-18 10:15',
               style:"average",
               confirm:(res)=>{
                   this.calendarTime = res;
               }
          })
      },
      
      alert() {
            this.$itv.calendarTime.show({
                value: this.calendar,
                dateType: 'calendar',
                confirm:(msg) => {
                    this.calendar = msg
                }
            })
      },
      openTime() {
            this.$itv.calendarTime.show({
                value: this.time,
                titleText:"请选择时间",
                minDate: '10:05',
                maxDate: '23:59',
                dateType: 'time',
                confirm:(msg) => {
                    this.time = msg
                }
            })
      },
      confirmCom(value) {
          this.comTime.visible = false;
          if(this.comTime.dateType==='calendar') {
              this.calendar1 = value;
              return
          }
            this.calendarTime1 = value;
            
      },
      comCalendarTime() {
          this.comTime.value = this.calendarTime1;
          this.comTime.dateType = "calendar-time"
          this.comTime.visible = true;
      },
      comCalendar() {
          this.comTime.value = this.calendar1;
          this.comTime.dateType = "calendar"
          this.comTime.visible = true;
      },
      comTimes() {
          this.comTime.value ="2021-02-19 "+this.time1;
          this.comTime.dateType = "time"
          this.comTime.visible = true;
          
      },
      page() {
         
      },
      echo() {
          console.log(this.demoName);
          this.demoName.name = '你是个标题'
      }
  },
  mounted() {
    //   Vue.component(Component.name, Component);
     com.methods.echo =this.echo.bind(this);
     vue.component(com.name, com)
     this.show = true;
     
      
  },
};
</script>

<style lang="less" scoped>
.page-dialog {
    .page-content{
        display: none;
    }
}
.demo {
  padding-left: 0;
  padding-right: 0;
}
h4 {
  padding: 0 10px;
}
</style>
