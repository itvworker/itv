import { timers } from 'jquery';
import getDirection from '../../../libs/touch'
export default {
    methods: {
        touchstart(e) {
            this.isTouch = true;
            this.startTime = new Date().getTime()
            this.touchDirection = 0; //重置touch滑动方向
            this.moveDirection = ''; //重置touch滑动方向
            this.nowSliver =  this.childrenSlivers[this.sliverIndex]; //当前子元素
            let touches = e.touches;
            //检查手指数量
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }

            // 两只手指滑动处理中心点
            let isSingleTouch = touches.length === 1;
            if (isSingleTouch) { //如果只有1只手指时
                this.moveX = touches[0].pageX;
                this.moveY = touches[0].pageY;
            } else {//如果只有两只手指时，取中点
                this.moveX = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                this.moveY = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }
            
            this.startX = this.moveX 
            this.startY = this.moveY
            this.passMoveX = this.moveX,
            this.passMoveY = this.moveY;
            this.isTouch = true


        },
        touchmove(e) {
            
            
            let touches = e.touches;
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

            let x = moveX
            let y = moveY
            
         
            this.touchMoveList.push({
                x: moveX,
                y: moveY,
                time: new Date().getTime()
            })

          


            let obj = getDirection(this.moveX, this.moveY, x, y, this.moveDirection)
            this.touchDirection = obj.type;
            


            
            //判断是否滑动并判断滑动的类型
            if (obj.type > 0 && !this.moveDirection) {
                if (obj.type === 1 || obj.type === 2) {
                    this.moveDirection = 'vertical'
                } else {
                    this.moveDirection = 'horizontal'
                }
            }
            
            //判断是否已经有滑动了
            if (!this.moveDirection) return
            e.preventDefault()
            e.stopPropagation()

           
            this.moveX = x
            this.moveY = y
                switch (this.moveDirection) {
                    case 'vertical':
                        // this.nowSliver.touchmove(obj.angy)
                        //touchmove是否有滑动，1向上 2向下 3向左 4向右 0未滑动

                        //当向上滚动时，并且还未处最小收缩度
                        //是否收缩头部
                        let isScrollHeader = (obj.type === 1 && this.headerDomHeight > this.headerMinHeight)
                                            ||(obj.type === 2 && this.nowSliver.domY <=0)
                        if(isScrollHeader) {
                            this.headerDomHeight += obj.angy;
                            //当高度为最小高度时
                            if(this.headerDomHeight <= this.headerMinHeight) {
                                this.headerDomHeight = this.headerMinHeight;
                            }
                            //当高度为最大高度时
                            if(this.headerDomHeight > this.headerMaxHeight) {
                                this.headerDomHeight = this.headerMaxHeight;
                            }
                            //更新头部
                            this.headerDom(this.headerDomHeight)
                            return
                        }
                        
                         //当向上滚动时，并且header还处最小收缩度
                        //是否滚动子元素
                         let isScorllSliver = (obj.type === 1 && this.headerDomHeight <= this.headerMinHeight)
                                             || (obj.type === 2 && this.nowSliver.domY > 0)
                        if(isScorllSliver) {
                            this.nowSliver.touchmove(obj.angy);
                            return
                        }
             

                        break;
                    case 'horizontal':
                        break
                }

          
           
        },
        touchend(e) {    
            let now = new Date().getTime()
            this.isTouch = false;
            // let dis = this.moveDirection==='progress'?this.moveX - this.startX:this.moveY - this.startY
            // let isfast = Math.abs(dis) > 20 && now - this.startTime < 200
            // let x = this.x
            // let y = this.y
           
            switch (this.moveDirection) {
                case 'vertical':
                    
                    
                    let speed = this.calcMoveSpeed();
                    this.animate(speed)
                    
                   
                    break
                case 'horizontal':
                    

                default:
                    
            }
        },
    }
}