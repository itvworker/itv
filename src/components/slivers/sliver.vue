<template>
    <div class="itv-sliver" >
        <div class="itv-sliver-scroller" ref="scroller">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import render from '../../libs/render'
export default {
    name: 'sliver',
    props: {
        index: {
            type: Number,
            default: 0
        },
        //是否开启顶部弹动
        bounceTop: {
            type: Boolean,
            default: false
        },
        //是否开启下拉刷新
        refreshStatus: {
            type: Boolean,
            defualt: false
        },
        //触发下拉刷新高度
        refreshHeight: {
            type: Number,
            defualt: 60
        }
    },
    data() {
        return {
            componentName:'sliver',
            maxY: 0, //最大滚动高度
            y: 0, //滚动值，会触发vue更新dom
            domY: 0, //滚动值，不会触发vue更新dom，直接更新dom，不经过vue
            isRefresh: false, //是否处于刷新状态
            scrollDom:'', //dom位置更新方法
            
        }
    },
    methods:{
        refresh() {
            this.isRefresh = false;
            let dom = this.$refs.scroller;
            let parent = dom.parentNode;
            let ph = dom.clientHeight;
            this.maxY = ph - parent.clientHeight || 0;
            if(this.y>=this.maxY) {
                this.scrollDom(0, this.maxY, 1) 
                this.y = - this.maxY
            }
        },
        cache() {
            this.vy = this.y;
        },
        touchmove(dis, dir) {
            let domY = this.domY - dis;
            if(!this.bounceTop && domY < 0) {
                this.domY = 0;
            }

            if(this.bounceTop && domY <= 0 && dir === 2) {
                domY =  this.domY - (dis * 0.3);
            }

            if(dir === 1 && domY <= 0) {
                domY = 0
            }
            console.log(domY);
            this.domY = domY;
            this.scrollDom(0, this.domY, 1)
        },
        setPosition() {
            this.scrollDom(0, this.domY, 1)
        }
    },
    mounted() {
        this.scrollDom = render(this.$refs.scroller)
        this.refresh();
    }
}
</script>
<style lang="less" scoped>
.itv-sliver{
    width: 100%;
    flex: 0 0 auto;
    height: 100%;
    overflow: hidden;
    .itv-sliver-scroller{
        transition: all 0ms ease 0s;
    }
}
</style>