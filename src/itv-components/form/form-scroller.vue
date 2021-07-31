<template>
    <div class="itv-form-scroller" ref="scroller">
        <slot/>
    </div>
</template>
<script>
export default {
    name:"form-scroller",
    data() {
        return {
            
        }
    },
    provide() {
        return {
            formScroller: this
        }
    },
    methods: {
        getPostion() {
           let top = this.$el.offsetTop;
           let left = this.$el.offsetLeft;
           let scrollTop = this.$el.scrollTop;
           return {x: left, y: top, scrollTop: scrollTop} 
        },
        scrollTop(y) {
            this.$el.scrollTop = y;
        }
    },
    mounted() {
        
    }
    

}
</script>
<style lang="less" scoped>
.itv-form-scroller {
    flex: 1;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
</style>