<template>
    <modal ref="modalAgregarPremio" titulo="AÑADIR PREMIO" tamano="modal-md" no-aceptar adicional="AÑADIR" @adicional="handleSave">
        <div class="row mx-0">
            <div class="col-12">
                <p class="f-14 fk-medium text-center mb-2">Imagen del premio</p>
                <slim-cropper ref="fotoTribu" :options="slimOptions" class="border cr-pointer wf-212px h-122px bg-f5 mx-auto" />
            </div>
            <div class="col-12 mt-4">
                <p class="f-14 fk-medium">Nombre</p>
                <el-input v-model="model.nombre" class="w-100" placeholder="Nombre" />
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    data() {
        return {
            model: {
                img: '',
                nombre: '',
            },
            slimOptions: {
                ratio: '1:1',
                label:'',
                buttonCancelLabel: 'Cancelar',
                buttonConfirmLabel: 'ok',
                buttonUploadLabel: 'Ok',
            },
        }
    },
    methods: {
        toggle(item) {
            if (item) {
                this.model =  {
                    img: '',
                    nombre: item.nombre,
                }
            }
            this.$refs.modalAgregarPremio.toggle();
        },
        handleSave() {
            this.model.img = this.$refs.fotoTribu.instanciaCrop.dataBase64.output
            //console.log("🚀 ~ file: modalCrearTribu.vue:61 ~ handleSave ~ this.model.img:", this.model.img)
            this.$refs.modalAgregarPremio.toggle();
        },
        reset() {
            this.model = {
                img: '',
                nombre: '',
            }
        }
    }
}
</script>