import render from '../../../libs/render'
export default {
    mounted() {
        this.scrollRender =  render(this.$refs.scroller);
        this.scrollXRender = render(this.$refs.x);
        this.scrollYRender = render(this.$refs.y);
        this.calcMax()
    },
    
    methods: {
        
    }
}