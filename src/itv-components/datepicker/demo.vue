<template>
    <itv-container>
        <itv-header>Datetime</itv-header>
        <itv-main>
           <itv-cell :showIcon="true" title="日期选择" subTitle="去除显示的格式"  @click="onDate" >
            </itv-cell>

            <itv-cell :showIcon="true" title="日月选择" subTitle="去除显示的格式"  @click="onYm" >
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
        onDate() {
            this.$itv.datepicker.show({
                type:'date',
                defaultValue: '至今',
                title:"请选择出生日期",
                confirmText:"选中",
                cancelText:"关闭",
                toNow:"至今",
                onConfirm:(msg)=> {
                    console.log(msg);

                },
                onCancel:(msg)=>{

                }
            })
        },
        onYm() {
            this.$itv.datepicker.show({
                type:'ym',
                defaultValue: '至今',
                title:"请选择出生日期",
                confirmText:"选中",
                cancelText:"关闭",
                toNow:"至今",
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


