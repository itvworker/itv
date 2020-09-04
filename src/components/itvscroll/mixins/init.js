import render from '../../../libs/render'
export default {
    mounted() {
        this.scrollRender =  render(this.$refs.scroller);
        this.scrollXRender = render(this.$refs.x);
        this.scrollYRender = render(this.$refs.y);
        this.calcMax()
    },
    
    methods: {

        //下拉加载复位
        refresh() {
            if(this.scrollY < 0) {
                this.scrollTo(this.scrollX, 0, 1.5)
            }
        }
    }
}