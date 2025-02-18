<template>
    <section class="pl-5 pt-5">
        <div class="row mx-0 a-center">
            <p class="col-8 font-bold-italic f-28">
                DESAFIOS PROGRAMADOS
            </p>
        </div>
        <template v-if="!noInformacion">
            <div v-for="(des, d) in programados" :key="d" class="row mx-0 mb-4">
                <div class="col-auto mx-0 mt-4 mb-3">
                    <div class="inclinacion f-400 ml-2 bg-fondo px-5 h-32x d-middle-center">
                        <span>{{ des.semana_nombre }}</span>
                        <!--
                    <span>Semana del</span> <span class="f-600 mx-1">{{ des.semana_nombre.fecha_inicial | helper-fecha('DD MMMM') }}</span>
                    <span>al</span> <span class="f-600 mx-1">{{ des.semana_nombre.fecha_final | helper-fecha('DD MMMM') }}</span>
                    -->
                    </div>
                </div>
                <div v-for="(reto, p) in des.retos" :key="p" class="col-12 px-0 mb-4">
                    <div class="row mx-0">
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
                                    <div class="row mx-0 mt-2">
                                        <div class="d-middle">
                                            <div class="col-auto px-0 cr-pointer" @click="irVerTribu(reto.created_by)">
                                                <img :src="reto.retador_logo" class="obj-cover border rounded-circle" width="62" height="62" />
                                                <p class="f-14 text-center" style="height:21px;">{{ reto.retador }}</p>
                                            </div>
                                            <div class="col-auto f-22 font-bold-italic mb-3">
                                                VS
                                            </div>
                                            <div class="col-auto px-0 cr-pointer" @click="irVerTribu(reto.id_user_2)">
                                                <img v-if="reto.id_user_2 === null" src="/img/no-imagenes/sin_asignar.svg" class="obj-cover border rounded-circle" width="62" height="62" />
                                                <img v-else :src="reto.oponente1_logo" class="obj-cover border rounded-circle" width="62" height="62" />
                                                <p class="f-14 text-center" style="height:21px;">{{ reto.oponente1 }}</p>
                                            </div>
                                            <template v-if="reto.cantidad > 2">
                                                <div class="col-auto f-22 font-bold-italic mb-3">
                                                    VS
                                                </div>
                                                <div class="col-auto px-0 cr-pointer" @click="irVerTribu(reto.id_user_3)">
                                                    <img v-if="reto.id_user_3 === null" src="/img/no-imagenes/sin_asignar.svg" class="obj-cover border rounded-circle" width="62" height="62" />
                                                    <img v-else :src="reto.oponente2_logo" class="obj-cover border rounded-circle" width="62" height="62" />
                                                    <p class="f-14 text-center" style="height:21px;">{{ reto.oponente2 }}</p>
                                                </div>
                                                <template v-if="reto.cantidad > 3">
                                                    <div class="col-auto f-22 font-bold-italic mb-3">
                                                        VS
                                                    </div>
                                                    <div class="col-auto px-0 cr-pointer" @click="irVerTribu(reto.id_user_4)">
                                                        <img v-if="reto.id_user_4 === null" src="/img/no-imagenes/sin_asignar.svg" class="obj-cover border rounded-circle" width="62" height="62" />
                                                        <img v-else :src="reto.oponente3_logo" class="obj-cover border rounded-circle" width="62" height="62" />
                                                        <p class="f-14 text-center" style="height:21px;">{{ reto.oponente3 }}</p>
                                                    </div>
                                                </template>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto px-0">
                                    <p class="text-right"><i class="icon-date-end f-18" />{{ reto.fecha | helper-fecha('dddd DD MMMM') }}</p>
                                    <p class="text-right"><i class="icon-clock f-18" />{{ reto.fecha_hora | helper-fecha('hh:mm a') }}</p>
                                    <p v-if="reto.lugar" class="text-right"><i class="icon-place-outline f-18" />{{ reto.lugar }}</p>
                                    <p v-else class="text-right"><i class="icon-place-outline f-18" />Lugar</p>
                                    <div class="btn-general mt-2 font-medium-italic px-3" style="width:159px;" @click="irVerDesafio(reto.id)">
                                        Ver Desafio
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="row mx-0 mt-3">
                                <div class="col">
                                    <div class="row mx-0">
                                        
                                    </div>
                                </div>
                                <div class="col-auto">
                                    
                                </div>  
                            </div> -->
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
                        <h5>Aún no tenemos Desafíos programados</h5>
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
            programados: [],
        }
    },

    created() {
        this.getDesafiosProgramados();
    },

    methods: {
        async getDesafiosProgramados() {
            try {
                let params =  {
                    estado: 2
                }
                const {data} = await Desafio.getDesafiosProgramados(params)
                this.programados = data.retos
                if (this.programados.length < 1) {
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
            this.$router.push({name: 'desafio.detalle', params: {id_desafio: id_desafio}});
        },
    },
}
</script>