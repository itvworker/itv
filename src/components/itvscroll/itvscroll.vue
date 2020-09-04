<template>
    <div class="itv-scroll" @touchstart="touchstart($event,true)" @touchmove="touchmove($event,true)" @touchend="touchend($event,true)" @touchcancel="touchend($event,true)" >
        <!-- 跟随x轴滚动 -->
        <div class="itv-scroll-x-touch" ref="x" :style="{'transform':`translate3d(-${x},0,0)`,'WebkitTransform':`translate3d(-${x},0,0)`}">
            <slot name="x"/>
        </div>
        <!-- 跟随y轴滚 -->
        <div class="itv-scroll-y-touch" ref="y" :style="{'transform':`translate3d(0,-${y},0)`,'WebkitTransform':`translate3d(0,-${y},0)`}" >
            <slot name="y"/>
        </div>
        <slot name="other"/>
        <!-- 滚动的内容 -->
        <div class="itv-scroll-content"  >
            <div class="itv-scroll-touch" ref="scroller" :style="{'transform':`translate3d(-${x},-${y},0)`,'WebkitTransform':`translate3d(-${x},-${y},0)`}">
                <div class="pull-top" v-if="pullDown" ref="pull">
                    <slot name='pull'>
                        下拉刷新
                    </slot>
                </div>   
                <slot/>   
            </div>
        </div>    
    </div>
</template>
<script>
import init from './mixins/init.js'
import touch from './mixins/touch.js'
import calc from './mixins/calc.js'
import animate from './mixins/animate.js'
export default {
    mixins:[init, touch, calc, animate],
    props: {
        topBounce: { //顶部是否弹起
            type: Boolean,
            default: false
        },
        bottomBounce: { //底部是否弹起
            type: Boolean,
            default: false
        },
        leftBounce: { //左部是否弹起
            type: Boolean,
            default: false
        },
        rightBounce: { //右部是否弹起
            type: Boolean,
            default: false
        },
        pullDown: { //开启此功能必须，要开启topBounce
            type: Boolean,
            default: false
        },
        /**
         * 滑动模式
         * freedom x轴，y轴可自由滚动, 
         * auto 可滚动x轴，y轴，但只能一次滚动一个方向，
         * vertical竖向滚动，
         * horizontal横向滚动
         */
        pattern: { 
            type: String,
            default: 'vertical' 
        },
        /**
         * 触屏方式
         * self自我滚动， 
         * custom自定义 touchstart,touchmove,touchend,touchcancel事件
         */
        touchType: { 
            type: String,
            default: 'self' 
        },
        tier: { //层级
            type: String,
            default: "none" //none不分层 ,parent父层，child为子层
        },
        /**
         * 控制模式
         * none 当没有子层时用none, 
         * 当有子层时：
         * parent  父层为主控制，当父层滚动到底再滚动子层, 当子层滚动到顶部再滚动父层 仅适后一个子层
         * child  子层为主控制，当子层滚动到底再滚动父层, 当父层滚动到顶部再滚动子层 仅适合一个子层
         */
        controlMode: { 
            type: String,
            default:'none' 
        },
        percent: {
            type: Number,
            default: 0.95
        },
        speed: {
            type: Number,
            default: 60
        },
        
        

    },
    data() {
        return {
            x: 0, //x轴位置，初始化有用 
            y: 0, //y轴位置, 初始化时有用
            maxY:0, //最大滚动高度
            maxX: 0, //最大滚动宽度,
            touchMoveList:[],//滑动点储存，最多20个滑动点
            startX: 0,//touchstart的触摸点
            startY: 0,//touchstart的触摸点
            moveX: 0,//上次的触摸点
            moveY: 0,//上次的触摸点,
            scrollX: 0, //真实滚动值，只储存
            scrollY: 0, //真实滚动值，只储存
            scrollRender: '', //设定滚动位置 ref=scroller
            scrollXRender: '',//设定滚动位置 ref = y
            scrollYRender: '',//设定滚动位置 ref = x
            isTouch: false, //是否手指在屏幕上
            isMove: false,//是否在滑动
            direction:null, //滑动方向, 当 pattern=freedom时失效
            stepX: 0, //动画每步的时速度的变化值
            stepY: 0, //动画每步的时速度的变化值
            stopStep: 0.5, //当stepX,stepY绝对值小于0.5停止滚动
            scrollToX: null, //滚动到某一点，仅存
            scrollToY: null, //滚动到某一点，仅存
            pullDownPoint: 0, //下拉加载的触发点
            isTriggerPullDown: false //是否触发了下拉加载
        }
    },
    
    
}
</script>