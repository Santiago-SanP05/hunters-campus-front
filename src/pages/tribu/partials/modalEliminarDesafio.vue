<template>
    <modal ref="modaEliminarDesafio" titulo="ELIMINAR DESAFIO" no-aceptar adicional="ELIMINAR" @adicional="eliminarDesafio">
        <div class="row mx-0 j-center">
            <div class="col-8 px-0">
                <p class="f-18 f-400">
                    Debes ser el lider creador de este desafío para poder eliminarlo, Ingresa tu contraseña de líder.
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
            this.$refs.modaEliminarDesafio.toggle();
        },
        eliminarDesafio() {
            this.$emit('eliminar',this.password)
        },
        reset() {
            this.password = ''
        }
    }
}
</script>