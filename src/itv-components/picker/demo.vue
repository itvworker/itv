<template>
  <itv-container>
        <itv-header>Picker</itv-header>
        <itv-main>
        <itv-cell :isLink="true"  desc="请选择内容" @click="onList"  :showIcon="true" title="插件模式" />
                   
      
  </itv-main>
  </itv-container>

</template>

<script>
import date from './data/date.js';
import classify from './data/classify.js'
export default {
  data() {
        return {
            
        };
    },
    created() {
        
    },
    methods: {
        onList() {
            this.$itv.picker.show({
            clearMask: true,
            defaultValue:[0,3],
            items:[{
                    name: '分类1',
                    value: 0,
                    children:[
                        {
                            name:"分类1-1",
                            value: 1,
                        },
                        {
                            name:"分类1-2",
                            value: 3,
                            forbid:true
                        }
                    ]
                },
                {
                    name: '分类2',
                    value: 4,
                    children:[
                        {
                            name:"分类1-2",
                            value: 5,
                        },
                        {
                            name:"分类1-2",
                            value: 6
                        }
                    ]
                }
                ]
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
