<template>
    <div
    ref="modalEliminar"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    >
        <div
        class="modal-dialog modal-dialog-centered"
        :class="tamano ? tamano : ''"
        role="document"
        >
            <div class="modal-content">
                <div class="modal-header mb-1" style="background-image: url('https://i.pinimg.com/736x/1c/27/d7/1c27d7cff2c7263ea6d14d875bcc9394.jpg')">
                    <img class="img-tipo" width="88" src="/img/modales/trash.svg" alt="" />
                    <div class="ml-auto my-auto d-middle-center bg-white rounded-circle" style="width:20px;height:20px;">
                        <i class="icon-cancel-circled f-20 cr-pointer text-gr-general" data-dismiss="modal" />
                    </div>
                </div>
                <div class="modal-body overflow-auto custom-scroll" style="max-height:70vh;">
                    <div class="container">
                        <!-- <img src="" alt="" /> -->
                        <div class="row my-3 mt-5 text-muted f-14 f-600 justify-center text-center px-3">
                            {{ titulo }}
                        </div>
                        <div class="row my-3 text-muted f-14 justify-center text-center px-3">
                            {{ mensaje }}
                        </div>
                        <div class="row mx-0 bg-linea" />
                    </div>
                </div>
                <div class="row mx-0 justify-center pb-3">
                    <button
                    type="button"
                    class="btn mx-2 bg-whitesmoke br-10"
                    @click="cancelar"
                    v-text="textosBotones.cancelar"
                    />
                    <button
                    v-loading="cargando"
                    type="button"
                    class="btn mx-2 btn-aceptar text-white br-10"
                    @click="actionEliminar"
                    v-text="textosBotones.aceptar"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        titulo: {
            type: String,
            default: ''
        },
        btns: {
            type: Array,
            default: () => { return [] }
        },
        cargando: {
            type: Boolean,
            default: false
        },
        mensaje: {
            type: String,
            default: ''
        },
        tamano: {
            type: String,
            default: ''
        },
    },
    data(){
        return {
            textosBotones: {
                listo: 'Listo',
                aceptar: 'Aceptar',
                guardar: 'Guardar',
                eliminar: 'Eliminar',
                cancelar: 'Cancelar'
            }
        }
    },
    methods: {
        toggle(){
            $(this.$refs.modalEliminar).modal('toggle')
        },
        guardar(){
            this.$emit('guardar')
        },
        actionEliminar(){
            this.$emit('eliminar')
        },
        onAdicional(){
            this.$emit('adicional')
        },
        cancelar(){
            this.$emit('cancelar')
            this.toggle()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/sass/gbp.scss';
.bg-linea{
    background: linear-gradient(to right, #fff, #D1D1D1, #fff);
    height: 1px;
}
.modal-content{
    border: none;
    border-radius: 8px;
    .modal-header{
        height: 73px;
        // background:linear-gradient( rgba(50,163,253,.65) 1% , rgba(255,255,255,1) , rgba(255,255,255,1), rgba(255,255,255,1) );
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        border-bottom: none;
        background-size: cover;
        .close{
            outline: none;
            transition-duration: .85s;
            position: absolute;
            right: 10px;
            top: 1px;
            font-size: 2.5em;
            &:hover{
                transition-duration: .4s;
                transform: rotate(360deg) scale(1.2);
            }
        }
        .logo{
            display: block;
            // height: 70px;
            // width: 70px;
            span{
                font-size: 1.2em;
            }
        }
    }
    .modal-title{
        color: $azul2-primary;
        font-weight: normal;
    }
}
.img-tipo{
    position: absolute;
    top:20px;
    left: 50%;
    transform: translate(-50%);
}
</style>
