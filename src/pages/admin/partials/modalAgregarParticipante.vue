<template>
    <modal ref="modalAgregarParticipante" titulo="AÑADIR PARTICIPANTE" no-aceptar adicional="Añadir" @adicional="handleSave">
        <div class="row mx-0 j-center">
            <div class="col-11">
                <div class="my-4">
                    <p class="f-14 fk-medium">Nombre</p>
                    <el-input v-model="model.nombre" class="w-100" placeholder="Nombre" />
                </div>
                <div class="my-4">
                    <p class="f-14 fk-medium">Contraseña</p>
                    <el-input v-model="model.cargo" class="w-100" placeholder="Cargo" />
                </div>
                <div>
                    <el-checkbox v-model="model.lider">
                        Seleccionar participante como líder de la tribu
                    </el-checkbox>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    data() {
        return {
            model: {
                nombre: '',
                cargo: '',
                lider: false,
            }
        }
    },
    methods: {
        toggle() {
            this.$refs.modalAgregarParticipante.toggle();
        },
        handleSave() {
            this.$refs.modalAgregarParticipante.toggle();
        },
        reset() {
            this.model = {
                nombre: '',
                cargo: '',
                lider: false,
            }
        }
    }
}
</script>