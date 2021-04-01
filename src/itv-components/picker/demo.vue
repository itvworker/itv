<template>
  <itv-container>
        <itv-header>Picker</itv-header>
        <itv-main>
        <itv-cell :isLink="true"  desc="请选择内容" @click="open" :showIcon="true" title="插件模式">
                    </itv-cell>
        <itv-picker
            :list-data="listData0"
            title="请选择年月"
            :default-value-data="defaultValueData0"
            @close="switchPicker('isVisible0')"
            @choose="choose"
            isLoop
        ></itv-picker>


  </itv-main>
  </itv-container>

</template>

<script>
import date from './data/date.js';
import classify from './data/classify.js'
export default {
  data() {
        return {
            date: null,
            isVisible0: true,
            listData0: date,
            classify: classify,
            defaultClassify:[2, 6],
            defaultValueData0: ["2010", "2"],
            show:true

        };
    },
    created() {
    
    },
    methods: {
        choose(value,index) {
            console.log(value);
            console.log(index);
        },
        chooseClassify(value,index) {
            console.log(value);
            console.log(index);
        },
        switchPicker(value) {
           console.log(value);
        },
        open() {
            this.$itv.picker.show({
                listData: this.listData0,
                onConfirm: (index, value, cache)=>{
                    console.log(index);
                    console.log(value);
                    console.log(cache)
                    l
                },
                onChoose: (index, value, cache)=>{
                    console.log(index);
                    console.log(value);
                    console.log(cache);
                    if(index===0 && value == 2013) {
                        this.$set(this.listData0, 1, ["A","B","C","D"])
                    }
                }
            })
        }
    },
    mounted() {
       
        
    }
};
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
.btn,.show-value {
  display: inline-block;
  margin-left: 20px;
}
.btn {
  padding: 5px;
  border-radius: @itv-btn-border-radius-small;
  color: #fff;
  background-color: #999;
}
</style>
