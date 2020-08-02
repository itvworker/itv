<template lang="html">
    <itv-container class="doc-page">
        
        <div v-html="doc"></div>
        <div class="phone-show"  >
            <iframe :src="url"></iframe>
        </div>

    </itv-container>
</template>

<script>
import doc from '@/components/doc.js'
import html from '@/doc/doc.js'
export default {
    computed:{
        doc() {
            let name = this.$route.query.page
            let msg = new html(doc[name]).getHtml()
            return msg
        },
        url() {
            let name = this.$route.query.page
            return `/#/demo/${name}`
        }
    },
    updated() {
        this.hljs();
    },
    mounted() {
        this.hljs();
    }
}
</script>

<style lang="css" scoped>
</style>
