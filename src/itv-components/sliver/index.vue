<template>
    <div class="itv-sliver" :style="{'height':sliverHeight+'px'}" >
         <slot name="outer"></slot>
        <div class="itv-sliver-scroller" ref="scroller">
            <div class="itv-sliver-refresh" ref="pull" v-show="refreshLoad">
                <slot name="pull">
                    <refresh-bar :pullDownText="pullDownText" :loadingText="refreshingText" :letgoText="letgoText"    v-model="isRefresh" :top="domY" :triggerDir="refreshHeight"></refresh-bar>
                </slot>
             </div>
            <slot></slot>
            <div class="itv-sliver-more" ref="more" v-show='isMore && moreStatus!=="loadingStop"'>
                <spinner v-show="moreStatus !== 'none'" class="itv-sliver-more-icon" :style="{fill: refreshLayerColor, stroke: refreshLayerColor}" />
                <span v-show="moreStatus === 'none'">{{noDataText}}</span>
                <span v-show="moreStatus !== 'none'">{{loadingText}}</span>
            </div>  
        </div>
    </div>
</template>
<script>
import render from '../../libs/render'
import refreshBar from './refresh.vue'
import Spinner from "./Spinner.vue";
export default {
    name: 'itv-sliver',
    components: {
        refreshBar,
        Spinner
    },
    props: {
        sliverHeight:{
            type: Number,
            default: null
        },  
        index: {
            type: Number,
            default: 0
        },
        //是否开启顶部弹动
        bounceTop: {
            type: Boolean,
            default: false
        },
        //是开启触发下拉刷新
        refreshLoad: {
            type: Boolean,
            default: false,
        },
        pullDownText: {
            type: String,
            default:'下拉刷新'
        },
        refreshingText: {
            type: String,
            default:'更新中'
        },
        letgoText: {
            type: String,
            default:'松开刷新'
        },
        // //触发下拉刷新高度
        // refreshHeight: {
        //     type: Number,
        //     default: 60
        // },
        percent: {
            type: Number,
            default: 0.95
        },
        bounceBottom: {
            type: Boolean,
            default: false,
        },
        pid: {
            type: String,
            default:"slivers"
        },
        isMore: {
            type: Boolean,
            default: false
        },
        loadingText: {
            type: String,
            default:"加载中…"
        },
        noDataText: {
            type: String,
            default:"没有更多数据"
        },
         refreshLayerColor: {
            type: String,
            default: "#AAA"
        },

        loadingLayerColor: {
            type: String,
            default: "#AAA"
        },
        
        
        
    },
    data() {
        return {
            componentName:'sliver',
            maxY: 0, //最大滚动高度
            y: 0, //滚动值，会触发vue更新dom
            domY: 0, //滚动值，不会触发vue更新dom，直接更新dom，不经过vue
            isRefresh: false, //是否处于刷新状态
            scrollDom:'', //dom位置更新方法
            isTouch: false,
            bounceY:0,
            stepY:0,
            stopStep: 0.5,
            bounceStatus: 0, //0 下拉， 1 上拉
            moreStatus: 'loadingStop',
            refreshHeight: 60
        }
    },
    inject:['itvSliverContainer'],
    watch: {
        domY(value) {
            console.log(value);
            this.loadingData(value)
        }
    },
    methods:{
        refresh() {
            this.isRefresh = false;
            let dom = this.$refs.scroller;
            let parent = dom.parentNode;
            let ph = dom.clientHeight;
            if(this.refreshLoad) {
                this.refreshHeight = this.$refs.pull.clientHeight;
            }
            
            if(this.isMore) {
                this.moreStatus = 'loadingStop';
            }

            this.maxY = Math.max(ph - parent.clientHeight,0);
            if(this.domY < 0) {
                let speed = this.calcStep(this.domY, 1.2);
                this.bounceY = 0;
                this.bounceAnimate(speed);
            }
            if(this.y>=this.maxY) {
                this.scrollDom(0, this.maxY, 1) 
                this.y = - this.maxY
            }
            this.$nextTick(()=>{
                this.calcMax();
            })
        },
        emitRefresh() {
            this.$emit('refresh')
            this.$emit('onRefresh')
        },
        /**
         * 计算最大滚动值
         *  */    
        calcMax() {
            let dom = this.$refs.scroller;
            let parent = dom.parentNode;
            let ph = dom.clientHeight;
            this.maxY = Math.max(ph - parent.clientHeight,0);
        },
        cache() {
            this.vy = this.y;
        },
        setPosition(value) {
            if(typeof value === 'number') {
                this.domY = value;
                this.y = value;
            }
           
            this.scrollDom(0, this.domY, 1)
        },
    
        //父元素回弹动画
        bounceAnimate(speed) {
            this.stepY = speed;
            window.requestAnimationFrame(this.bounceStep);     
        },

        bounceStep() {
            if(this.isTouch) return;
            if(this.stepY===0) {
                this.$emit('stopscroll',{
                    y: this.domY
                })
                if(this.bounceY===0) {
                    this.isRefresh = false;
                }
                return
            }
            this.domY += this.stepY;
            
            if(this.domY>this.bounceY && this.bounceStatus === 0) {
                this.domY = this.bounceY;
                this.stepY = 0;
            }

            if(this.domY<this.bounceY && this.bounceStatus === 1) {
                this.domY = this.bounceY;
                this.stepY = 0;
            }
            this.scrollDom(0,this.domY,1);
            window.requestAnimationFrame(this.bounceStep);
            
        },
        /**
         * 计滚动到一定距离的stepX,stepY的开始步数
         * @param {Number} distance 
         */
        calcStep(distance, num) {
            let dis = Math.abs(distance);
            if(dis===0) {
                return 0
            }
            let step = this.stopStep; 
            let numDis = 0;
            while(numDis<dis) {
                numDis+= step/this.percent
                step = step/this.percent
            }

            step = step/this.percent
            return step*num
        },
    
        
        //滚动到指定位置
        /**
         * 
         * @param {Number} x 
         * @param {Number} y 
         * @param {Nubmer} value 速度倍数 
         */
        scrollTo(x,y,value=1) {
            this.scrollToX =x;
            this.scrollToY = y;
            let dx = this.scrollX - x;
            let dy = this.scrollY - y;
            this.sStepY = dy > 0? this.calcStep(dy):-this.calcStep(dy)
            this.sStepX = dx > 0? this.calcStep(dx):-this.calcStep(dx)
            this.sStepX*=value
            this.sStepY*=value
            window.requestAnimationFrame(this.step);                 
        },
       
        //
        animate(speed, value) {
            if(this.isTouch) {
                this.stepY = 0;
                return
            }
            this.stepY = speed.y;
            if(this.stepY===0) {
                this.$emit('stopscroll',{
                    y: this.domY
                })
            
                return 
            }
         
            window.requestAnimationFrame(this.srollStep);
        },
      
       
        sliverIndex() {
            this.itvSliverContainer.nowSliver = this;
        },

        //是否触发上拉加载
        loadingData(value) {
            if(this.isRefresh) return;
            if(this.isMore && value >= this.maxY && this.moreStatus ==='loadingStop') {
                this.moreStatus = 'loading';
                this.$emit('infinite')
                this.$emit('onInfinite')
                this.$nextTick(()=>{
                    this.calcMax()
                })
            }
        },
        infinite(value) {
            if(value) {
                this.moreStatus = 'none';
            }else{
                this.moreStatus = 'loadingStop'; 
            }
            this.$nextTick(()=>{
                this.calcMax()
            })  
        }
    },
    mounted() {
        this.scrollDom = render(this.$refs.scroller)
        this.refresh();
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-sliver.less';
</style>