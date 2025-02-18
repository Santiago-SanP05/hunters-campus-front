<template>
    <modal ref="modalCreateTribe" titulo="CREAR TRIBU" tamano="modal-md" no-aceptar adicional="CREAR" @adicional="handleSave">
        <div class="row mx-0">
            <div class="col-auto">
                <p class="f-14 fk-medium text-center mb-2">Logo de la tribu</p>
                <slim-cropper ref="fotoTribu" :options="slimOptions" class="border cr-pointer wf-112px h-112px bg-f5 rounded-circle" />
            </div>
            <div class="col">
                <div class="mb-4">
                    <p class="f-14 fk-medium">Nombre</p>
                    <el-input v-model="model.nombre" class="w-100" placeholder="Nombre" />
                </div>
                <div class="mb-4">
                    <p class="f-14 fk-medium">Contraseña</p>
                    <el-input v-model="model.password" class="w-100" placeholder="Contraseña" />
                </div>
            </div>
        </div>
        <div class="row mx-0">
            <div class="col-12">
                <p class="f-14 fk-medium pl-3 mb-2">Selecciona un color para la tribu</p>
                <div class="d-middle" style="gap:0.25rem">
                    <div v-for="(data, index) in colors" :key="index" class="d-middle-center wh-32 cr-pointer" :style="`background-color: ${data}`" @click="getColor(data)">
                        <i :class="`${ model.colorSelected == data ? 'icon-check' : '' } `" />
                    </div>
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
                img: '',
                nombre: '',
                password: '',
                colorSelected: '',
            },
            slimOptions: {
                ratio: '1:1',
                label:'',
                buttonCancelLabel: 'Cancelar',
                buttonConfirmLabel: 'ok',
                buttonUploadLabel: 'Ok',
            },
            colors: ["#92D050", "#00B050", "#FFDD53", "#FF9100", "#FF3333", "#C00000", "#FF297E", "#B37BDC", "#803BB4", "#2F5597", "#0090FF", "#A5A5A5",],
        }
    },
    methods: {
        toggle(item) {
            if (item) {
                this.model =  {
                    img: '',
                    nombre: item.nombre,
                    password: '',
                    colorSelected: item.color,
                }
            }
            this.$refs.modalCreateTribe.toggle();
        },
        getColor(color) {
            this.model.colorSelected = color
        },
        handleSave() {
            this.model.img = this.$refs.fotoTribu.instanciaCrop.dataBase64.output
            //console.log("🚀 ~ file: modalCrearTribu.vue:61 ~ handleSave ~ this.model.img:", this.model.img)
            this.$refs.modalCreateTribe.toggle();
        },
        reset() {
            this.model = {
                img: '',
                nombre: '',
                password: '',
                colorSelected: '',
            }
        }
    }
}
</script>