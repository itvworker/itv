<template>
    <itv-container>
        <itv-header>ITV</itv-header>
        <itv-main>
            <section class="demo-content"  >
                <div class="dot-link" v-for="(item, index) in navs" :key="index"  @click.stop="topage(item)">
                    <i :class="item.icon"></i>
                    <div class="name">{{item.name}}</div>
                </div>
            </section>
            <img :src="imageUrl" />
        </itv-main>    
    </itv-container>

</template>

<script>
import layout from './layout'
import { removeTypeDuplicates } from '@babel/types';

export default {
    mixins:[layout],
    data() {
        return {
            show: false,
            imageUrl:""
        };
        
    },
    methods: {
        open() {
            this.show = true;
        },
        plugin(value) {
            this.$itv.popup.confirm({
                html: "weg",
                hideOnClick: true,
                text: ""
            });
        },
        topage(item) {
            
            this.$router.push({
                name: item.routerName
            })
        },
        humpToFront(name) {
            let arr = [];
            let nameArr = name.split('')
            nameArr.forEach((item,index)=>{
                if(/[A-Z]/.test(item) && index!==0) {
                    arr.push(index);
                }
            })
            name = name.toLowerCase();
            let newName = '';
            arr.forEach((item,index)=>{
                if(index===0) {
                    newName = name.substring(index, item);
                }else{
                    newName += '-'+name.substring(arr[index-1], item);
                }
            });
            if(arr.length>=1) {
                newName += '-'+name.substring(arr[arr.length-1],name.length)
            }

            if(arr.length<=0) {
                newName = name;
            }
            return newName;
        }
        
    },
    mounted() {
        

    }
};
</script>

<style lang="less" scoped>
.demo-content {
    display: flex;
    flex-wrap: wrap;
    .dot-link{
        height: 100ipx;
        flex: 0 0 auto;
        width: 33.3333333%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 16ipx;
        border-right: #ddd solid 1px;
        border-bottom: #ddd solid 1px;
        box-sizing: border-box;
        .name{
            line-height: 40ipx;
        }
        i{
            color:@itv-page-main;
        }
        &:nth-child(3n) {
            border-right: #ddd solid 0px;
        }
    }
}

</style>
