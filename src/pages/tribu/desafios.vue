<template>
    <section v-loading="loading" class="scroll-none overflow-auto px-5 pt-4" style="height:calc(100vh - 100px)">
        <div v-if="desafio.id" class="row mx-0">
            <div class="btn-grey px-3" @click="$router.push({name: 'home.desafios-disponibles'})">
                <i class="icon-arrow-back f-14" />
                <span class="font-medium-italic ml-2">REGRESAR</span>
            </div>
            <div class="col">
                <p class="f-28 font-bold-italic">
                    {{ desafio.titulo }}
                </p>
                <p class="text-red font-black-italic f-57 lh-52">
                    {{ desafio.puntos }} pts.
                </p>
                <div class="row mx-0 a-center mt-4 pt-2 text-general f-400">
                    <i class="icon-date-end f-18" />
                    {{ desafio.fecha | helper-fecha('dddd DD MMMM YYYY') }}

                    <i class="icon-clock f-18 ml-2" />
                    {{ desafio.hora }}
                </div>
                <div class="row mx-0 a-center mt-2 pt-2 text-general f-400">
                    <i class="icon-place-outline f-18" />
                    {{ desafio.lugar ? desafio.lugar : '-------' }}
                </div>

                <div class="row mx-0 pl-4 mt-2">
                    <div class="d-flex">
                        <div class="col-auto px-0">
                            <img v-if="desafio.tribu1.logo" :src="desafio.tribu1.logo" class="obj-cover br-4 rounded-circle" width="60" height="60" />
                            <img v-else src="/img/no-imagenes/tribu_no_imagen.svg" class="obj-cover br-4 rounded-circle" width="60" height="60" />
                            
                            <div class="title-tribu text-center mt-1" :class="desafio.id_user_ganador == desafio.tribu1.id ? 'active-title' : ''">
                                {{ desafio.tribu1.nombre }}
                            </div>
                            <div class="row mx-0 mt-2">
                                <img v-if="desafio.id_user_ganador == desafio.tribu1.id" src="/img/ilustraciones/ganador_detalle.svg" />
                            </div>
                        </div>
                        <div class="col-auto font-bold-italic f-22 mt-2">
                            VS
                        </div>

                        <div class="d-flex">
                            <div v-if="desafio.tribu2" class="col-auto px-0">
                                <img v-if="desafio.tribu2.logo" :src="desafio.tribu2.logo" class="obj-cover br-4 rounded-circle" width="60" height="60" />
                                <img v-else src="/img/no-imagenes/tribu_no_imagen.svg" class="obj-cover br-4 rounded-circle" width="60" height="60" />
                              
                                <div class="title-tribu text-center mt-1" :class="desafio.id_user_ganador == desafio.tribu2.id ? 'active-title' : ''">
                                    {{ desafio.tribu2.nombre }}
                                </div>
                                <div class="row mx-0 mt-2">
                                    <img v-if="desafio.id_user_ganador == desafio.tribu2.id" src="/img/ilustraciones/ganador_detalle.svg" />
                                </div>
                            </div>
                            <div v-else class="col-auto px-0">
                                <img src="/img/no-imagenes/tribu_no_imagen.svg" class="obj-cover br-4 rounded-circle" width="60" height="60" />
                            </div>
                            <div v-if="desafio.cantidad > 2" class="col-auto font-bold-italic f-22 mt-2">
                                VS
                            </div>
                        </div>

                        <div class="d-flex">
                            <div v-if="desafio.tribu3 && desafio.cantidad >= 3" class="col-auto px-0">
                                <img v-if="desafio.tribu3.logo" :src="desafio.tribu3.logo" class="obj-cover br-4 rounded-circle" width="60" height="60" />
                                <img v-else src="/img/no-imagenes/tribu_no_imagen.svg" class="obj-cover br-4 rounded-circle" width="60" height="60" />
                              
                                <div class="title-tribu text-center mt-1" :class="desafio.id_user_ganador == desafio.tribu3.id ? 'active-title' : ''">
                                    {{ desafio.tribu3.nombre }}
                                </div>
                                <div class="row mx-0 mt-2">
                                    <img v-if="desafio.id_user_ganador == desafio.tribu3.id" src="/img/ilustraciones/ganador_detalle.svg" />
                                </div>
                            </div>
                            <div v-else-if="desafio.cantidad >= 3" class="col-auto px-0">
                                <img src="/img/no-imagenes/tribu_no_imagen.svg" class="obj-cover br-4 rounded-circle" width="60" height="60" />
                            </div>
                            <div v-if="desafio.cantidad > 3" class="col-auto font-bold-italic f-22 mt-2">
                                VS
                            </div>
                        </div>


                        <div class="d-flex">
                            <div v-if="desafio.tribu4 && desafio.cantidad == 4" class="col-auto px-0">
                                <img v-if="desafio.tribu4.logo" :src="desafio.tribu4.logo" class="obj-cover br-4 rounded-circle" width="60" height="60" />
                                <img v-else src="/img/no-imagenes/tribu_no_imagen.svg" class="obj-cover br-4 rounded-circle" width="60" height="60" />
                              
                                <div class="title-tribu text-center mt-1" :class="desafio.id_user_ganador == desafio.tribu4.id ? 'active-title' : ''">
                                    {{ desafio.tribu4.nombre }}
                                </div>
                                <div class="row mx-0 mt-2">
                                    <img v-if="desafio.id_user_ganador == desafio.tribu4.id" src="/img/ilustraciones/ganador_detalle.svg" />
                                </div>
                            </div>
                            <div v-else-if="desafio.cantidad == 4" class="col-auto px-0">
                                <img src="/img/no-imagenes/tribu_no_imagen.svg" class="obj-cover br-4 rounded-circle" width="60" height="60" />
                            </div>
                        </div>
                    </div>
                </div>               

                <div class="row mx-0 my-3" />
                <div v-if="desafio.estado == 3 || desafio.estado == 11 || desafio.estado == 12 ">
                    <p v-if="desafio.estado == 3" class="mt-3 font-bold-italic f-21">
                        FINALIZACIÓN 
                    </p>
                    <p v-if="desafio.estado == 11 || desafio.estado == 12 " class="mt-3 font-bold-italic f-21">
                        ELIMINADO 
                    </p>
                    <p class="mt-2 f-18">
                        <span v-if="desafio.tribu_actualiza != null">{{ desafio.tribu_actualiza.nombre }}</span>
                    </p>
                    <p class="mt-2 f-18">
                        <span v-if="desafio.tribu_actualiza != null">{{ desafio.tribu_actualiza.lider.nombre || "" }} - {{ desafio.tribu_actualiza.lider.empresa || "" }}</span>
                    </p>
                    <div class="row mx-0 a-center mt-3 text-general f-400">
                        <i class="icon-date-end f-18" />
                        {{ desafio.updated_at | helper-fecha('dddd DD MMM YYYY - HH:mm A') }}
                    </div>
                </div>
                <div class="row mx-0 py-3" />
                <p class="font-bold-italic f-21 mb-2">
                    Descripción del desafio
                </p>
                <p class="f-18 text-block">
                    {{ desafio.descripcion }}
                </p>
            </div>
            <div class="col-4">
                <div class="row mx-0 mb-2">
                    <div v-if="desafio.estado == 1" class="btn-general px-3" @click="aceptarDesafio">
                        ACEPTAR DESAFIO
                    </div>
                    <el-tooltip v-if="desafio.estado == 1 || desafio.estado == 2" placement="bottom" content="Editar desafio" effect="light">
                        <div class="btn-grey px-2 ml-2">
                            <i class="icon-pencil-outline" @click="modalEditar" />
                        </div>
                    </el-tooltip>
                    <el-tooltip v-if="desafio.estado == 1 || desafio.estado == 2" placement="bottom" content="Eliminar desafio" effect="light">
                        <div class="btn-grey px-2 ml-2" @click="eliminarDesafio">
                            <i class="icon-icon-trash-outline" />
                        </div>
                    </el-tooltip>
                </div>
                <div class="row mx-0 my-3">
                    <div v-if="desafio.estado == 2" class="btn-general px-3" @click="$router.push({name: 'declarar-ganador', params: {id_reto: id_desafio}})">
                        DECLARAR GANADOR
                    </div>
                </div>
                <div class="row mx-0 my-3">
                    <div class="col px-0">
                        <div class="btn-black px-3">
                            COMENTARIOS DEL DESAFÍO
                        </div>
                    </div>
                    <div class="btn-general px-2 ml-2" @click="anadirComentario">
                        AÑADIR
                    </div>
                </div>
                <div v-for="(comentario, i) in desafio.comentarios" :key="i" class="row mx-0 my-2 bg-fondo p-2">
                    <img v-if="comentario.tribu.logo" :src="comentario.tribu.logo" width="60" height="60" class="obj-cover rounded-circle" />
                    <img v-else src="/img/no-imagenes/tribu_no_imagen.svg" width="60" height="60" class="obj-cover rounded-circle" />
                    <div class="col px-2">
                        <div class="row mx-0 a-center">
                            <div class="inclinacion tick-comment" :style="`background-color:${comentario.tribu.color}`" />
                            <div class="inclinacion tick-comment ml-1" :style="`background-color:${comentario.tribu.color}`" />
                            <div class="inclinacion tick-comment ml-1" :style="`background-color:${comentario.tribu.color}`" />
                            <p class="col f-18 px-2">
                                {{ comentario.tribu.nombre }}
                            </p>
                        </div>
                        <p class="f-16 text-block">
                            {{ comentario.comentario }}
                        </p>
                        <div class="row mx-0 mt-2 text-general f-15">
                            <i class="icon-date-end f-15" />
                            <p class="ol px-2">
                                {{ comentario.created_at | helper-fecha('dddd DD MMM YYYY - HH:mm A') }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- PARTIALS -->
        <modal-aceptar-desafio ref="modalAceptarDesafio" @aceptar="aceptarDesafioR" />
        <modal-eliminar-desafio ref="modalEliminarDesafio" @eliminar="eliminarDesafioR" />
        <modal-anadir-comentario ref="modalAnadirComentario" @comentar="crearComentario" />
        <modal-pedir-password ref="modalEditar" titulo="Editar" texto="Ingresa tu contraseña de líder para editar el desafio" @data="editarDesafio($event)" />
        <error v-show="!desafio.id" mensaje="ESTE DESAFIO NO SE ENCONTRÓ" />
    </section>
</template>

<script>
import Desafios from '~/services/desafios'
export default {
    components: {
        modalAceptarDesafio: () => import('./partials/modalAceptarDesafio'),
        modalEliminarDesafio: () => import('./partials/modalEliminarDesafio'),
        modalAnadirComentario: () => import('./partials/modalAnadirComentario')
    },
    data() {
        return {
            loading: false,
            desafio:{
                titulo: '',
                tribu1: {},
                tribu2: {},
                tribu3: {},
                tribu4: {},
                tribu_actualiza: {
                    nombre: '',
                    lider:{}
                },
                fecha: '',
                puntos: 0,
                descripcion: '',
                comentarios: [],
            }
        }
    },
    computed:{
        id_desafio() {
            return Number(this.$route.params.id_desafio)
        }
    },
    created() {
        this.mostrar()
    },
    methods: {
        aceptarDesafio() {
            this.$refs.modalAceptarDesafio.toggle();
        },
        async mostrar() {
            try {
                const {data} = await Desafios.mostrar(this.$route.params.id_desafio)
                this.desafio = data.data
                this.loading = false
                    
            } catch (e) {
                console.log(e)
            }
        },
        async aceptarDesafioR(password) {
            try {
                this.loading = true
                let payload = {
                    password : password
                }
                const {data} = await Desafios.aceptarDesafio(this.$route.params.id_desafio,payload)
                if(data.success) {
                    this.mostrar()
                    this.aceptarDesafio()
                    this.$refs.modalAceptarDesafio.reset()
                    this.$notify({
                        title: 'Aceptar Desafío',
                        message: data.mensaje,
                        type: 'success'
                    });
                }else{
                    this.$notify({
                        title: 'Aceptar Desafío',
                        message: data.mensaje,
                        type: 'warning'
                    });
                    this.loading = false
                }
            } catch (e) {
                console.log(e)
            }
        },
        async eliminarDesafioR(password) {
            console.log(password)
            try {
                this.loading = true
                let payload = {
                    password : password
                }
                const {data} = await Desafios.eliminarDesafio(this.$route.params.id_desafio,payload)
                if(data.success) {
                    this.eliminarDesafio()
                    this.$refs.modalEliminarDesafio.reset()
                    this.$notify({
                        title: 'Eliminar Desafío',
                        message: data.mensaje,
                        type: 'success'
                    });
                    this.$router.back()
                }else{
                    this.$notify({
                        title: 'Eliminar Desafío',
                        message: data.mensaje,
                        type: 'warning'
                    });
                    this.loading = false
                }
            } catch (e) {
                console.log(e)
            }
        },
        eliminarDesafio() {
            this.$refs.modalEliminarDesafio.toggle();
        },
        anadirComentario() {
            this.$refs.modalAnadirComentario.toggle();
        },

        async crearComentario(comentario) {
            try {
                this.loading = true
                let payload = {
                    id_reto : this.$route.params.id_desafio,
                    comentario : comentario.comentario,
                    password : comentario.password
                }
                const {data} = await Desafios.crearComentario(payload)
                if(data.success) {
                    this.mostrar()
                    this.$refs.modalAnadirComentario.reset();
                    this.$refs.modalAnadirComentario.toggle();
                    this.$notify({
                        title: 'Comentario',
                        message: data.mensaje,
                        type: 'success'
                    });
                }else{
                    this.$notify({
                        title: 'Comentario',
                        message: data.mensaje,
                        type: 'warning'
                    });
                    this.loading = false
                }        
            } catch (e) {
                console.log(e)
            }
        },

        modalEditar() {
            this.$refs.modalEditar.toggle();
        },

        editarDesafio(r) {
            if(r.id !== undefined) {
                this.modalEditar()
                this.$router.push({name:'editar-desafio',params:{id_desafio:this.$route.params.id_desafio}})
            }
        },

        
    }
}
</script>
<style lang="scss" scoped>
.title-tribu{
    width: 60px;
    font-size: 14px;
    &.active-title{
        background-color: var(--color-red);
        color: #FFFFFF;
    }
}
.tick-comment{
    width: 5px;
    height: 15px;
}
.text-block {
    white-space: pre-wrap;
}
</style>