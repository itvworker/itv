export default {
    methods: {
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
            this.stepY = dy > 0? this.calcStep(dy):-this.calcStep(dy)
            this.stepX = dx > 0? this.calcStep(dx):-this.calcStep(dx)
            this.stepX*=value
            this.stepY*=value

           
            window.requestAnimationFrame(this.step);                 

        },
        /**
         * 缓存位置，需要结合keeplive组件
         */
        cache() {
            this.x = this.scrollX;
            this.y = this.scrollY
        },
        //
        animate(speed, value) {
            this.stepX = speed.x;
            this.stepY = speed.y;
         
            if(Math.abs(this.stepX) <= this.stopStep) {
                this.stepX = 0
            }

            if(Math.abs(this.stepY) <= this.stopStep) {
                this.stepY = 0
            }

            if(this.stepY===0 && this.stepX === 0) {
                this.$emit('stopscroll')
                return 
            }
            window.requestAnimationFrame(this.step, value)
        },
        //滚动动画
        step(time, value) {
            let continuing = true;
            if(this.isTouch || this.isMove) return;
            let scrollX = this.scrollX - this.stepX
            let scrollY = this.scrollY - this.stepY
            

            //当快要滚动到指定点的Y轴时
            let arrive = ((this.stepY < 0 && scrollY > this.scrollToY) || (this.stepY > 0 && scrollY < this.scrollToY)) && this.scrollToY!==null
            if(arrive) {
                this.stepY = 0;
                scrollY = this.scrollToY;
                this.scrollToY = null;
                continuing = false;
                
            }

            //当是指定滚动到某一点时
            if(this.stepY > 0 && this.scrollToY!==null &&scrollY < this.scrollToY) {
                this.stepY = 0;
                scrollY = this.scrollToY;
                this.scrollToY = null;
            }
            //允许弹动时
            if((scrollY < 0 && this.topBounce) || (scrollY >= this.maxY && this.bottomBounce)) {
                //是否回弹
                let isBounce = (this.stepY < 0 && this.scrollY < 0) || (this.stepY > 0 && this.scrollY> this.maxY);
                if(!isBounce && continuing) {
                    scrollY = this.scrollY - this.stepY*0.5
                    this.stepY = this.stepY*0.8
                }
                
            }
            //不许弹动时
            if(scrollY < 0 && !this.topBounce) {
                scrollY = 0
                this.stepY = 0
            }
            //不许弹动时
            if(scrollY > this.maxY && !this.bottomBounce) {
                scrollY = this.maxY
                this.stepY = 0
            }

            

            this.scrollX = scrollX;
            this.scrollY = scrollY;
            this.scrollRender(0, this.scrollY, 1)
            this.scrollXRender(0,0,1)
            this.scrollYRender(0,this.scrollY,1)
            this.stepX = this.stepX * this.percent
            this.stepY = this.stepY * this.percent
            
            if(this.pattern === 'vertical') {
                this.stepX = 0;
                this.scrollX = 0;
            }

            

            if(Math.abs(this.stepX) <= this.stopStep) {
                this.stepX = 0
            }
            if(Math.abs(this.stepY) <= this.stopStep) {
                this.stepY = 0
            }
            
            if(this.stepX===0 && this.stepY === 0) {
                if(this.scrollY < 0 && continuing) {
                    this.scrollTo(this.scrollToX, 0, 1.5)
                }

                if(this.scrollY > this.maxY && continuing) {
                    this.scrollTo(this.scrollToX, this.maxY, 1.5)
                }
                return
            }
            
            
            window.requestAnimationFrame(this.step)
        }
    }
}
