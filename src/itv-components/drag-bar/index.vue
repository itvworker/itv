<template>
    <div class="itv-drag-bar"   :class="{'itv-drag-moved': isDrag , 'itv-none-moved': isDrag === false,  'itv-drag-letgo': letgo}" @touchstart="touchstart" @touchmove="touchmove"  @touchend="touchend">
        <slot></slot>
    </div>
</template>
<script>
import render from '../../libs/render';
import getDirection from '../../libs/touch'
export default {
    name:"itv-drag-bar",
    props: {
        id: {
            type: [String, Number],
            default: null
        },
        index: {
            type: Number,
            default:null
        },
        tapTime: {
            type:Number,
            default: 300
        },
        /**
         * 滑动模式
         * freedom x轴，y轴可自由滚动, 
         * vertical竖向滚动，
         * horizontal横向滚动
         */
        pattern: { 
            type: String,
            default: 'freedom' 
        },
        triggerDisY: {
            type: Number,
            default: null
        },
        triggerDisX: {
            type: Number,
            default: null
        },
        isCanDrag: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            x: 0,
            y: 0,
            render: null,
            dom: null,
            startX: 0,
            startY: 0,
            parentLeft: 0,
            parentTop:0,
            left: 0,
            top: 0,
            isDrag: null,
            timeout: null,
            moveY: 0,
            moveX: 0,
            elWidth:null,
            elHeight: null,
            letgo: false,
            isMove: false,
            timeEnd: false
        }
    },
    inject:["itvDrag"],
    mounted() {
        this.init();


        this.itvDrag.$on('onDrag', (obj)=>{
            this.drag(obj);
        })

        this.itvDrag.$on('endDrag', (x,y)=>{
            if(this.letgo) {
               this.itvDrag.$emit('onEnd', this.index, this.id);
            }
            this.letgo = false
        })

        

        this.itvDrag.$on("trigger", ()=>{
            if(this.isDrag === null) {
                this.isDrag = false;
            } 
        })

        this.itvDrag.$on("onTouchend",()=>{
            this.isDrag = null;
        });

        /**
         * 重新计算drag-bar的位置，  更新是要调用
         */
        this.itvDrag.$on('onRestart', (obj)=>{
            this.init();
        })
    },
    methods: {
        init() {
            this.left = this.$el.offsetLeft;
            this.top = this.$el.offsetTop;
            this.elWidth = this.$el.clientWidth;
            this.elHeight = this.$el.clientHeight;

        },
        drag(obj) {
            if(this.isDrag) return;
            let dragBarCenterX = obj.x + obj.width/2;
            let dragBarCenterY = obj.y + obj.height/2;
            
            let nearBarCenterX = this.left + this.elWidth/2;
            let nearBarCenterY = this.top + this.elHeight/2;
            
            
            let disY = this.triggerDisY|| obj.height/2;
            let disX = this.triggerDisX|| obj.width/2;


            let isX = Math.abs(dragBarCenterX - nearBarCenterX) < disX;
            let isY = Math.abs(dragBarCenterY - nearBarCenterY) < disY;

            
            // if(this.id === 0) {
            //     console.log('----------------------------');
            //     console.log(dragBarCenterX, dragBarCenterY);
            //     console.log(nearBarCenterX, nearBarCenterY);
            // }
            
            if(isX && isY) {
                this.letgo = true;
            }else{
                this.letgo = false;
            }

        },
        
        clone(e) {
            
            
            let dom = this.$el.cloneNode(true);
            dom.style.width = this.elWidth+"px";
            dom.style.height = this.elHeight+"px";
            dom.style.position = "absolute";
            dom.style.left = '0px';
            dom.style.top = '0px'
            this.dom = dom;
            this.render = render(dom);
            this.itvDrag.$el.appendChild(dom);
            this.x = this.left;
            this.y = this.top;
            this.render( -this.x, -this.y, 1);
            dom.className +=' itv-drag-active' 
            this.isDrag = true;
            this.itvDrag.$emit("trigger");

            
        },
        touchstart(e) {
            this.timeEnd = false;
            if(!this.isCanDrag) return;
            e.preventDefault();
            this.itvDrag.$emit('onStart', this.index, this.id);
            let touches = e.touches;
            //检查手指数量
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }

            // 两只手指滑动处理中心点
            let isSingleTouch = touches.length === 1;
            if (isSingleTouch) { //如果只有1只手指时
                this.startX = touches[0].pageX;
                this.startY = touches[0].pageY;
            } else {//如果只有两只手指时，取中点
                this.startX = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                this.startY = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }
            
            this.moveX = this.startX;
            this.moveY = this.startY;
             
            this.timeout = setTimeout(()=>{
                let disX = Math.abs(this.moveX - this.startX);
                let disY = Math.abs(this.moveX - this.startX);
                
                if(disX <1.5 || disY<1.5) {
                    this.isDrag = true;
                    this.clone();
                }
            },this.tapTime)
        },
        touchmove(e) {
            
            if(!this.isCanDrag) return;
            let touches = e.touches;
            let moveX, moveY
            let isSingleTouch = touches.length === 1;
            if (isSingleTouch) {
                moveX = touches[0].pageX;
                moveY = touches[0].pageY;
            } else {
                moveX = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                moveY = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }
            let obj = getDirection(moveX, moveY, this.startX, this.startY);
            if(obj) {
                this.moveY = moveY;
                this.moveX = moveX; 
                 clearTimeout(this.timeout);
            }
           
           if(!this.isDrag) {
               return
           }

            e.stopPropagation();

            if(this.pattern === 'vertical' || this.pattern === 'freedom') {
               this.y = moveY- (this.startY - this.top);
            }else{
                this.x = this.top;
            }

            if(this.pattern === 'horizontal' || this.pattern === 'freedom') {
                this.x = moveX-(this.startX - this.left);
            }else{
                this.x = this.left;
            }

            this.render(-this.x, -this.y, 1);
            this.itvDrag.$emit("onDrag", {x:this.x, y:this.y, width: this.elWidth, height: this.elHeight});  
            
        },
        touchend(){
            if(!this.isCanDrag) return;
            if(this.dom) {
                this.itvDrag.$el.removeChild(this.dom);
                this.dom = null;
            }
            this.isDrag = null;
            this.itvDrag.$emit('endDrag');
            this.itvDrag.$emit("onTouchend");
            clearTimeout(this.timeout);
        }
    }
}
</script>
