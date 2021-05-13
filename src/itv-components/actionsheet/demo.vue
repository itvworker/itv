<template>
    <itv-container class="page-dialog">
        <itv-header>Actionsheet</itv-header>
        <itv-main>
            <div class="h10"></div>
          
                <itv-cell
                    @click="open"
                    title="插件模式"
                    isLink
                    :desc="text"
                    showIcon
                >
                </itv-cell>
                <itv-cell
                    @click="open1"
                    title="组件模式调用"
                    isLink
                    :desc="text1"
                    showIcon
                   
                >
                </itv-cell>
                
        </itv-main>
        <itv-actionsheet v-model="actionState" :items="items"  teleport @confirm="confirm" />
        
    </itv-container>

</template>

<script>


export default {
    data() {
        return {
            show: false,
            actionState: false,
            text:"选项一",
            text1:"组件选项一",
           
            items:[
                    {
                        text:'组件选项一'
                    },
                    {
                        text:'组件选项二'
                    },
                    {
                        text:"组件选项三"
                    }
                ]

        };
    },
    methods: {
        open() {
            this.$itv.actionsheet.show({
                items:[
                    {
                        text:'选项一'
                    },
                    {
                        text:'选项二'
                    },
                    {
                        text:"选项三"
                    }
                ],
                onConfirm:(item)=> {
                    this.text =  item.text;
                }
            })
        },
        open1() {
            this.actionState = true;
        },
        confirm(item)  {
            this.text1 = item.text;
        }
        
    },
    mounted() {}
};
</script>

<style lang="less" scoped>
.page-dialog {
    .page-content {
        display: none;
    }
}
.demo {
    padding-left: 0;
    padding-right: 0;
}
h4 {
    padding: 0 10px;
}
</style>
