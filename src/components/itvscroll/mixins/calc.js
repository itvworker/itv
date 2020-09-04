import { timers } from "jquery";

export default {
    mounted() {
        // setTimeout(()=>{
        //     this.scrollTo(1000, 1000)
        // },3000)
        // setTimeout(()=>{
        //     this.scrollTo(1000, 200)
        // },6000)
       
    },
    methods: {
        /**
         * 计滚动到一定距离的stepX,stepY的开始步数
         * @param {Number} distance 
         */
        calcStep(distance) {
            let dis = Math.abs(distance);
            let step = this.stopStep; 
            let numDis = 0;
            while(numDis<dis) {
                numDis+= step/this.percent
                step = step/this.percent
            }
            step = step/this.percent
            return step
        },
        /**
         * 计算滚动的最大值
         */
        calcMax() {
            let parent = this.$refs.scroller.parentNode;
            let child = this.$refs.scroller;
            let parentWidth = parent.clientWidth;
            let parentHeight = parent.clientHeight;
            let childWidth = child.clientWidth;
            let childHeight = child.clientHeight;
            this.maxX = Math.max(0,childWidth - parentWidth);
            this.maxY = Math.max(0,childHeight - parentHeight);

            
            //当滚动值超过最大值时，恢复到最大值

            if(this.scrollX > this.maxX) {
                this.scrollX =  this.maxX;
                this.x =  this.maxX
            }
            
            if(this.scrollY > this.maxY) {
                this.scrollY =  this.maxY;
                this.y =  this.maxY
            }
            
            //计算下拉加载触发点
            if(this.pullDown) {
               this.pullDownPoint =  -this.$refs.pull.clientHeight
            }
            

        },
        //计算touch结束后的滑动速度
        calcMoveSpeed() {
            let touchList = this.touchMoveList;
            this.touchMoveList = [];
            let num = touchList.length
            if(num > 20) {
                touchList = touchList.slice(num-20, num)
            }
            let last = touchList.length-1;
            let first = 0;
            for(let i = last; i >= 0; i--) {
                if(touchList[last].time-touchList[i].time > this.speed) {
                    console.log(touchList[last].time-touchList[i].time);
                    console.log(i);
                    break
                }
                first = i;
            }
            let x= touchList[last].x-touchList[first].x 
            let y = touchList[last].y-touchList[first].y
            if(this.pattern === 'vertical' &&  this.direction === 'vertical' ) {
                x = 0;
            }
            return {
                x: touchList[last].x-touchList[first].x,
                y: touchList[last].y-touchList[first].y
            }
        }
    }
}