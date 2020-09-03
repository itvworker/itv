export default {
    methods: {
        
        scrollTo(x,y) {

        },
        //
        animate(speed) {
            this.stepX = speed.x;
            this.stepY = speed.y;
         
            if(Math.abs(this.stepX) <= 0.2) {
                this.stepX = 0
            }

            if(Math.abs(this.stepY) <= 0.2) {
                this.stepY = 0
            }

            if(this.stepY===0 && this.stepX === 0) {
                this.$emit('stopscroll')
                return 
            }
            window.requestAnimationFrame(this.step)
        },
        step() {
            if(this.isTouch || this.isMove) return;
            let scrollX = this.scrollX - this.stepX
            let scrollY = this.scrollY - this.stepY
            
            //允许弹动时
            if((scrollY < 0 && this.topBounce) || (scrollY >= this.maxY && this.bottomBounce)) {
                scrollY = this.scrollY - this.stepY*0.5
                this.stepY = this.stepY*0.8
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
            this.stepX = this.stepX * this.percent
            this.stepY = this.stepY * this.percent
            
            if(this.pattern === 'vertical') {
                this.stepX = 0;
                this.scrollX = 0;
               
            }

            if(Math.abs(this.stepX) <= 1) {
                this.stepX = 0
            }

            if(Math.abs(this.stepY) <= 1) {
                this.stepY = 0
            }
            
            if(this.stepX===0 && this.stepY === 0) {
                return
            }
            
            
            window.requestAnimationFrame(this.step)
        }
    }
}