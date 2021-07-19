<template>
    <itv-container class="page-dialog">
        <itv-header>scroller</itv-header>
        <itv-main>
            <itv-scroller 
            v-if="tabIndex===0" 
            :key="0" ref="scrolle1" 
           
            :bottomBounce="true" 
            :pullDown="true" 
            pattern="vertical" 
            :percent="0.95"
            :speed="50" 
            :showScrollBar="true"
            @scroll="scroll" 
            @stopscroll="stopscroll"
            @refersh="refersh"
            scrollYel
            >
            <div slot="y">
                <itv-scroller-toggle class="demo-toggle" >
                我是要滑滚动的内容
                </itv-scroller-toggle>

                <itv-scroller-toggle class="demo-toggle" :maxY="88">
                    <div class="demo-toggle-header">

                    </div>
                    <div class="demo-toggle-header">
                        我是一个标题
                    </div>
                    <div class="demo-toggle-header">
                        我是一个tab
                    </div>
                </itv-scroller-toggle>
            </div>
           
               <div class="item-list" v-for="(item, index) in list" :key="index">
                   {{item.name}}{{index}}
               </div>
            </itv-scroller>
        </itv-main>
    </itv-container>
</template>

<script>
import data from './data'

export default {
    mixins:[data],
    data() {
        return {
          list:[],
          columnIndex: 0  
        }
    },
    computed: {
        tabIndex() {
            let index = parseInt(this.$route.query.index)
            return index || 0
        }
    },
    methods: {
        changeList(size, page) {
            for(let i = 0; i <= size; i++) {
                this.list.push({
                    name: '测试一下内容条数'
                })
            }
        },
        scroll(obj) {
            // console.log(`scroll:{ x: ${obj.x}, y: ${obj.y} }`);
        },
        stopscroll(obj) {
            // console.log(`stopscroll:{ x: ${obj.x}, y: ${obj.y} }`);
            
        },
        refersh() {
            console.log('下拉刷新');
            //    setTimeout(()=>{
                
            //        this.$refs.scroller.refresh()
            //    },3000)
        },
        refershone() {
         
            setTimeout(()=>{
                let arr = []; //
                 for(let i=0; i < 30; i++) {
                    arr.push({
                        name:"重新加载数据"
                    })
                }
                this.list = arr;
                
                this.$refs.scrolle3.refresh()
            },1000)
        },
        infiniteone(){
            setTimeout(()=>{
                for(let i=0; i < 20; i++) {
                    this.list.push({
                        name:"加载更多的数据"
                    })
                }
                if(this.list.length>=100) {
                    this.$refs.scrolle3.infinite(true)
                    return
                }
                this.$refs.scrolle3.infinite()
            },3000)
        },
        changeTab(index) {
            if(this.tabIndex === index) return
            let name = this.$route.name;
            this.$router.replace({
                name: name,
                query: {
                    index: index
                }
            })
        },
         
    },
    created() {
        this.changeList(50,1)
    },
    mounted() {
       
    }

};
</script>

<style lang="less" scoped>
@import 'demo.less';
</style>


 