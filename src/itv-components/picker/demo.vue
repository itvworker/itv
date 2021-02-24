<template>
  <itv-container>
      <itv-header>Picker</itv-header>
      <itv-main>
      <picker
        :is-visible="isVisible0"
        :list-data="listData0"
        title="请选择年月"
        :default-value-data="defaultValueData0"
        @close="switchPicker('isVisible0')"
        @confirm="setChooseValue0"
        @choose="choose"
        isLoop
      ></picker>


      <picker
        :is-visible="isVisible0"
        :list-data="classify"
        title="请选择年月"
        :default-value-data="defaultClassify"
        @choose="chooseClassify"
        
      ></picker>
      
     
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
