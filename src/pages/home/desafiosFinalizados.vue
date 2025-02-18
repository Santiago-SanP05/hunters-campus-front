<template>
    <section class="pl-5 pt-5">
        <div class="row mx-0 a-center">
            <p class="col-8 font-bold-italic f-28">
                DESAFIOS FINALIZADOS
            </p>
        </div>
        <template v-if="!noInformacion">
            <div v-for="(reto, d) in finalizados" :key="d" class="row mx-0 mt-3">
                <div class="col-auto inclinacion" :style="`background-color:${ reto.tribu_color }`" />
                <div class="col-8 py-2 inclinacion bg-fondo ml-2">
                    <div class="row mx-0">
                        <div class="col px-0">
                            <div class="row mx-0">
                                <p class="col-auto font-bold-italic f-600 f-22">
                                    {{ agregarSeparadoresNumero(reto.puntos) }} pts.
                                </p>
                                <p class="col-auto font-bold-italic f-600 f-22">
                                    {{ reto.titulo }}
                                </p>
                            </div>
                            <div class="d-middle mt-2">
                                <div class="col-auto px-0 cr-pointer" @click="irVerTribu(reto.created_by)">
                                    <div class="row mx-0 justify-center position-relative">
                                        <img v-if="reto.id_user_ganador == reto.created_by" src="/img/ilustraciones/ganador_detalle.svg" width="24" height="22" style="position:absolute;right:-3px;top:-2px;" />
                                        <div class="rounded-circle border" style="width:62px;height:62px;">
                                            <img :src="reto.retador_logo" class="obj-cover rounded-circle" width="100%" height="100%" />
                                        </div>
                                    </div>
                                    <div class="title-space mt-1 px-2 f-14" :class="reto.id_user_ganador == reto.created_by ? 'active' : ''">
                                        {{ reto.retador ? reto.retador : '-' }}
                                    </div>
                                </div>
                                <div class="col-auto f-22 font-bold-italic mb-3">
                                    VS
                                </div>
                                <div class="col-auto px-0 cr-pointer" @click="irVerTribu(reto.id_user_2)">
                                    <div class="row mx-0 justify-center position-relative">
                                        <img v-if="reto.id_user_ganador == reto.id_user_2" src="/img/ilustraciones/ganador_detalle.svg" width="24" height="22" style="position:absolute;right:-3px;top:-2px;" />
                                        <div class="rounded-circle border" style="width:62px;height:62px;">
                                            <img v-if="reto.id_user_2 === null" src="/img/no-imagenes/sin_asignar.svg" class="obj-cover rounded-circle" width="100%" height="100%" />
                                            <img v-else :src="reto.oponente1_logo" class="obj-cover rounded-circle" width="100%" height="100%" />
                                        </div>
                                    </div>
                                    <div class="title-space mt-1 f-14" :class="reto.id_user_ganador == reto.id_user_2 ? 'active' : ''">
                                        {{ reto.oponente1 ? reto.oponente1 : '-' }}
                                    </div>
                                </div>
                                <template v-if="reto.cantidad > 2">
                                    <div class="col-auto f-22 font-bold-italic mb-3">
                                        VS
                                    </div>
                                    <div class="col-auto px-0 cr-pointer" @click="irVerTribu(reto.id_user_3)">
                                        <div class="row mx-0 justify-center position-relative">
                                            <img v-if="reto.id_user_ganador == reto.id_user_3" src="/img/ilustraciones/ganador_detalle.svg" width="24" height="22" style="position:absolute;right:-3px;top:-2px;" />
                                            <div class="rounded-circle border" style="width:62px;height:62px;">
                                                <img v-if="reto.id_user_3 === null" src="/img/no-imagenes/sin_asignar.svg" class="obj-cover rounded-circle" width="100%" height="100%" />
                                                <img v-else :src="reto.oponente2_logo" class="obj-cover rounded-circle" width="100%" height="100%" />
                                            </div>
                                        </div>
                                        <div class="title-space mt-1 f-14" :class="reto.id_user_ganador == reto.id_user_3 ? 'active' : ''">
                                            {{ reto.oponente2 ? reto.oponente2 : '-' }}
                                        </div>
                                    </div>
                                    <template v-if="reto.cantidad > 3">
                                        <div class="col-auto f-22 font-bold-italic mb-3">
                                            VS
                                        </div>
                                        <div class="col-auto px-0 cr-pointer" @click="irVerTribu(reto.id_user_4)">
                                            <div class="row mx-0 justify-center position-relative">
                                                <img v-if="reto.id_user_ganador == reto.id_user_4" src="/img/ilustraciones/ganador_detalle.svg" width="24" height="22" style="position:absolute;right:-3px;top:-2px;" />
                                                <div class="rounded-circle border" style="width:62px;height:62px;">
                                                    <img v-if="reto.id_user_4 === null" src="/img/no-imagenes/sin_asignar.svg" class="obj-cover rounded-circle" width="100%" height="100%" />
                                                    <img v-else :src="reto.oponente3_logo" class="obj-cover rounded-circle" width="100%" height="100%" />
                                                </div>
                                            </div>
                                            <div class="title-space mt-1 f-14" :class="reto.id_user_ganador == reto.id_user_4 ? 'active' : ''">
                                                {{ reto.oponente3 ? reto.oponente3 : '-' }}
                                            </div>
                                        </div>
                                    </template>
                                </template>
                            </div>
                        </div>
                        <div class="col-auto px-0">
                            <p class="text-right"><i class="icon-date-end f-18" />{{ reto.updated_at | helper-fecha('dddd DD MMMM') }}</p>
                            <p class="text-right"><i class="icon-clock f-18" />{{ reto.updated_at | helper-fecha('hh:mm a') }}</p>
                            <p v-if="reto.lugar" class="text-right"><i class="icon-place-outline f-18" />{{ reto.lugar }}</p>
                            <p v-else class="text-right"><i class="icon-place-outline f-18" />Lugar</p>
                            <div class="btn-general mt-2 font-medium-italic px-3" @click="irVerDesafio(reto.id)">
                                Ver Desafio
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
                        <h5>Aún no tenemos Desafíos finalizados</h5>
                    </el-alert>
                </div>
            </div>
        </template>
    </section>
</template>

<script>
import Desafio from "~/services/desafios/desafios_disponibles";

export default {
    data() {
        return {
            noInformacion: false,
            finalizados: [],
        }
    },

    created() {
        this.getDesafiosFinalizados();
    },

    methods: {
        async getDesafiosFinalizados() {
            try {
                let params =  {
                    estado: 3
                }
                const {data} = await Desafio.getDesafiosFinalizados(params)
                this.finalizados = data.retos
                if (this.finalizados.length < 1) {
                    this.noInformacion = true;
                }
            } catch (e) {
                this.errorCatch(e)
            }
        },

        irVerTribu(id) {
            this.$router.push({name: 'tribu.ver', params: {id_tribu: id}});
        },

        irVerDesafio(id_desafio) {
            this.$router.push({name: 'desafio.detalle', params:{id_desafio:id_desafio}});
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