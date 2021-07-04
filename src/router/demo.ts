export default [
    {
        path:'/demo',
        name:'demoIndex',
        component: () => import('@/views/demo/index.vue'),
        redirect:{
            name: 'demoEnter'
        },
        children:[
            {
                path: 'index',
                name: 'demoEnter',
                component: () => import('@/views/demo/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'iTV',
                },
            },
            {
                path: 'cliper',
                name: 'demoCliper',
                component: () => import('@/components/cliper/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'iTV',
                },
            },
            {
                path: 'view-video',
                name: 'demoViewVideo',
                component: () => import('@/components/view-video/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'iTV',
                },
            },
            {
                path: 'schedule',
                name: 'demoSchedule',
                component: () => import('@/components/schedule/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'iTV',
                },

            }
        ]
    },  
    

]
