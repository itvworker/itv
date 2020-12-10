<template>
    <itv-container>
        <itv-header>ITV</itv-header>
        <itv-main>
            <section class="demo-content">
                <div class="dot-link" v-for="item in navs" @click.stop="topage(item)">
                    <i :class="item.icon"></i>
                    <div class="name">{{item.name}}</div>
                </div>
            </section>
            <img :src="imageUrl" />

            
        </itv-main>    
    </itv-container>

</template>

<script>
import layout from './layout'
import html2img from  '../../tool/html2img.js'
export default {
    mixins:[layout],
    data() {
        return {
            show: false,
            imageUrl:""
        };
        
    },
    methods: {
        open() {
            this.show = true;
        },
        plugin(value) {
            this.$itv.popup.confirm({
                html: "weg",
                hideOnClick: true,
                text: ""
            });
        },
        topage(item) {
            this.$router.push({
                name: item.routerName
            })
        }
    },
    mounted() {
        

       
        let styles = document.querySelectorAll('style');

        let str = `<div class="header-title">你是谁</div>`
        let divText = document.createElement('div')
        divText.innerHTML = str

        let style =`<style type="type/css">.header-title{font-size:1000px;}</style>`
        let styleText = document.createElement('div')
        styleText.innerHTML = style;


        let str1= new XMLSerializer().serializeToString(divText); 

         let htmlSvg = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">'+
         '<foreignObject x="0" y="0" width="100%" height="100%">'
               +str1+styleText.innerHTML+'</foreignObject></svg>';

            console.log(htmlSvg);
            //  htmlSvg = htmlSvg.replace(/\n/g, '').replace(/\t/g, '').replace(/#/g, '%23');
            
            // let xmls = new XMLSerializer().serializeToString(this.$el)
        
       
        this.imageUrl = htmlSvg
    }
};
</script>

<style lang="less" scoped>
.demo-content {
    display: flex;
    flex-wrap: wrap;
    .dot-link{
        height: 100ipx;
        flex: 0 0 auto;
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 16ipx;
        border-right: #ddd solid 1px;
        border-bottom: #ddd solid 1px;
        box-sizing: border-box;
        .name{
            line-height: 40ipx;
        }
        i{
            color:@itv-page-main;
        }
        &:nth-child(4n) {
            border-right: #ddd solid 0px;
        }
    }
}

</style>
