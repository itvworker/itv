
<script> 
export default {
    props:{
        item: {
            type: Function,
            default: (h,item)=>{
                return (
                    <div class="name">
                        {item.name} 
                        {item.index}
                    </div>
                )
            }
        }
    },
    components: { },
    data(){
        return{
            name:[{
                name: "name",
                index:1
            },{
                name:"your",
                index:2
            }]
        }
    },
    methods:{
        
    },
    mounted() {
        
    },
   
    render(h) {
     
       return (
        <itv-container>
            <itv-header>jsx</itv-header>
            {
                this.name.map((item)=>{
                    return this.item(h, item)
                })
            }
        </itv-container>
       )
    }
}
</script>

<style lang="less">

</style>
