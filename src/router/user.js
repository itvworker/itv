export default [{
            path: '/',
            name: 'index',
            component: () => import ('@/pages/index.vue'),
            meta: {
                keepAlive: false,
                title: '课程分类'
            }
        }]
