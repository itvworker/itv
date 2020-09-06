import render from '../../../libs/render'
export default {
    mounted() {
        this.scrollRender =  render(this.$refs.scroller);
        
        if(this.scrollXel) {
            this.scrollXRender = render(this.$refs.x);
        }
        if(this.scrollYel) {
            this.scrollYRender = render(this.$refs.y);
        }
        if(this.showScrollBar === true) {
            this.scrollBarYRender = render(this.$refs.barY);
        }
        this.calcMax()
    },
    
    methods: {
        
        //下拉加载复位
        refresh() {
            if(this.scrollY < 0) {
                this.scrollTo(this.scrollX, 0, 1.5);
            }
            this.isTriggerPullDown = false
        }
    }
}