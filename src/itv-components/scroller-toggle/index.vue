<template>
    <div class="itv-scroll-toggle">
        <slot />
    </div>
</template>

<script>
import render from '../../libs/render';
export default {
    name:'itv-scroller-toggle',
    props: {
        title: {
            type: String,
            default:""
        },
        isFixed: {
            type: Boolean,
            default: true
        },
        maxY: {
            type: Number,
            default: 44
        },
        minY: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            top: 0,
            height: 0,
            header: '',
            headerHeight: 0,
            y: 0
        }
    },
    mounted() {
       this.$parent.$on('scroll', (res)=>{
            this.y =  this.y + res.stepY
            if(this.y<-this.maxY) {
               this.y =-this.maxY
            }
           if(this.y>=this.minY) {
               this.y = this.minY;
           }
           this.header(0, -this.y, 1);
       })

       this.init();
        
    },
    methods: {
        init() {

            this.header = render(this.$el);
        }
    }

}
</script>
<style lang="less">
@import '../../assets/css/itv-theme.less';
@import 'itv-scroller-elevator.less';
</style>