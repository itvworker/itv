<template></template>
<script>
export default {
    props: {
        value:{
            value: Object,
            defalut: ()=>{}
        }
       
    },
    inject:['itvScroller'],
    mounted() {
        setTimeout(()=>{
            console.log(this.itvScroller);
        },1000)
        this.$emit('input', this.itvScroller)
    },
    methods: {
        
    }
}
</script>
