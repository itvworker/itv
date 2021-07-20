<template>
    <div class="itv-expansion-tile">
        <slot name="title">
            <div class="itv-expansion-bar" @click.stop="toggle('bar')">
                <div class="left-title" v-html="title">
                    
                </div>
                <div class="right-title" :value="true"   @click.stop="toggle('icon')">
                    <span v-show="!currentValue">{{unfoldText}}</span>
                    <span v-show="currentValue">{{shrinkText}}</span>
                  
                    <span  :class="[iconClassName,{'rotate-icon': currentValue}]"></span>
                </div>
            </div>
        </slot>
        <div class="itv-expansion-tile-toggle" :style="{height: currentValue? height+'px':minHeight+'px', 'margin-top': currentValue? null:minHeight+'px'}">
            <div class="itv-expansion-height" ref="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"itv-expansion-tile",
    props: {
        value: {
            type: Boolean,
            default: false
        },
        unfoldText: {
            type: String,
            default: '展开'
        },
        title: {
            type: String,
            default: null
        },
        shrinkText: {
            type: String,
            default: '收起'
        },
        isClickAll: {
            type: Boolean,
            default: false
        },
        iconClassName: {
            type: String,
            default: 'icon-arrow-up'
        },
        minHeight: {
            type: Number,
            default: 0
        }
            
    },
    watch: {
        currentValue(n) {
            this.$emit('input', n)
        },
        value(n) {
            this.currentValue = n;
            if(n) {
                this.height = this.$refs.content.clientHeight;
            }
        }
    },
    data() {
        return {
            currentValue: this.value,
            height: null
        }
    },
    mounted() {
        this.height = this.$refs.content.clientHeight;
    },
    methods: {
       toggle(value) {
            if((this.isClickAll && value ==='bar') || value ==='icon'){
                this.currentValue = !this.currentValue;
            }
       }
    }
}
</script>
<style lang="less" scoped>
@import 'itv-expansion-tile.less';
</style>
