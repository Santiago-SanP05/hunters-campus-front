<template>
    <div
    ref="modalgbp"
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
                <div class="modal-header mb-1">
                    <div class="line-title inclinacion" />
                    <div class="line-title inclinacion" />
                    <div class="line-title inclinacion" />
                    <p class="col f-22 font-bold-italic">
                        {{ titulo }}
                    </p>
                    <div class="ml-auto my-auto d-middle-center bg-white rounded-circle" style="width:20px;height:20px;">
                        <i class="icon-close f-15 cr-pointer text-gr-general" data-dismiss="modal" />
                    </div>
                </div>
                <div class="modal-body overflow-auto custom-scroll" style="max-height:70vh;">
                    <slot />
                </div>
                <div class="row mx-0 a-center justify-content-end" style="height:55px;">
                    <button
                    type="button"
                    class="btn-grey"
                    style="width:110px;"
                    @click="cancelar"
                    v-text="textosBotones.cerrar"
                    />
                    <button
                    v-if="!noAceptar"
                    v-loading="cargando"
                    type="button"
                    class="btn-general mx-3"
                    style="width:110px;"
                    @click="actionEliminar"
                    v-text="textosBotones.aceptar"
                    />
                    <button
                    v-show="adicional !== ''"
                    v-loading="cargando"
                    :disabled="desactivarGuardar"
                    type="button"
                    class="btn-general mx-3 px-3 text-uppercase"
                    @click="onAdicional"
                    v-text="adicional"
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
            required: true
        },
        tamano: {
            type: String,
            default: 'modal-md'
        },
        listo: {
            type: Boolean,
            default: false
        },
        eliminar: {
            type: Boolean,
            default: false
        },
        noAceptar: {
            type: Boolean,
            default: false
        },
        desactivarGuardar: {
            type: Boolean,
            default: false
        },
        adicional: {
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
        icon: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            textosBotones: {
                cerrar: 'CERRAR',
                aceptar: 'Aceptar',
            }
        }
    },
    methods: {
        toggle() {
            $(this.$refs.modalgbp).modal('toggle')
        },
        guardar() {
            this.$emit('guardar')
        },
        actionEliminar() {
            this.$emit('eliminar')
        },
        onAdicional() {
            this.$emit('adicional')
        },
        cancelar() {
            this.$emit('cancelar')
            this.toggle()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/sass/gbp.scss';

.modal-content{
    border: none;
    border-radius: inherit !important;
    border: 1px solid #DFE4E8;

    .modal-header{
        border-bottom: none;
        .line-title{
            width: 13px;
            height: 30px;
            background-color: #FF0000;
            margin-right: 5px;
        }
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
