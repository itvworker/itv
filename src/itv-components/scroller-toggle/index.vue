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
        },
        type: {
            type: String,
            default: "normal" // normal正常模式，  section 分段模式，分两段
        },
        sectionY:{ //当type等section是分段时候采用，分段的高度
            type: Number,
            default: null,
        },
        startY:{
            type: Number,
            default: null, //启动高度
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
            if(res.type !== 'vertical') {
                return
            }
            if(res.y >=  res.maxY) {
                this.y = -this.maxY;
                this.header(0, -this.y, 1);
                return
            }

            this.y =  this.y + res.stepY
            //正常模式下
            if(res.stepY<0 || this.type ==='normal') {
                if(this.y< -this.maxY) {
                    this.y =-this.maxY
                }
                if(this.y>=this.minY) {
                    this.y = this.minY;
                }
            }
           
            if(res.stepY>0 && this.type === 'section') {
                if(res.y <= this.startY) {
                    if(this.y< -this.maxY) {
                        this.y =-this.maxY
                    }
                    if(this.y>=this.minY) {
                        this.y = this.minY;
                    }
                }
                if(res.y > this.startY) {
                    if(this.y>= -this.sectionY) {
                        this.y= -this.sectionY
                        console.log(this.sectionY);
                    }
                }
                if(res.y<=1) {
                    this.y =0;
                }

            }
            


           this.header(0, -this.y, 1);
       })


       this.$parent.$on('stopscroll', (res)=>{
           
            if(res.type !== 'vertical') {
                return
            }
            if(res.y<=0) {
                this.y = 0;
                this.header(0, -this.y, 1);
            }
            if(res.y >=  this.maxY) {
                this.y = -this.maxY;
                this.header(0, -this.y, 1);
                return
            }

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