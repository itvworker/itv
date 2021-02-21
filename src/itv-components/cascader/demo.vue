<template>
    <itv-container class="page-dialog">
        <itv-header>dialog</itv-header>
        <itv-main>
            <div class="h10"></div>
            <section>
                <cell
                    @click="open"
                    :showIcon="true"
                    title="地址"
                    :desc="comvalue"
                >
                </cell>
                <cell
                    :isLink="true"
                    @click="plugin('html')"
                    :showIcon="true"
                     subTitle="无默认值"
                    title="插件方式调用"
                    :desc="plugin1Content"
                >
                </cell>
                <cell
                    :isLink="true"
                    @click="plugin2('html')"
                    :showIcon="true"
                    title="插件方式调用"
                    subTitle="有默认值"
                    :desc="plugin2Content"
                >
                </cell>
            </section>

        </itv-main>
        <cascader v-model="show"
         :selected="comSelected"
         :items="items"
         @confirm="comConfirm"
            ></cascader>
    </itv-container>

</template>

<script>
import Cascader from './index.vue'
import area from './area.js'
export default {
    components: {
        Cascader
    },
    data() {
        return {
            show: false,
            items: area,
            selected:[420000,421100,421123],
            plugin1Selected:[],
            plugin1Content:"请选择地区",
            plugin2Selected:[420000,421100,421123],
            plugin2Content:"湖北省黄冈市罗田县",
            comvalue:"请选择地区",
            comSelected:[]
                
        };
    },
    methods: {
        open() {
            this.show = true;
            
        },
        comConfirm(msg) {
           this.comvalue="";
           this.comSelected = msg.map(element => {
               this.comvalue+=element.name;
               return element.id
           });
        },
        plugin(value) {
            this.$itv.cascader.show({
                items: this.items,
                selected:this.plugin1Selected,
                onConfirm:(res)=>{
                    this.plugin1Content = ""
                    this.plugin1Selected=res.map((item)=>{
                        this.plugin1Content+=item.name
                        return item.id
                    })
                }
            });
        },
        plugin2(value) {
            this.$itv.cascader.show({
                items: this.items,
                selected:this.plugin2Selected,
                onConfirm:(res)=>{
                    this.plugin2Content = ""
                    this.plugin2Selected=res.map((item)=>{
                        this.plugin2Content+=item.name
                        return item.id
                    })
                }
            });
        },
        page() {
            
        },
        manageData() {
          
        },
    },
    mounted() {
      
    }
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
