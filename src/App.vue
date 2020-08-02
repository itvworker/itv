<template lang="html">
       <router-view />
</template>

<script>
import $ from 'jquery'
export default {
    mounted() {
        $(document).on('click','.doc-tab-group>.tab-item-btn', function(e){
            e.stopPropagation();
            let index = $(this).index();
            $(this).parent().find('.tab-item-btn').removeClass('active')
            $(this).addClass('active')
            let html = $(this).parent().next().children()
            html.hide()
            html.eq(index).show()
        })
        if(this.IsPC()) {
            $('html').css('font-size', '37.5px')
        }
    },
    methods: {
        IsPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                        "SymbianOS", "Windows Phone",
                        "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }

    }
}
</script>
<style lang="less">
body,html{
    padding: 0px;
    margin: 0px;
    height: 100%;
}
#app {
    background-color: @itv-page-white;
}
</style>
