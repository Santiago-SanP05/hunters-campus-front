export default [
    {
        path: '/configurar',
        name: 'configurar',
        redirect: {name: 'configurar.banners'},
        component: () => import(/* webpackChunkName: "configurar" */ '../../pages/configurar').then(m => m.default || m),
        children: [
            {
                path: 'banners',
                meta: { nombre: 'Configurar banners' },
                name: 'configurar.banners',
                component: () => import(/* webpackChunkName: "configurar" */ '../../pages/configurar/banners').then(m => m.default || m),
            },
        ]
    }
]
