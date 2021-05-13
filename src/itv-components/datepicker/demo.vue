<template>
    <itv-container>
        <itv-header>Datetime</itv-header>
        <itv-main>
           <!-- <itv-cell :showIcon="true" title="日期选择" subTitle="去除显示的格式" :desc="date || placeholder" @click="openDate" >
            </itv-cell>
            <itv-cell :showIcon="true" title="日期时间选择器" subTitle="限制开始结束日期" :desc="datetime || placeholder" @click="openDatetime" >
            </itv-cell>
            <itv-cell :showIcon="true" title="时间选择" subTitle="限制开始结束日期" :desc="time || placeholder" @click="openTime" >
            </itv-cell> -->
        </itv-main>
        
        <itv-datepicker  v-model="detepicker" type="datetime" slotName="default" />
    </itv-container>
</template>
<script>


export default {
    props: {
        
    },
    data(){
        return{
            detepicker: true,
        }
       
    },
    methods:{
        
    }
}
</script>


