<template>
    <section class="container-fluid">
        <tabs :tabs="rutas" class="pl-4" />
        <router-view class="mt-4" />
    </section>
</template>

<script>
export default {
    layout: 'admin',
    data() {
        return {
            rutas: [
                { titulo: 'TRIBUS', ruta: 'admin.tribus' },
                { titulo: 'PREMIOS', ruta: 'admin.premios' },
            ],
            prueba: this.$route.name
        }
    },
}
</script>

<style>

</style>