<template>
    <section v-loading="loading" class="pl-5 pt-5 scroll-none overflow-auto" style="height:calc(100vh - 100px)">
        <div v-if="torneo.id" class="row mx-0">
            <div class="btn-grey px-3" @click="$router.push({name:'home.eventos-especiales'})">
                <i class="icon-arrow-back text-white f-14 mr-2" />
                REGRESAR
            </div>
            <div class="col">
                <p class="f-28 font-bold-italic lh-32">
                    {{ torneo.titulo }}
                </p>
                <div class="row mx-0 a-center mt-3 f-17 text-general">
                    <i class="icon-date-end f-18" />
                    <p class="col px-2">
                        {{ torneo.fecha | helper-fecha('dddd DD MMMM YYYY') }}
                    </p>
                </div>
                <div class="row mx-0 mt-4" />
                <p class="f-21 font-bold-italic">
                    Descripción del torneo
                </p>
                <p class="f-400 f-18 mt-2">
                    {{ torneo.descripcion }}
                </p>
                <div class="row mx-0 py-2" />
                <div class="row mx-0 a-center">
                    <p class="col-auto f-28 px-0 font-bold-italic">
                        Ranking del torneo
                    </p>
                    <div class="btn-general px-2 ml-auto mr-2" @click="modalEditarPuntos">
                        ACTUALIZAR PUNTUACIÓN
                    </div>
                    <div class="btn-grey px-2 x ml-2 inclinacion" @click="reportarAusencia">
                        REPORTAR AUSENCIA
                    </div>
                </div>
                <div class="row mx-0 my-4">
                    <div v-if="ausencias" class="col-2 text-general f-20 d-middle">
                        <div class="mr-2" style="width:40px;height:5px;" />
                        Tribus
                    </div>
                    <div v-else class="col-4 text-general f-20 d-middle">
                        <div class="mr-2" style="width:40px;height:5px;" />
                        Tribus
                    </div>
                    
                    <div class="col-3 text-center text-general f-20">
                        Puntos de juego
                    </div>
                    <div class="col-2 text-center text-general f-20">
                        Juegos
                    </div>
                    <div class="col-2 text-center text-general f-20">
                        Victorias
                    </div>
                    <div v-if="ausencias" class="col-2 text-center text-general f-20">
                        Ausencias
                    </div>
                </div>
                <div v-for="tribu in resultados" :key="tribu.id" class="row mx-0 mb-3">
                    <div v-if="ausencias" class="col-2 f-20 d-middle">
                        <img v-if="tribu.logo" :src="tribu.logo" class="obj-cover rounded-circle mr-2" width="40" height="40" />
                        <img v-else src="/img/no-imagenes/tribu_no_imagen.svg" class="obj-cover rounded-circle mr-2" width="40" height="40" />
                        {{ tribu.nombre }}
                    </div>
                    <div v-else class="col-4 f-20 d-middle">
                        <img v-if="tribu.logo" :src="tribu.logo" class="obj-cover rounded-circle mr-2" width="40" height="40" />
                        <img v-else src="/img/no-imagenes/tribu_no_imagen.svg" class="obj-cover rounded-circle mr-2" width="40" height="40" />
                        {{ tribu.nombre }}
                    </div>
                    <div class="col-3 text-center font-black-italic f-20">
                        {{ tribu.torneo.puntos }}
                    </div>
                    <div class="col-2 text-center font-black-italic f-20">
                        {{ tribu.torneo.juegos }}
                    </div>
                    <div class="col-2 text-center font-black-italic f-20">
                        {{ tribu.torneo.victorias }}
                    </div>
                    <div v-if="ausencias" class="col-2 text-center font-black-italic f-20">
                        {{ (tribu.torneo.ausencias > 0) ? tribu.torneo.ausencias : "-" }}
                    </div>
                </div>
                <div class="row mx-0 py-2" />
                <div class="row mx-0 a-center mb-3">
                    <p class="col-auto f-28 px-0 font-bold-italic">
                        Puntos otorgados
                    </p>
                </div>
                <div v-for="(punto,i) in torneo.puntos" :key="i" class="row mx-0 mb-2">
                    <div class="col-auto px-2 inclinacion" :style="`background-color:${punto.tribu.color}`" />
                    <div class="col ml-2 p-2 bg-fondo inclinacion">
                        <div class="row mx-0">
                            <img v-if="punto.tribu.logo" :src="punto.tribu.logo" class="rounded-circle obj-cover" width="48" height="48" />
                            <img v-else src="/img/no-imagenes/tribu_no_imagen.svg" class="rounded-circle obj-cover" width="48" height="48" />
                            <div class="col">
                                <p class="f-22 font-black-italic">
                                    {{ punto.puntos_afectado }} pts.
                                </p>
                                <p class="f-17">
                                    {{ punto.tribu.nombre }}
                                </p>
                            </div>
                            <div class="col text-general pr-0">
                                <p class="f-17">
                                    Líder: {{ punto.tribu.lider.nombre }}
                                </p>
                                <div class="row mx-0 a-center f-17 text-general">
                                    <i class="icon-date-end f-18" />
                                    <p class="col px-2">
                                        {{ punto.created_at | helper-fecha('dddd DD MMMM YYYY') }}
                                    </p>
                                </div>
                            </div>
                            <div class="col text-general">
                                <el-tooltip v-if="punto.manual_descripcion != null" :content="punto.manual_descripcion" placement="bottom" effect="dark">
                                    <p class="f-17 tres-puntos mr-2 descripcion">
                                        {{ punto.manual_descripcion }}
                                    </p>
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="row mx-0 mb-2">
                    <div class="btn-general px-3" @click="$router.push({name: 'torneo-puntos'})">
                        OTORGAR PUNTOS
                    </div>
                    <el-tooltip placement="bottom" content="Editar desafio" effect="light">
                        <div class="btn-grey px-2 ml-2" @click="irValidarEditar">
                            <i class="icon-pencil-outline" />
                        </div>
                    </el-tooltip>
                    <el-tooltip placement="bottom" content="Eliminar desafio" effect="light">
                        <div class="btn-grey px-2 ml-2">
                            <i class="icon-icon-trash-outline" />
                        </div>
                    </el-tooltip>
                </div>
                <div class="row mx-0 my-3">
                    <div class="col px-0">
                        <div class="btn-black px-3">
                            COMENTARIOS DEL TORNEO
                        </div>
                    </div>
                    <div class="btn-general px-2 ml-2" @click="anadirComentario">
                        AÑADIR
                    </div>
                </div>
                <div v-for="(comentario, i) in torneo.comentarios" :key="i" class="row mx-0 my-2 bg-fondo p-2">
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
        <modal-anadir-comentario ref="modalComentario" @comentar="crearComentario" />
        <modal-pedir-password ref="modalEditarPuntos" titulo="Editar Puntuación de Torneo" texto="Ingresa tu contraseña para editar puntos" @data="irEditarPuntos($event)" />
        <modal-pedir-password ref="modalEditarTorneo" titulo="EDITAR TORNEO" texto="Debes ser administrador para poder editarlo, Ingresa tu contraseña." @data="irValidar($event)" />
        <modal-reportar-ausencia ref="modalReportarAusencia" />
        <error v-show="!torneo.id" mensaje="ESTE TORNEO NO SE ENCONTRÓ" />
    </section>
</template>

<script>
import Torneos from '~/services/torneos'
export default {
    components:{
        modalAnadirComentario: () => import('./partials/modalAnadirComentario'),
        modalReportarAusencia: () => import('./partials/modalReportarAusencia')
    },
    data() {
        return {
            tribu_img: 'https://thumbs.dreamstime.com/b/insignia-de-arte-para-juegos-del-equipo-deportes-dragon-sport-gr%C3%A1fica-dise%C3%B1o-videojuegos-equipos-dragones-con-texto-y-color-163278046.jpg',
            comentarios_desafio: [
                {
                    img: 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/151/posts/32740/image/5.jpg',
                    tribu: 'OSLO LIONS',
                    color: '#FFDD53',
                    mensaje: 'Nos apuntamos 🔥',
                    fecha: 'Jueves 29 Dic. de 2021 - 12:34 p.m.'
                },
                {
                    img: 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/151/posts/32740/image/5.jpg',
                    tribu: 'MANILA EAGLES',
                    color: '#C00000',
                    mensaje: 'Nos apuntamos 🔥',
                    fecha: 'Jueves 29 Dic. de 2021 - 12:34 p.m.'
                }
            ],
            loading : false,
            torneo:{
                id:null,
                comentarios:[{
                    tribu: {
                        logo: ''
                    }
                }]
            },
            resultados:[],
            ausencias:[],
            
        }
    },
    created() {
        this.mostrar()
        this.ranking()
    },
    methods:{
        anadirComentario() {
            this.$refs.modalComentario.toggle();
        },
        reportarAusencia() {
            this.$refs.modalReportarAusencia.toggle();
        },
        async mostrar() {
            try {
                this.loading = true
                const {data} = await Torneos.mostrar(this.$route.params.id_torneo)
                this.torneo = data.data
                this.loading = false
                    
            } catch (e) {
                console.log(e)
            }
        },
        async ranking() {
            try {
                this.loading = true
                const {data} = await Torneos.ranking(this.$route.params.id_torneo)
                this.resultados = data.data.ranking
                this.ausencias = data.data.ausencias
                this.loading = false
                    
            } catch (e) {
                console.log(e)
            }
        },
        async crearComentario(comentario) {
            try {
                this.loading = true
                let payload = {
                    id_torneo : this.$route.params.id_torneo,
                    comentario : comentario.comentario,
                    password : comentario.password
                }
                const {data} = await Torneos.crearComentario(payload)
                if(data.success) {
                    this.mostrar()
                    this.$refs.modalComentario.reset();
                    this.$refs.modalComentario.toggle();
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
        modalEditarPuntos() {
            this.$refs.modalEditarPuntos.toggle();
        },
        irEditarPuntos(r) {
            console.log(r)
            if(r.id !== undefined) {
                if(r.tipo !== 2) {
                    this.$notify({
                        title: 'Editar Puntuación',
                        message: 'Debes ser un administrador para poder realizar esta acción',
                        type: 'warning'
                    });
                    return
                }
                this.modalEditarPuntos()
                this.$router.push({name: 'actualizar-puntuacion', params:{id_torneo : this.torneo.id} })
            }
        },
        irValidarEditar() {
            this.$refs.modalEditarTorneo.toggle();
        },
        irValidar(usuario) {
            if (usuario.tipo === 2) {
                this.irValidarEditar();
                this.$router.push({name: 'editar-tornedo', params:{id_torneo:this.$route.params.id_torneo}});
                return;
            }
            this.notificacion('Bloqueado', 'Debes ser un administrador para poder realizar esta acción', 'warning')
        }
    }
}
</script>
<style lang="scss" scoped>
.tick-comment{
    width: 5px;
    height: 15px;
}
.text-block {
    white-space: pre-wrap;
}
.descripcion{
    height: 38px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: pre-line;
    line-height: 19px;
}
</style>
