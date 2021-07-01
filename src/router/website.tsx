export default [
    { 
        path: '/website',
        name: 'index',
        component: () => import('@/views/index.vue'),
        children:[
            { path: 'about', name:'about' ,component: () => import('@/views/about')},
        ]
    },
    
]