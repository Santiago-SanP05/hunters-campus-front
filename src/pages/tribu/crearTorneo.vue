<template>
    <section class="pl-5 pt-5 scroll-none overflow-auto" style="height:calc(100vh - 100px)">
        <div class="row mx-0">
            <div class="btn-grey px-3" @click="$router.back()">
                <i class="icon-arrow-back text-white f-14 mr-2" />
                REGRESAR
            </div>
            <div class="col ml-3">
                <p class="font-bold-italic f-28 lh-32">
                    CREAR TORNEO ESPECIAL
                </p>
                <div class="row mx-0 mt-3">
                    <div class="col-3 px-0">
                        <p class="label-mini">
                            Título
                        </p>
                        <el-input v-model="titulo" placeholder="Título" class="w-100" />
                        <div class="row mx-0 py-3" />
                        <p class="label-mini">
                            Día de finalización del torneo
                        </p>
                        <el-date-picker
                        v-model="value"
                        class="w-100"
                        type="date"
                        placeholder="Seleccionar"
                        />
                        <div class="row mx-0 py-3" />
                        <div class="row mx-0 py-3" />
                        <div class="row mx-0 py-3" />
                        <div class="row mx-0 py-3" />
                        <div class="row mx-0">
                            <div class="btn-general px-4" @click="irValidar">
                                CREAR
                            </div>
                        </div>
                    </div>
                    <div class="col-4 ml-4">
                        <p class="label-mini">
                            Descripción del torneo
                        </p>
                        <el-input v-model="descripcion" placeholder="Descripción" type="textarea" :rows="20" class="w-100" />
                    </div>
                </div>
            </div>
        </div>
        <modal-pedir-password ref="modalPedirPassword" titulo="CREAR TORNEO" texto="Ingresa tu contraseña de administrador para crear el torneo" @data="validarUsuario($event)" />
    </section>
</template>

<script>
import Desafio from "~/services/desafios/desafios_disponibles";

export default {
    data() {
        return {
            titulo: '',
            checked: true,
            descripcion: '',
            value: '',
            no_puntos: ''
        }
    },

    computed: {
        created_by() {
            return this.$route.params.id
        }
    },

    methods: {
        async irValidar() {
            if (this.titulo === '' || this.descripcion === '' || this.value === '') {
                return this.notificacion('Mensaje', 'Los campos son obligatorios', 'warning');
            }
            this.$refs.modalPedirPassword.toggle()
        },
        async validarUsuario(usuario) {
            if (usuario.tipo != 2) {
                return this.notificacion('Mensaje', 'Usted no tiene permisos para realizar está acción', 'warning')
            }
            this.irCrearTorneo();
        },
        async irCrearTorneo() {
            try {
                let params =  {
                    titulo: this.titulo,
                    fecha: this.value,
                    descripcion: this.descripcion,
                    created_by: this.created_by
                }
                const {data} = await Desafio.postCrearTorneo(params)
                this.notificacion('Mensaje', data.mensaje, data.tipo)
                this.$refs.modalPedirPassword.toggle()
                if (data.id_torneo != '') {
                    this.$router.push({name: 'torneo', params:{id_torneo:data.id_torneo}});
                }
            } catch (e) {
                this.errorCatch(e)
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.btn-add{
    background-color: #637381;
    height: 32px;
    display: flex;
    font-size: 18px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none !important;
    outline: none;
    transform: skewX(-15deg);
    color: white !important;
    font-family: 'Kunnari Medium italic';
    &:focus{
        background-color: #00B050 !important;
    }
}
.btn-minus{
    background-color: #637381;
    height: 32px;
    display: flex;
    font-size: 18px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none !important;
    outline: none;
    transform: skewX(-15deg);
    color: white !important;
    font-family: 'Kunnari Medium italic';
    &:focus{
        background-color: #FF0000 !important;
    }
}
</style>