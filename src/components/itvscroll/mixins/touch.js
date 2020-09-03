import getDirection from '../../../libs/touch'
import { type } from 'jquery';
export default {
    methods: {
        touchstart(e, self) {
            //启用自定义调用事件
            if(this.touchType === 'custom' && self) return
            if (e.target.tagName.match(/input|textarea|select/i)) {
                return
            }
            let touches = e.touches;
            //检查手指数量
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }

            // 两只手指滑动处理中心点
            
            let isSingleTouch = touches.length === 1;
            if (isSingleTouch) {
                this.moveX = touches[0].pageX;
                this.moveY = touches[0].pageY;
            } else {
                this.moveX = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                this.moveY = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }
            this.startX = this.moveX 
            this.startY = this.moveY

          
            this.touchMoveList.push({
                x: this.moveX,
                y: this.moveY,
                time: new Date().getTime()
            })
            

        },
        touchmove(e, self) {
            //启用自定义调用事件
            if(this.touchType === 'custom' && self) return
            e.preventDefault();
            let touches = e.touches;
            //检查手指数量
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }

            // 两只手指滑动处理中心点
            let moveX, moveY
            let isSingleTouch = touches.length === 1;
            if (isSingleTouch) {
                moveX = touches[0].pageX;
                moveY = touches[0].pageY;
            } else {
                moveX = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                moveY = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }
            //判断滑动方向，并获取滑动距离
            let res = getDirection(this.moveX, this.moveY, moveX, moveY)
            //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
            console.log(res);
            console.log(this.direction);
            if(!res) return
            if(res.type===1 || res.type === 2 && !this.direction) {
                this.direction = 'vertical'
            }
            if(res.type===3 || res.type === 4 && !this.direction) {
                this.direction = 'horizontal'  
            }
            if(!this.direction) return

            this.moveX = moveX;
            this.moveY = moveY;
            this.touchMoveList.push({
                x: this.moveX,
                y: this.moveY,
                time: new Date().getTime()
            })
            /**
             * 滑动模式
             * freedom x轴，y轴可自由滚动, 
             * auto 可滚动x轴，y轴，但只能一次滚动一个方向，
             * vertical竖向滚动，
             * horizontal横向滚动
            */
            if(this.pattern === 'freedom') {
                
            }

            if(this.pattern === 'auto') {
                
            }
            
            if(this.pattern === 'vertical' && this.direction === 'vertical') {
                
                let scrollY = this.scrollY - res.angy;
                 
                //允许弹动时
                if((scrollY < 0 && this.topBounch) || (scrollY >= this.maxY && !this.bottomBounch)) {
                    scrollY = this.scrollY - (res.angy*0.5)
                }
                //不许弹动时
                if(scrollY < 0 && !this.topBounch) {
                    scrollY = 0
                }
                //不许弹动时
                if(scrollY > this.maxY && !this.bottomBounch) {
                    scrollY = this.maxY
                }

                this.scrollY = scrollY  
                this.scrollRender(this.scrollX, this.scrollY, 1)

                return
            }

            if(this.pattern === 'horizontal') {
                return
            }



        },
        touchend(e, self) {
            //启用自定义调用事件
            if(this.touchType === 'custom' && self) return
            
            this.isMove = false;
            this.isTouch = false;
            this.touchMoveList[this.touchMoveList.length-1].time = new Date().getTime()
            let speed = this.calcMoveSpeed()
            this.direction = null
            this.animate(speed);
           
        }
    }
}