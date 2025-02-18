<template>
    <section class="pl-5 pt-5">
        <div class="row mx-0 a-center mb-3">
            <p class="col-8 font-bold-italic f-28">
                PUNTOS OTORGADOS POR OTROS EVENTOS
            </p>
            <div class="btn-general px-3" @click="irValidar">
                OTORGAR PUNTOS
            </div>
        </div>
        <template v-if="!noInformacion">
            <div v-for="(otro, d) in otros" :key="d" class="row mx-0 mb-4">
                <div class="col-auto inclinacion" :style="`background-color:${ otro.color }`" />
                <div class="col-8 py-2 inclinacion bg-fondo ml-2">
                    <div class="row mx-0">
                        <img :src="otro.logo" class="obj-cover border rounded-circle" width="75" height="75" />
                        <div class="col">
                            <p class="f-22 font-bold-italic" :class="otro.afectacion == 1 ? 'text-green' : 'text-red'">
                                {{ otro.afectacion == 1 ? '+' : '-' }} {{ otro.puntos_afectado }} pts
                            </p>
                            <p class="f-20 f-600 font-bold-italic">
                                {{ otro.manual_nombre }}
                            </p>
                            <p class="f-17">
                                {{ otro.nombre }}
                            </p>
                        </div>
                        <div class="col-auto">
                            <div class="row mx-0 a-center text-general">
                                <i class="icon-date-end f-18" />
                                <p class="col f-17 pr-0">
                                    {{ otro.fecha_nombre }}
                                    -
                                    {{ otro.created_at | helper-fecha('hh:mm a') }}
                                </p>
                            </div>
                            <div class="row mx-0 justify-content-end mt-3">
                                <div class="btn-general font-medium-italic px-4" @click="irVerDetalle(otro.id)">
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
                        <h5>Aún no tenemos Desafíos disponibles</h5>
                    </el-alert>
                </div>
            </div>
        </template>
        <modal-pedir-password ref="modalpedirpassword" titulo="OTORGAR PUNTOS" texto="Ingresa tu contraseña de lider para otorgar puntos" @data="irOtorgarPuntos" />
    </section>
</template>

<script>
import Desafio from "~/services/desafios/desafios_disponibles";
export default {
    data() {
        return {
            noInformacion: false,
            otros: [],
        }
    },

    created() {
        this.getOtrosDesafios();
    },

    methods: {
        async getOtrosDesafios() {
            try {
                let params =  {
                    tipo: 3
                }
                const {data} = await Desafio.getOtrosDesafios(params)
                this.otros = data.retos
                if (this.otros.length < 1) {
                    this.noInformacion = true;
                }
            } catch (e) {
                this.errorCatch(e)
            }
        },

        irValidar() {
            this.$refs.modalpedirpassword.toggle();
        },

        irOtorgarPuntos(usuario) {
            if (usuario.tipo === 2) {
                this.$refs.modalpedirpassword.toggle();
                this.$router.push({name: 'manual-puntos'});
            } else {
                this.notificacion('Bloqueado', 'Usted no tiene permisos', 'warning')
            }
        },

        irVerDetalle(id) {
            this.$router.push({name: 'puntos.detalle', params:{id_punto:id}});
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