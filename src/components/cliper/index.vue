<template>
<!--   @mousemove="touchmove"  -->
    <div class="itv-cliper"  ref="clipic" @mouseup="touchend" @mouseleave="touchend"  @mousedown="touchstart"   @touchstart="touchstart" @touchmove="touchmove"   @touchend="touchend" >
        <div class="itv-cliper-clipic-frame" :class="{'itv-cliper-circle':clipType==='circle'}"  :style="{width:frameWidth+'px', height:frameHeight+'px'}" ref="frame1" id="clipicFrame1">
            <img ref="img1" :width="imgWidth" :height="imgHeight" 
             :src="src" /></div>
        <div class="itv-cliper-clipic-layer"></div>
        <div class="itv-cliper-clipic-frame itv-cliper-clipic-frame-show" :class="{'itv-cliper-circle':clipType==='circle'}"
          :style="{width:frameWidth+'px', height:frameHeight+'px'}"
          ref="frame2"  >
          <img ref="img2"
          :width="imgWidth" :height="imgHeight"    :src="src" /></div>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
interface Props {

}
export default defineComponent({
    name: 'itv-cliper',
    props: {
        width: { //输出图片宽度
            type: Number,
            default: 200
        },
        height: { //输出图片的高度
            type: Number,
            default: 200
        },
        outputFormat: { //输出图片的格式
            type: String,
            default: 'png'
        },
        quality: { //输出图片的质量
            type: Number,
            default: 1
        },
        clipType: { //截图类型,
            type: String,
            default: 'orthogon' //square circle orthogon
        }
    },
    data() {
        return {
            scale: 1, //图片放大的倍数
            rotate: 0, //图片旋转的角度
            translateX: 0, //图片x轴的位置
            translateY: 0, //图片y轴的位置
            distance: null, //两指距离的，用于放大缩小图片
            ratio: 1, //截图的宽高比
            toggle: true,
            originRatio:0, //插入图片的宽高比
            angle: 0, //图片旋转的角度
            moveX: 0, //手指滑动的x轴
            moveY: 0, //手指滑动的y轴
            frameWidth: 0, //截图框的宽度,由截图的比例计算得出
            frameHeight: 0, //截图框的高度，由截图的比例计算得出
            imgWidth: null, //初始化设置图片宽度
            imgHeight: null, //初始化设置图片高度
            initVal: { //存储初化的参数
                scale: 1,
                rotate: 0,
                translateX: 0,
                translateY: 0,
            },
            supportTouch: true, 
            press: false,
            src: ''
        }
    },

    computed: {


    },

    methods: {
        insertImage(url: any){
            // 初始化参数
            this.scale = 1 // 缩放
            this.rotate = 0 // 旋转
            this.translateX = 0 // 水平偏移
            this.translateY = 0 // 垂直偏移
            this.toggle = true;
            let tempImage = new Image()
            tempImage.src = url;
            this.src = url;
            //加载图片
            tempImage.onload = () => {
                this.originW = tempImage.width
                this.originH = tempImage.height
                this.originRatio = this.originW / this.originH
                this.ratio = this.width / this.height
                this.initSize()
                if (this.ratio > this.originRatio) {
                    this.imgWidth = this.frameWidth;
                    this.imgHeight = this.frameWidth/this.originRatio;
                    this.translateY = -(this.frameWidth/this.originRatio-this.frameHeight)/2
                    this.initVal.translateY = this.translateY;
                    this.initVal.translateX = 0;
                } else {
                    this.imgHeight = this.frameHeight;
                    this.imgWidth =  this.frameHeight*this.originRatio;
                    this.translateX = -(this.frameHeight*this.originRatio-this.frameWidth)/2
                    this.initVal.translateX = this.translateX;
                    this.initVal.translateY = 0

                }
                this.setImgTransform();
            }
        },
        touchend(e: any) {
            this.distance = null
            this.angle = null
            this.moveX = null
            this.moveY = null
            this.press = false;
        },
        touchstart() {
            this.press = true;
        },
        handleScroll(e: any) {
            if(e.wheelDelta>0) {
                 this.scale += 0.1;
            }else{
                 this.scale -= 0.1;
            }
            this.setImgTransform();
            
        },
        touchmove(e: any) {
            e.preventDefault();
            if(e.type === 'mousemove'){
                if(this.press){
                    this.setTranslate(e)
                    this.setImgTransform();
                    return
                }
            }   
            if (e.touches.length>1) {
                this.setScale(e.touches[0], e.touches[1])
                this.setRotate(e.touches[0], e.touches[1])
                this.setImgTransform();
                return
            }
            this.setTranslate(e.touches[0])
            this.setImgTransform();
        },

        setScale(touches1: any, touches2: any) {
            const x = Math.abs(touches1.clientX - touches2.clientX)
            const y = Math.abs(touches1.clientY - touches2.clientY)
            const s = Math.sqrt(x * x + y * y)
            if (this.distance) {
                this.scale += (s - this.distance) / this.$refs.img2.clientWidth;
            }
            this.distance = s
            
        },
        setRotate(touches1: any, touches2: any) {
            const x = touches1.clientX - touches2.clientX
            const y = touches1.clientY - touches2.clientY
            const s = Math.sqrt(x * x + y * y)
            const angle = (Math.atan2(y, x) * 180) / Math.PI
            if (this.angle) {
                this.rotate += angle - this.angle
            }
            this.angle = angle
            
        },
        setTranslate(touches: any) {
            const x = touches.clientX
            const y = touches.clientY

           
            if (this.moveX) {
                this.translateX += x - this.moveX
            }
            if (this.moveY) {
                this.translateY += y - this.moveY
            }
            this.moveX = x
            this.moveY = y
        },
        setImgTransform() {
            // this.$refs.img1.style.webkitTransform=`translate3d(${this.translateX}px, ${this.translateY}px) scale('${this.scale}') rotate(${this.rotate}deg)`
            // this.$refs.img2.style.webkitTransform=`translate3d(${this.translateX}px, ${this.translateY}px) scale('${this.scale}') rotate(${this.rotate}deg)`
            this.$refs.img1.style.webkitTransform =`translate3d(${this.translateX}px,${this.translateY}px, 0px) scale(${this.scale}) rotate(${this.rotate}deg)`
            this.$refs.img2.style.webkitTransform =`translate3d(${this.translateX}px,${this.translateY}px, 0px) scale(${this.scale}) rotate(${this.rotate}deg)`
            this.$refs.img1.style.transform =`translate3d(${this.translateX}px,${this.translateY}px, 0px) scale(${this.scale}) rotate(${this.rotate}deg)`
            this.$refs.img2.style.transform =`translate3d(${this.translateX}px,${this.translateY}px, 0px) scale(${this.scale}) rotate(${this.rotate}deg)`
        },
        initSize() {
            const body = document.documentElement || document.body
            let cw = this.$refs.clipic.clientWidth-60;
            const ch = this.$refs.clipic.clientHeight-60;
            this.frameWidth = cw
            this.frameHeight = cw / this.ratio
            if (cw / this.ratio > ch) {
                this.frameHeight = ch
                this.frameWidth = ch * this.ratio
            }
        },
        reset() {
            this.scale = 1
            this.rotate = 0
            this.translateX = this.initVal.translateX;
            this.translateY = this.initVal.translateY;
            this.setImgTransform()
        },
        cancel() {
            this.toggle =  false;
            if (this.onCancel) {
                this.onCancel()
            }
        },
        done() {
            const zommRatio = this.width / this.frameWidth
            const canvas = document.createElement('canvas')
            canvas.width = this.width
            canvas.height = this.height
            const ctx:any = canvas.getContext('2d')
            ctx.fillStyle = '#fff'
             if(this.outputFormat === 'png'){
                 ctx.fillStyle = 'rgba(0,0,0,0)'
             }

            ctx.fillRect(0, 0, canvas.width, canvas.height)
            if(this.clipType === 'circle'){
                ctx.arc(canvas.width/2,canvas.height/2,canvas.width/2,0,2*Math.PI);
                ctx.clip()
            }


            let drawImageW;
            let drawImageH;
            if (this.ratio > this.originRatio) {
                drawImageW = this.width
                drawImageH = this.originH / (this.originW / this.width)
            } else {
                drawImageH = this.height
                drawImageW = this.originW / (this.originH / this.height)
            }
            const point = { x: drawImageW / 2, y: drawImageH / 2 }
            ctx.translate(this.translateX * zommRatio, this.translateY * zommRatio)
            if (this.rotate !== 0) {
                ctx.translate(point.x, point.y)
                ctx.rotate((this.rotate * Math.PI) / 180)
                ctx.translate(-point.x, -point.y)
            }
            if (this.scale !== 1) {
                ctx.translate(point.x * (1 - this.scale), point.y * (1 - this.scale))
                ctx.scale(this.scale, this.scale)
            }
            ctx.drawImage(this.$refs.img2, 0, 0, drawImageW, drawImageH)
            let result = canvas.toDataURL(`image/${this.outputFormat}`, this.quality)
            this.$emit('output', result);
            return result

        }

    },
    mounted() {
        window.addEventListener('mousewheel',this.handleScroll,false) || window.addEventListener("DOMMouseScroll",this.handleScroll,false)
        // this.$refs.clipic.addEventListener('touchstart',this.touchstart, false)
        //  this.$refs.clipic.addEventListener('touchmove',this.touchmove, false)
        //   this.$refs.clipic.addEventListener('touchend',this.touchend, false)

    }
})
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import "itv-cliper.less";
</style>
