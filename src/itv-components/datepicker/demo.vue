<template>
    <itv-container>
        <itv-header>Datetime</itv-header>
        <itv-main>
            <!-- <cell :showIcon="true" title="日期选择" subTitle="去除显示的格式" :desc="date || placeholder" @click="openDate" >
            </cell>
            <cell :showIcon="true" title="日期时间选择器" subTitle="限制开始结束日期" :desc="datetime || placeholder" @click="openDatetime" >
            </cell>
            <cell :showIcon="true" title="时间选择" subTitle="限制开始结束日期" :desc="time || placeholder" @click="openTime" >
            </cell> -->
        </itv-main>
    </itv-container>
</template>
<script>

export default {
    components: {
    
        
    },
    props: {
        
    },
    data(){
        return{
           
                    value: true,
                    datetime: '',
                    placeholder:'请选择',
                    date:'',
                    time:''
                    
           }
       
    },
    methods:{
        openDatetime() {
            
            
        },

        openDate(value, keyIndex, index) {
           
        },

        openTime() {
           
        },

        
        add() {
            this.inputList.push({
                name:'内容'
            })
        }
    }
}
</script>


