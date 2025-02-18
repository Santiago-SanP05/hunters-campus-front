export default [
    {
        path: '/',
        name: 'home',
        component: ()=>import('../pages/Home.vue').then(m=>m.default || m),
        redirect: {name: 'home.desafios-disponibles'},
        children: [
            {
                path: '/desafios-disponibles',
                name: 'home.desafios-disponibles',
                component: ()=>import('../pages/home/desafiosDisponibles').then(m=>m.default || m),
            },
            {
                path: '/desafios-programados',
                name: 'home.desafios-programados',
                component: () => import('../pages/home/desafiosProgramados').then(m=>m.default || m),
            },
            {
                path: '/desafios-finalizados',
                name: 'home.desafios-finalizados',
                component: ()=>import('../pages/home/desafiosFinalizados').then(m=>m.default || m),
            },
            {
                path: '/puntos-otros-eventos',
                name: 'home.puntos-otros-eventos',
                component: ()=>import('../pages/home/otrosEventos').then(m=>m.default || m),
            },
            {
                path: '/eventos-especiales',
                name: 'home.eventos-especiales',
                component: () => import('../pages/home/eventosEspeciales').then(m=>m.default || m),
            },
            {
                path: '/ventas',
                name: 'home.ventas',
                component: ()=>import('../pages/tribu/ventas').then(m=>m.default || m),        
            }
        ]
    },
    {
        path: '/tribu/:id_tribu',
        name: 'tribu.ver',
        component: ()=>import('../pages/tribu').then(m=>m.default || m),        
    },
    {
        path: '/crear-desafio',
        name: 'crear-desafio',
        component: ()=>import('../pages/tribu/crearDesafio').then(m=>m.default || m),        
    },
    {
        path: '/editar-desafio/:id_desafio',
        name: 'editar-desafio',
        component: ()=>import('../pages/tribu/editarDesafio').then(m=>m.default || m),        
    },
    {
        path: '/desafio/:id_desafio',
        name: 'desafio.detalle',
        component: ()=>import('../pages/tribu/desafios').then(m=>m.default || m),        
    },
    {
        path: '/declarar-ganador/:id_reto',
        name: 'declarar-ganador',
        component: ()=>import('../pages/tribu/declararGanador').then(m=>m.default || m),        
    },
    {
        path: '/puntos/:id_punto',
        name: 'puntos.detalle',
        component: ()=>import('../pages/tribu/puntosEventos').then(m=>m.default || m),        
    },
    {
        path: '/manual-puntos',
        name: 'manual-puntos',
        component: ()=>import('../pages/tribu/otorgarPuntos').then(m=>m.default || m),        
    },
    {
        path: '/crear-torneo',
        name: 'crear-tornedo',
        component: ()=>import('../pages/tribu/crearTorneo').then(m=>m.default || m),        
    },
    {
        path: '/editar-torneo/:id_torneo',
        name: 'editar-tornedo',
        component: () => import('../pages/tribu/editarTorneo').then(m => m.default || m),
    },
    {
        path: '/torneo/:id_torneo',
        name: 'torneo',
        component: ()=>import('../pages/tribu/torneo').then(m=>m.default || m),        
    },
    {
        path: '/actualizar-puntuacion/:id_torneo',
        name: 'actualizar-puntuacion',
        component: ()=>import('../pages/tribu/actualizarPuntuacion').then(m=>m.default || m),        
    },
    {
        path: '/torneos-puntos/:id_torneo',
        name: 'torneo-puntos',
        component: ()=>import('../pages/tribu/torneosPuntos').then(m=>m.default || m),        
    },
    // admin
	{
        path: '/admin',
        name: 'admin',
        component: ()=>import('../pages/admin/index').then(m=>m.default || m),
		redirect: {name: 'admin.tribus'},
		children: [
			{
                path: 'tribus',
                name: 'admin.tribus',
                component: () => import('../pages/admin/tribus').then(m=>m.default || m),
            },
            {
                path: 'premios',
                name: 'admin.premios',
                component: () => import('../pages/admin/premios').then(m=>m.default || m),
            },
		]
    },
    /* {
        path: '/error',
        name: 'error',
        component: ()=>import('../pages/error').then(m=>m.default || m),        
    } */

]
