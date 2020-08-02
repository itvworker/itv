<template>
    <label class="itv-label">
        <div class="itv-label-title">
            {{label}}
        </div>
        <div class="itv-label-content">
            <slot />
        </div>
    </label>
</template>

<script>
    export default {
        name: 'itv-label',
        props: {
            label: {
                type: String,
                defaut: ''
            },
            prop: {
                type: String,
                defaut: ''
            }
        },
        data(){
            return{
                name:'itv-label'
            }
        },
        methods:{
            vaildate(value, type) {

            }
        }
    }
</script>

<style lang="less">
</style>
