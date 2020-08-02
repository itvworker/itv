export default [
    {
    path: '/doc/index',
    name: 'itv_doc_index',
    component: () => import ('@/pages/doc.vue'),
    meta: {
        keepAlive: false,
        title: '首页'
        }
    },
    {
    path: '/doc/cliper',
    name: 'itv_doc_cliper',
    component: () => import ('@/components/cliper/doc.vue'),
    meta: {
        keepAlive: false,
        title: '首页'
        }
    }
]
