<template>
    <itv-container class="page-dialog">
        <itv-header>schedule-date</itv-header>
        <itv-main>
           
            <slivers :headerMaxHeight="150" :headerMinHeight="44" ref="slivers">
                <div class="name"></div>
                <sliver bounceTop>
                    <div class="test-list" v-for="(item, index)  in list" :key="index">
                        sliver1{{item.title}} {{index}}
                    </div>
                </sliver>

                <sliver >
                    <div class="test-list" v-for="(item, index)  in list" :key="index">
                        sliver2{{item.title}} {{index}}
                    </div>
                </sliver>
            </slivers>
        </itv-main>
    </itv-container>
</template>

<script>
import slivers from './index';
import sliver from './sliver';
export default {
    components: {
        slivers,
        sliver 
    },
    data() {
        return {
            // list:[],
            currentDate: '2020/10/10',
            minMonth:'2020/10',
            maxMonth: '2021/12'
        }
    },
    computed: {
       list() {
            let arr = [];
            for(let i = 0; i < 100; i++) {
                arr.push({
                    title: '测试内容'
                })
            }
            return arr;
       } 
    },
    methods: {
       refresh() {
           setTimeout(()=>{
                this.$refs.schedule.refresh()
           },2000)
       },
       pull(y) {
           console.log(y);
       }
    },
    created() {
      
    },
    mounted() {
        // setInterval(()=>{
        //     this.list.push({
        //         title: '测试内容'
        //     })
        // },500)
       
    }

};
</script>

<style lang="less" scoped>
.test-list {
    padding:15ipx 15ipx;
    border-bottom: #ddd solid 1px;
    background-color: #eee;
}

</style>


 