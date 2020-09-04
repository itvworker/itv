<template>
    <itv-container class="page-dialog">
        <itv-header>Itvscroll</itv-header>
        <itv-main>
            <itv-scroll :topBounce="true" :bottomBounce="true" :pullDown="true">
               <div class="item-list" v-for="(item, index) in list" :key="index">
                   {{item.name}}{{index}}
               </div>
            </itv-scroll>
        </itv-main>

    </itv-container>
</template>

<script>
import itvScroll from './itvscroll';
import "./itvscroll.less";
export default {
    components: {
        itvScroll
    },
    data() {
        return {
          list:[],
        }
    },
    methods: {
       changeList(size, page) {
           for(let i = 0; i <= size; i++) {
               this.list.push({
                   name: '测试一下内容条数'
               })
           }
       } 
    },
    created() {
        this.changeList(100,1)
    },
    mounted() {
       
    }

};
</script>

<style lang="less" scoped>
.item {
    height: 60ipx;
    border-bottom: #ddd solid 1px;
    line-height: 30ipx;
    padding: 15ipx;
    box-sizing: border-box;
    font-size: 18ipx;
}

.tab-meun{
    height: 44rpx;
    display: flex;
    .tab-btn{
        height: 44ipx;
        flex: 1;
        text-align: center;
        line-height: 44ipx;
        font-size: 16ipx;
        border-bottom: #ddd solid 1px;
        &.active {
            color: @itv-page-main;
            border-bottom: @itv-page-main solid 2px;
        }
    }
}

.item-list{
    border-bottom: #eee solid 1px;
    padding: 10ipx;
    line-height: 24ipx;
}
</style>


 