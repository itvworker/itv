<template>
    <itv-container class="page-dialog">
        <itv-header>scroller-calender</itv-header>
        
        <itv-main>
           <itv-scroller-calendar pattern="flex" :weekType="1" />
        </itv-main>
    </itv-container>
</template>

<script>

export default {
    components: {
    },
    data() {
        return {
          list:[],
          columnIndex: 0  
        }
    },
    computed: {
        tabIndex() {
            let index = parseInt(this.$route.query.index)
            return index || 0
        }
    },
    methods: {
        changeList(size, page) {
            for(let i = 0; i <= size; i++) {
                this.list.push({
                    name: '测试一下内容条数'
                })
            }
        },
        scroll(obj) {
            // console.log(`scroll:{ x: ${obj.x}, y: ${obj.y} }`);
        },
        stopscroll(obj) {
            // console.log(`stopscroll:{ x: ${obj.x}, y: ${obj.y} }`);
            
        },
        refersh() {
            console.log('下拉刷新');
            //    setTimeout(()=>{
                
            //        this.$refs.scroller.refresh()
            //    },3000)
        },
        changeTab(index) {
            if(this.tabIndex === index) return
            let name = this.$route.name;
            this.$router.replace({
                name: name,
                query: {
                    index: index
                }
            })
        } 
    },
    created() {
        this.changeList(50,1)
    },
    mounted() {
       
    }

};
</script>

<style lang="less" scoped>

</style>


 