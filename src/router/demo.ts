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
            }
        ]
    },  
    

]
