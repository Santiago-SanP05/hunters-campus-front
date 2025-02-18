<template>
    <modal ref="modalAceptarDesafio" titulo="ACEPTAR DESAFIO" no-aceptar adicional="ACEPTAR" @adicional="aceptarDesafio">
        <div class="row mx-0 j-center">
            <div class="col-8">
                <p class="f-18 f-400">
                    Ingresa tu contraseña de líder para aceptar el desafio
                </p>
                <p class="label-mini mt-4 f-600">
                    Contraseña
                </p>
                <el-input v-model="password" type="password" placeholder="Contraseña" class="w-100" />
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    data() {
        return {
            password: ''
        }
    },
    methods: {
        toggle() {
            this.$refs.modalAceptarDesafio.toggle();
        },
        aceptarDesafio() {
            this.$emit('aceptar',this.password)
        },
        reset() {
            this.password = ''
        }
    }
}
</script>