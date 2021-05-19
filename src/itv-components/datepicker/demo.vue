<template>
    <itv-container>
        <itv-header>Datetime</itv-header>
        <itv-main>
           <itv-cell :showIcon="true" title="日期选择" subTitle="去除显示的格式"  @click="openDate" >
            </itv-cell>
            
        </itv-main>
        
        <!-- <itv-datepicker  v-model="detepicker" type="datetime" slotName="default" /> -->
        <!-- <itv-datepicker  v-model="detepicker" type="ym" slotName="default" /> -->
        <!-- <itv-datepicker  v-model="detepicker" type="date" defaultValue="2020-01-05" slotName="default" /> -->
        <!-- <itv-datepicker  v-model="detepicker" type="time" slotName="default" startTime="08:30" endTime="18:30"  defaultValue="12:00" /> -->
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
        openDate() {
            this.$itv.datepicker.show({
                type:'date',
                defaultValue: '1987-07-08',
                title:"请选择出生日期",
                confirmText:"选中",
                cancelText:"关闭",
                onConfirm:(msg)=> {
                    console.log(msg);
                
                },
                onCancel:(msg)=>{

                }
            })
        }
    },
    mounted() {
        
    }
}
</script>


