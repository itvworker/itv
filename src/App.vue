<template lang="html">
    <router-view />
</template>

<script>

import Router from 'vue-router'
export default {
    mounted() {
        document.body.addEventListener("focusin", () => {
            // 软键盘弹出的事件处理
             if (
                document.activeElement.tagName === "INPUT" ||
                document.activeElement.tagName === "TEXTAREA"
            ) {
                setTimeout(() => {
                    // document.activeElement.scrollIntoView();
                    document.activeElement.scrollIntoViewIfNeeded(true);
                }, 300);
            }
      
        });
        
    },
    watch: {
        $route(n) {
         
        }
    },
    methods: {
        changeRoute(value, content) {
          
        },
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
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
#app {
    background-color: @itv-page-white;
}
</style>
