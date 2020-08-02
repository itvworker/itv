export default [
    {
    path: '/',
    name: 'itv_home',
    component: () => import ('@/pages/index.vue'),
    meta: {
        keepAlive: false,
        title: '首页'
    },
    {
    path: '/packages/picker',
    name: 'itv_picker',
    component: () => import ('@/components/picker/demo.vue'),
    meta: {
        keepAlive: false,
        title: '课程分类'
    }
}]
