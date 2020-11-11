import getDirection from '../../../libs/touch'
export default {
    methods: {
        touchstart(e) {
            this.startTime = new Date().getTime()
            this.touchDirection = 0; //重置touch滑动方向
            this.moveDireaction = ''; //重置touch滑动方向
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

          


            let obj = getDirection(this.moveX, this.moveY, x, y, this.moveDireaction)
            this.touchDirection = obj.type;


            
            //判断是否滑动并判断滑动的类型
            if (obj.type > 0 && !this.moveDireaction) {
                if (obj.type === 1 || obj.type === 2) {
                    this.moveDireaction = 'vertical'
                } else {
                    this.moveDireaction = 'horizontal'
                }
            }
            
            //判断是否已经有滑动了
            if (!this.moveDireaction) return
            e.preventDefault()
            e.stopPropagation()
            this.moveX = x
            this.moveY = y
                switch (this.moveDireaction) {
                    case 'vertical':
                       

                        break;
                    case 'horizontal':
                        break
                }
           
        },
        touchend(e) {

        }
    }
}