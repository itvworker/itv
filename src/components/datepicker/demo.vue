<template>
    <itv-container>
        <itv-header>Datetime</itv-header>
        <itv-main>
            <datepicker
				:is-visible="true"
				title="请选择日期时间"
				type="datetime"
				startDate="2000-11-10 12:08"
				endDate="2030-10-05 10:04"
				defaultValue="2018-11-02 11:08"
				@close="switchPicker('isVisible2')"
				@choose="setChooseValue2"
				:lastChange="true"
			></datepicker>
        </itv-main>
    </itv-container>
</template>
<script>
import datepicker from './datepicker.vue';
export default {
    components: {
        datepicker,
        
        
    },
    props: {
        value: {
            type: String,
            default:'2020-08-26 12:24'
        },
        startDate:{
            type: String,
            default:'2020-08-20 00:00'
        },
        endDate:{
            type: String,
            default:'2050-08-20 23:59'
        },
        format: {
            type: String,
            default: 'YYYY-MM-DD hh:mm'
        },
        yearType: {
            type: String,
            default: `{value}年`
        },
        monthType: {
            type: String,
            default: `{value}月`
        },
        dayType: {
            type: String,
            default: `{value}日`
        },
        hourType: {
            type: String,
            default: `{value}分`
        },
        minType: {
            type: String,
            default: `{value}秒`
        }
    },
    data(){
        return{
            data() {
					
			}
        }
    },
    methods:{
        init() {
            
        },
        
        chooseItem(value, keyIndex, index) {
            
        },
        add() {
            this.inputList.push({
                name:'内容'
            })
        }
    }
}
</script>

<style lang="less">
.itv-picker-list{
    flex: 1;
    position: relative;
    height: 100%;
    overflow: hidden;
    text-align: center;
    .itv-picker-list-panel{
        transform-style: preserve-3d;
    }
    .itv-picker-mask{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        //background-image: linear-gradient(180deg,hsla(0,0%,100%,.9),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.9),hsla(0,0%,100%,.6));
        background-position: top, bottom;
        background-size: 100% 108px;
        background-repeat: no-repeat;
        z-index: 3;
    }
    .itv-picker-indicator{
        position: absolute;
        top: 104ipx;
        width: 100%;
        height: 44ipx;
        border-top: 1ipx solid @dark-color;
        border-bottom: 1ipx solid @dark-color;
        z-index: 3; 
        box-sizing: border-box;
    }

    .itv-picker-content, .itv-picker-roller{
        position: absolute;
        top: 104ipx;
        width: 100%;
        height: 44ipx;
    }
    .itv-picker-content{
        background: #FFF;
        z-index: 2;
        overflow: hidden;
    }
    .itv-picker-item, .itv-picker-roller-item{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 44ipx;
        color: @title-color;
        font-size: 14ipx;
        height: 44ipx;
        text-align: center;
    }
    .itv-picker-item{
        font-size: 15ipx;
        background: #FFF;
    }
    .itv-picker-roller{
        z-index: 1;
        transform-style: preserve-3d;
        .itv-picker-roller-item{
            backface-visibility: hidden;
            position: absolute;
            top: 0;
            width: 100%;
            color: @text-color;
            height: 44ipx;
        }
        .itv-picker-roller-item-hidden {
            visibility: hidden;
            opacity: 0;
        }
    }
}

</style>
