<template lang="html">
    <div class="itv-flow" @click="$emit('click')">
        <div class="line-circle-box" :class="[lineClass]">
            
        </div>
        <div class="flow-content" >
            <div class="flow-slot">
                <slot></slot>
            </div>
            
        </div>
    </div>

</template>

<script>
export default {
    name:'itv-flow',
    props: {
       

    },
    computed: {
      
    },
    data() {
        return {
            content: '',
            lineClass:''
        }
    },
    watch: {
        
    },
    updated() {
        this.init();
    },
    methods: {
       init() {
           let prev = this.$el.previousElementSibling;
           let next = this.$el.nextElementSibling;
           if (!next || next.className.indexOf('itv-flow') < 0) {
               this.lineClass = 'none';
               return
           }
           this.lineClass = null;

       }
    },
    mounted() {
        this.init();
    }

}
</script>


<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-flow.less';
</style>
