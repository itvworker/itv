<template lang="html">
    <itv-container class="seciton">
        <div class="itv-bar">
            <div class="itv-logo">
                iTV
            </div>
            <div class="nav">
                <div class="nav-item">
                    介绍
                </div>
                <div class="nav-item">
                    组件
                </div>
                <div class="nav-item">
                    主题
                </div>
                <div class="nav-item">
                    发布日志
                </div>
                <div class="nav-item">
                    捐赠、赞助
                </div>
            </div>
        </div>
        <router-view />
    </itv-container>
</template>

<script>
export default {
    mounted() {
        
        console.log('weeewrewr------');
    }
}
</script>

<style lang="less" scoped>
.itv-bar{
    height: 80px;
    min-height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom:#ddd solid 1px;
    .itv-logo{
        height: 80px;
        font-size: 40px;
        line-height: 80px;
        color: @itv-page-main;
    }
    .nav{
        display: flex;
        font-size: 14px;
        .nav-item{
            padding: 10px;
        }
    }
   
}
.seciton{
    max-width: 1200px;
    margin: auto;
    
}

</style>
