<template>
    <div class="itv-timepicker">
        <picker-slot 
            :listData="hours" 
            :defaultValue="currentHour"
            @chooseItem="chooseItem"
            :key-index="0"
            :is-update="false"
         />
        <picker-slot 
        :listData="minutes" 
        :defaultValue="currentMinute" 
        :key-index="1"
        :is-update="false"
         />
    </div>
</template>

<script>
import pickerSlot from '../picker/picker-slot.vue'
import time from '../../libs/time'
export default {
    name:"timepicker",
    components: { pickerSlot },
    props: {
        startTime: {
            type: String,
            default:'00:00'
        },
        endTime: {
            type: String,
            default: '23:59'
        },
        value: {
            type: String,
            default: '12:00'
        },
        hour12: { //是否12小时制
            type: Boolean,
            default: false
        }, 
        step: { //分钟步数间隔
            type: Number,
            default: 1 
        },
        amText: {
            type: String,
            default: '上午'
        },
        pmText: {
            type: String,
            default: '下午'
        }
    },
    data() {
        return {
            currentHour: '12',
            currentMinute: "00"
        }
    },
    computed: {
        hours() {
            let start =  parseInt(this.startTime.split(':')[0]);
            let end =  parseInt(this.endTime.split(':')[0]);
            return time.getHour(start, end);
        },
        minutes(){
            //24小时制
            let start =  parseInt(this.startTime.split(':')[0]);
            let end =  parseInt(this.endTime.split(':')[0]);
            if(parseInt(this.currentHour) === this.start && parseInt(this.currentHour) === this.end) {
                return time.getMinute(start, end);
            }
            if(parseInt(this.currentHour) === this.start ) {
                return time.getMinute(start, 59);
            }
            if(parseInt(this.currentHour) === this.end ) {
                return time.getMinute(0, end);
            }     
            return time.getMinute(0, 59);
        },

    },
    methods: {
        chooseItem(item, index) {
            if(index === 0) {
                this.currentHour = item.value;
            }
            
        }
    },

    mounted(){
         
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import './itv-timepicker.less';
</style>