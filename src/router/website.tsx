export default [
    {
        path:'/',
        name:'Home',
        redirect:{
            name: 'index'
        },
    },
    { 
        path: '/website',
        name: 'index',
        component: () => import('@/views/index.vue'),
        redirect:{
            name: 'about'
        },
        children:[
            { path: 'about', name:'about' ,component: () => import('@/views/about.tsx')},
            { path: 'components/:id', name:'components' , component: () => import('@/views/components.vue')},
        ]
    }
]