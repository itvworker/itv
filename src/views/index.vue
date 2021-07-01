
<template>
    <itv-container class="seciton">
        <div class="itv-bar">
            <div class="itv-logo" @click="$router.push({name:'index'})">
                iTV
            </div>
            <div class="nav">
                <div class="nav-item" v-for="item in navs" :key="item.name" @click.stop="onPage(item)">
                    {{item.name}}
                </div>
                                   
            </div>
        </div>
        <router-view />
    </itv-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
interface obj {
    routerName?: string,
    name?: string
}
export default defineComponent({
    name: 'Index',
    data() { 
        return {
            navs:[
                {
                    name: "介绍",
                    routerName: 'about'
                },
                {
                    name: "组件",
                    routerName: 'itv_doc_index'
                },
                {
                    name: "主题",
                    routerName: ''
                },
                {
                    name: "发布日志",
                    routerName: ''
                },
                {
                    name: "捐赠、赞助",
                    routerName: ''
                },
                {
                    name: "DEMO",
                    routerName:'itv_demo_enter'
                }
            ]
        }
    },
    setup() {
        
        return {
            
        }
    },
    methods: {
        onPage(item: obj) {
            this.$router.push({
                name: item.routerName
            })
        }
    }
})


</script>
<style lang="less" scoped>
.itv-bar{
    height: 80px;
    min-height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom:#ddd solid 1px;
    .itv-logo{
        height: 80px;
        font-size: 40px;
        line-height: 80px;
        color: @itv-page-main;
        cursor: pointer;
    }
    .nav{
        display: flex;
        font-size: 14px;
        .nav-item{
            padding: 10px;
            cursor: pointer;
        }
    }
   
}
.seciton{
    max-width: 1200px;
    margin: auto;
    
}



</style>
