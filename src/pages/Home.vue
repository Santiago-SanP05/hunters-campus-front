<template>
    <section class="home scroll-none overflow-auto pt-3" style="height:calc(100vh - 100px)">
        <banners-shields />
        <tabs :tabs="rutas" class="pl-5" />
        <router-view />
    </section>
</template>

<script>
export default {
    data() {
        return{
            rutas: [
                { titulo: 'DESAFÍOS DISPONIBLES', ruta: 'home.desafios-disponibles' },
                { titulo: 'DESAFÍOS PROGRAMADOS', ruta: 'home.desafios-programados' },
                { titulo: 'DESAFÍOS FINALIZADOS', ruta: 'home.desafios-finalizados' },
                { titulo: 'TORNEOS ESPECIALES', ruta: 'home.eventos-especiales' },
                { titulo: 'OTROS PUNTOS', ruta: 'home.puntos-otros-eventos' },
                { titulo: 'VENTAS', ruta: 'home.ventas'}
            ]
        }
    }
}
</script>