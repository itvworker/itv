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
        }
    },
    data() {
        return {
            componentName:'sliver',
            maxY: 0, //最大滚动高度
            y: 0, //滚动值，会触发vue更新dom
            domY: 0, //滚动值，不会触发vue更新dom，直接更新dom，不经过vue
            isRefresh: false, //是否处于刷新状态
            scrollDom:'' //dom位置更新方法
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
        touchmove(dis) {
            this.domY += dis;
            this.scrollDom(0, this.domY, 0)
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
    
}
</style>