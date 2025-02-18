<template>
    <modal
    ref="modalConfirmar"
    :titulo="titulo"
    :no-guardar="noGuardar || eliminar"
    :eliminar="eliminar"
    :adicional="adicional"
    @guardar="guardar"
    @eliminar="accionEliminar"
    @adicional="onAdicional"
    >
        <div class="container">
            <div class="row my-3 text-muted f-14 justify-center text-center px-3">
                {{ mensaje }}
            </div>
            <slot />
        </div>
    </modal>
</template>

<script>
export default {
    props: {
        titulo: {
            type: String,
            default: ''
        },
        mensaje: {
            type: String,
            default: ''
        },
        eliminar: {
            type: Boolean,
            default: false
        },
        adicional: {
            type: String,
            default: ''
        },
        noGuardar: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toggle(){
            this.$refs.modalConfirmar.toggle()
        },
        guardar(){
            this.$emit('guardar')
            this.toggle()
        },
        accionEliminar(){
            this.$emit('eliminar')
            this.toggle()
        },
        onAdicional(){
            this.$emit('adicional')
            this.toggle()
        }
    }
}
</script>
