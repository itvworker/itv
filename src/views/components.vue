<template>
    <section class="components-page">
        <div class="meun">
            <div class="component-type" v-for="item in meuns" :key="item.key">
                <div class="title">
                    {{item.title}}
                </div>
            
                <div class="item" @click.stop="onChangeDoc(sub)" v-for="sub in item.children" :key="sub.id" :class="{active:type===sub.id}">
                    {{sub.title}}
                </div>        
            </div>
        </div>     
         
         <div class="doc-page" v-html="doc"></div>
    </section>
</template>
<script lang="ts">
import doc from '@/components/doc';
import html from '@/libs/doc';
import { defineComponent } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
export default defineComponent({
    computed:{
        doc() {
            let id = this.$route.params.id;
           
            let msg = new html(doc[id]).getHtml();
            return msg
        },
        type() {
            return this.$route.params.id
        }
        
    },
    data() {
        return{
            meuns:[
                {
                    title:"媒体",
                    key: 0,
                    children:[{
                        id: 'cliper',
                        title:"Cliper(截图)"
                    }]
                },{
                    title:"日历",
                    key:1,
                    children:[{
                        id: "schedule",
                        title:"Schedule(日程)"
                    }]
                }
            ]
        }
    },
    updated() {
         this.mdhljs();
    },
    methods:{
        mdhljs() {
            const preEl = document.querySelectorAll('pre')
            preEl.forEach((el:any) => {
                hljs.highlightBlock(el)
            })
        },
        //** 切换组件文档 */
        onChangeDoc(item: any) {
            this.$router.replace({
                name: this.$route.name,
                params:{
                    id: item.id
                }
            })
            
        }
    },
    mounted() {
        this.mdhljs();
    }
})
</script>
<style lang="less">
.components-page{
    display: flex;
    .meun {
        width: 200px;
        padding-top: 20px;
        .component-type{
            font-size: 22px;
            margin-bottom: 30px;
            .item {
                font-size: 16px;
                color: @page-color-text-sub;
                padding-left: 20px;
                cursor: pointer;
                margin-bottom: 10px;
                margin-top: 10px;
                &.active {
                    color: @page-primary-color;
                }
            }
        }
    }
}
.doc-page{
    font-family: Menlo,Menlo Regular,Consolas,monospace;
    color: #333;
    padding: 10px;
    font-size: 14px;
    line-height: 180%;
    padding-bottom: 20px;
    flex: 1;
    .hljs{
        padding: 20px;
    }
    .phone-show{
        position: fixed;
        top: 0px;
        right: 0px;
        iframe{
            width: 375px;
            height: 667px;
            background-color: #fff;
            border:#ddd solid 1px;
            border-radius: 6px;

        }
    }

    table{
        border-spacing: 0;
        border-collapse: collapse;
        width: 100%;
        thead{
            background-color: #eee;
            th{
                border:#ddd solid 1px;
                padding: 10px;
            }
        }
        td{
            border:#ddd solid 1px;
            text-align: center;
            padding: 10px;
        }
    }
    h1{
        font-size: 28px;
        color: @page-primary-color;
        font-weight: normal;
    }
    h2{
        font-size: 26px;
        font-weight: 300;
        color: #666;


    }
    h3 {
        font-size: 24px;
        font-weight: 200;
        border-bottom: #ddd solid 1px;
        padding-bottom: 10px;
    }
    h4{
        font-size: 20px;
    }
    h5 {
        font-size: 18px;
    }
    h6 {
        font-size: 16px;
    }
    .doc-tab{
        .doc-tab-group{
            display: flex;
            border-bottom: #ddd solid 1px;
            font-weight: bold;
            .tab-item-btn{
                font-size: 16px;
                padding: 10px;
                cursor: pointer;
                &.active{
                    border-bottom:@page-primary-color solid 2px;
                }
            }
        }
        .doc-tab-content{
            .doc-tab-item{
                display: none;
                &:first-child {
                    display: block;
                }
            }

        }
    }
}
</style>

