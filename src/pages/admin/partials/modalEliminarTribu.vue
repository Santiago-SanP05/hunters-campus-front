<template>
    <modal ref="modaEliminarTribu" titulo="ELIMINAR TRIBU" no-aceptar adicional="ELIMINAR" @adicional="handleSave">
        <div class="row mx-0 j-center">
            <div class="col-8 px-0">
                <p class="f-18 text-center fk-regular my-4">
                    ¿Deseas eliminar esta tribu de Hunters?
                </p>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        toggle() {
            this.$refs.modaEliminarTribu.toggle();
        },
        handleSave() {
            this.toggle()
        },
    }
}
</script>