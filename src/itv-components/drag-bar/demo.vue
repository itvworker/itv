<template>
    <itv-container class="page-dialog">
        <itv-header>dialog</itv-header>
        <itv-main >
            <itv-drag-outer  ref="drag" @onStart="record" @onEnd="finish" @onTouchend="touchend">
                <transition-group name="flip-list" tag="p">
                    <itv-drag-bar pattern="vertical"   class="dragbar-bottom"   v-for="(item, index) in list" :index="index" :key="item.id" :id="item.id">
                        <itv-cell :showIcon="true" :title="'中间弹出'+item.id" @click="show=true"  desc="中间弹出" />
                    </itv-drag-bar>
                </transition-group>
            </itv-drag-outer>
        </itv-main>
    </itv-container>

</template>

<script>

export default {
  
    data() {
        return {
            show:false,
            bottomShow: false,
            topshow: false,
            leftshow:false,
            rightshow: false,
            dragData: {},
            list: []
        };
    },
  
    methods: {
        initlist() {
            let arr = [];
            for(let i = 0; i < 50; i++) {
                arr.push({
                    name: "测试数据",
                    id: i
                })
            }
            this.list =  arr;
        },
        record(index, id) {
            this.dragData = {
                index: index,
                id: id
            }
        },
        finish(index, id) {
            let now = this.list[index];
            let pass = this.list[this.dragData.index];
            this.$set(this.list, index, pass);
            this.$set(this.list, this.dragData.index, now);            
            this.$nextTick(()=>{
                this.$refs.drag.restart();
            })
        },
        touchend() {
            console.log('touchend');
        },
        open() {
            this.show = true
        },
        plugin(value) {
            if(value){
                this.$itv.dialog.show({
                    html: 'weg'
                })
            }else{
                this.$itv.dialog.show({
                    html: this.$refs.page
                })
            }

        },
        page() {
            console.log('page------');
        }
    },
    mounted() {
        this.initlist()
    }
};
</script>

<style lang="less" scoped>
.page-dialog {
    user-select:none;
}
.dragbar-bottom {
    &.itv-drag-moved{
        background-color:fade(@itv-page-main, 10%);
    }
    &.itv-drag-active {
        background-color: #fff;
        box-shadow: rgba(0,0,0,0.6) 0 0 16ipx;
    }
    &.itv-drag-letgo{
        background-color: #ddd;
    }
}
.page-dialog {
    .page-content{
        display: none;
    }
}

.flip-list-move {
  transition: transform 500ms;
}
</style>
