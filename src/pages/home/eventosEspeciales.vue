<template>
    <section class="pl-5 pt-5">
        <div class="row mx-0 a-center mb-3">
            <p class="col-8 font-bold-italic f-28">
                TORNEOS ESPECIALES
            </p>
            <div class="btn-general px-3" @click="irCrearDesafio">
                CREAR TORNEO
            </div>
        </div>
        <template v-if="!noInformacion">
            <div v-for="(esp, d) in especiales" :key="d" class="row mx-0 mb-4">
                <div class="col-auto px-2 inclinacion bg-general" />
                <div class="col-8 py-2 inclinacion bg-fondo ml-2">
                    <div class="row mx-0">
                        <div class="col px-0">
                            <p class="f-20 f-600 font-bold-italic">
                                {{ esp.torneo }}
                            </p>
                            <div class="row mx-0 a-center">
                                <p class="col-auto px-0 text-general font-black-italic f-22">
                                    {{ agregarSeparadoresNumero(esp.puntos_torneo) }} pts.
                                </p>
                                <p class="col-auto text-general f-17">
                                    Otorgados en {{ esp.oportunidades }} oportunidades
                                </p>
                                <div class="col-auto d-flex text-general ml-auto">
                                    <i class="icon-date-end f-18" />
                                    <p class="col f-17 pr-0">
                                        {{ esp.torneo_fecha | helper-fecha('DD MMM YYYY') }}
                                    </p>
                                </div>
                                <div class="btn-general font-medium-italic px-4" @click="irVerDetalle(esp.id)"> 
                                    VER DETALLE
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="row mx-0">
                <div class="col-8 py-3 inclinacion bg-fondo ml-2">
                    <el-alert
                    class="f-600 f-22 font-bold-italic"
                    type="info"
                    size="large"
                    effect="light"
                    show-icon
                    >
                        <h5>Aún no tenemos torneos especiales</h5>
                    </el-alert>
                </div>
            </div>
        </template>
        <modal-pedir-password ref="modalpedirpassword" titulo="CREAR TORNEO" texto="Ingresa tu contraseña de administrador para crear un torneo" @data="irValidar" />
    </section>
</template>

<script>
import Desafio from "~/services/desafios/desafios_disponibles";
import moment from 'moment'

export default {
    data() {
        return {
            noInformacion: false,
            especiales: [],
        }
    },

    created() {
        this.getDesafiosEspeciales();
    },

    methods: {
        async getDesafiosEspeciales() {
            try {
                let params =  {
                    estado: 1
                }
                const {data} = await Desafio.getDesafiosEspeciales(params)
                this.especiales = data.retos
                if (this.especiales.length < 1) {
                    this.noInformacion = true;
                }
            } catch (e) {
                this.errorCatch(e)
            }
        },

        irValidar(usuario) {
            if (usuario.tipo === 2) {
                this.irCrearDesafio();
                this.$router.push({name: 'crear-tornedo', params:{id:usuario.id}});
            } else {
                this.notificacion('Bloqueado', 'Usted no tiene permisos', 'warning')
            }
        },

        irCrearDesafio() {
            this.$refs.modalpedirpassword.toggle();
        },

        irVerDetalle(id_torneo) {
            this.$router.push({name: 'torneo', params:{id_torneo:id_torneo}});
        },
    },
}
</script>
<style lang="scss" scoped>
.title-space{
    height: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active{
        background-color: #FF3333 !important;
        color: #FFFFFF !important;
    }
}
</style>