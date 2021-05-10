
<script> 
export default {
    
    components: { },
    data(){
        return{
            name:['name','you']
        }
    },
    methods:{
        
    },
    mounted() {
        
    },
   
    render(h) {
      console.log(this.name);
       return (
        <itv-container>
            <itv-header>jsx</itv-header>
            {
                this.name.map((item)=>{
                    return <div class={'header '+item} >{item}</div>
                })
            }
        </itv-container>
       )
    }
}
</script>

<style lang="less">

</style>
