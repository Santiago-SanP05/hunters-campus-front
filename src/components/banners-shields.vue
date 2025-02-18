<template>
    <section v-loading="loading" class="mb-4 pt-3">
        <div class="row mx-0">
            <div v-if="teamLideres.length >= 1" class="col-auto d-middle">
                <div class="d-middle j-center rounded-circle bg-white border" style="width:32px;height:32px;" @click="verIzquierda">
                    <i class="icon-chevron-left f-27 cr-pointer" />
                </div>
            </div>
            <div id="content-scroll" class="col px-0 scroll-none overflow-auto position-relative">
                <div class="mb-5" style="display:inline-flex;">
                    <div v-for="(data,key) in teamLideres" :key="key" class="card-shield-tribu mr-3 cr-pointer" :style="`--color-shield:${data.color}`" @click="verTribu(data.id)">
                        <div class="team-name f-22 f-600 text-center">
                            {{ data.titulo }}
                        </div>
                        <div class="w-100 position-relative box-card" style="height:122px;width:100%;">
                            <el-tooltip placement="bottom" content="Retos totales" effect="light">
                                <div class="px-2 bg-black br-12 text-white position-absolute" style="bottom:8px;left:5px;">
                                    {{ data.cant_total_participaciones }}
                                    <i class="icon-calendario-ok" />
                                </div>
                            </el-tooltip>
                            <div class="px-2 bg-black br-12 text-white position-absolute" style="bottom:8px;right:5px;">
                                <el-tooltip placement="bottom" content="Retos en la semana anterior" effect="light">
                                    <b>{{ data.cant_participaciones_semana_anterior }}</b> 
                                </el-tooltip>
                                <el-tooltip placement="bottom" content="Retos en la semana actual" effect="light">
                                    <b> - {{ data.cant_participaciones_actuales }}</b>
                                </el-tooltip>
                                <i class="icon-calendario-rango" />
                            </div>
                            <img :src="data.imagen" class="img-card mt-1 obj-cover" height="100%" width="100%" />
                        </div>

                        <div class="title-place font-bold-italic text-white" :style="`background-color:${data.color}`">
                            {{ data.nombre }}
                        </div>
                        <div class="build-spacer text-center pt-2" :style="`border-color:${data.color}`">
                            <div v-for="(m,key2) in data.miembros" :key="`m1-${key2}`" class="row mx-0 px-3 mb-2">
                                <div class="pill p-1" :class="{'bg-red':data.promedio_miembros > m.cant_participaciones}">
                                    {{ m.cant_participaciones }}
                                </div>
                                <p class="col f-12 text-left" :class="{'f-600':m.lider}">
                                    {{ m.nombre_completo }}
                                </p>
                            </div>
                        </div>
                        <div class="row mx-0 image-tribu bg-white d-flex j-center">
                            <el-tooltip placement="top" effect="light">
                                <div slot="content">
                                    <p class="f-22 text-black font-black">
                                        <img src="/img/ilustraciones/ganador_detalle.svg" width="30" height="30" class="obj-cover rounded-circle" />
                                        {{ agregarSeparadoresNumero(data.puntos_retos) }}
                                    </p>
                                    <p class="f-22 text-black font-black my-1">
                                        <img src="/img/ilustraciones/medalla_ventas.svg" width="30" height="30" class="obj-cover rounded-circle" />
                                        {{ agregarSeparadoresNumero(data.puntos_torneos) }}
                                    </p>
                                    <p class="f-22 text-black font-black">
                                        <img src="/img/logos/bell_leeche.png" width="30" height="30" class="obj-cover rounded-circle" />
                                        {{ agregarSeparadoresNumero(data.puntos_leeche) }}
                                    </p>
                                </div>
                                <img :src="data.logo" width="60" height="60" class="obj-cover rounded-circle" />
                            </el-tooltip>
                        </div>
                        <div class="end-shield bg-white f-26 font-black d-flex align-items-end j-center">
                            {{ agregarSeparadoresNumero(data.total_puntos) }}
                        </div>
                    </div>
                    <div class="col-auto px-5" />
                    <div v-for="(data,key) in teamRestantes" :key="`post-${key}`" class="card-shield-tribu mr-3 cr-pointer" @click="verTribu(data.id)">
                        <div class="team-name" style="height:33px;" />
                        <div class="mt-1 text-center text-black-50" style="height:122px;width:100%;border-radius:6px 6px 0px 0px; background-color: #e9e9e9;">
                            <div class="row d-middle-center  f-600 f-60">
                                {{ key + 4 }}
                            </div>
                            <div class="row mx-2 f-13 justify-content-between">
                                <el-tooltip placement="bottom" content="Retos totales" effect="light">
                                    <div class="px-2 bg-black br-12 text-white">
                                        {{ data.cant_total_participaciones }}
                                        <i class="icon-calendario-ok" />
                                    </div>
                                </el-tooltip>
                                <div class="px-2 bg-black br-12 text-white">
                                    <el-tooltip placement="bottom" content="Retos en la semana anterior" effect="light">
                                        <b>{{ data.cant_participaciones_semana_anterior }}</b> 
                                    </el-tooltip>
                                    <el-tooltip placement="bottom" content="Retos en la semana actual" effect="light">
                                        <b> - {{ data.cant_participaciones_actuales }}</b>
                                    </el-tooltip>
                                    <i class="icon-calendario-rango" />
                                </div>
                            </div>
                        </div>
                        <div class="title-place font-bold-italic text-white" :style="`background-color:${data.color}`">
                            {{ data.nombre }}
                        </div>
                        <div class="build-spacer text-center pt-2" :style="`border-color:${data.color}`">
                            <div v-for="(m,key2) in data.miembros" :key="`m2-${key2}`" class="row mx-0 px-3 mb-2">
                                <div class="pill p-1" :class="{'bg-red':data.promedio_miembros > m.cant_participaciones}">
                                    {{ m.cant_participaciones }}
                                </div>
                                <p class="col f-12 text-left" :class="{'f-600':m.lider}">
                                    {{ m.nombre_completo }}
                                </p>
                            </div>
                        </div>
                        <div class="row mx-0 image-tribu bg-white d-flex j-center" :style="`border-right:2px solid ${data.color};border-left:2px solid ${data.color}`">
                            <el-tooltip placement="top" effect="light">
                                <div slot="content">
                                    <p class="f-22 text-black font-black">
                                        <img src="/img/ilustraciones/ganador_detalle.svg" width="30" height="30" class="obj-cover rounded-circle" />
                                        {{ agregarSeparadoresNumero(data.puntos_retos) }}
                                    </p>
                                    <p class="f-22 text-black font-black my-1">
                                        <img src="/img/ilustraciones/medalla_ventas.svg" width="30" height="30" class="obj-cover rounded-circle" />
                                        {{ agregarSeparadoresNumero(data.puntos_torneos) }}
                                    </p>
                                    <p class="f-22 text-black font-black">
                                        <img src="/img/logos/bell_leeche.png" width="30" height="30" class="obj-cover rounded-circle" />
                                        {{ agregarSeparadoresNumero(data.puntos_leeche) }}
                                    </p>
                                </div>
                                <img :src="data.logo" width="60" height="60" class="obj-cover rounded-circle" />
                            </el-tooltip>
                        </div>
                        <div class="end-shield bg-white f-26 font-black d-flex align-items-end j-center" :style="`--color-shield:${data.color}`">
                            {{ agregarSeparadoresNumero(data.total_puntos) }}
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="teamLideres.length >= 1" class="col-auto d-middle">
                <div class="d-middle j-center rounded-circle bg-white border" style="width:32px;height:32px;" @click="verDerecha">
                    <i class="icon-chevron-right f-29 cr-pointer" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Home from '~/services/home/home'
export default {
    data() {
        return {
            teamLideres:[],
            teamRestantes:[],
            loading:true
        }
    },
    created() {
        this.load()
    },
    methods:{
        async load() {
            try {
                const {data} = await Home.getTribus()

                this.teamLideres = data.tribus.slice(0,3)
                
                
                this.teamLideres[0].titulo = "CANCÚN"
                this.teamLideres[0].imagen = "/img/ilustraciones/cancun.png"

                this.teamLideres[1].titulo = "SAN ANDRÉS"
                this.teamLideres[1].imagen = "/img/ilustraciones/san-andres.png"

                this.teamLideres[2].titulo = "CARTAGENA"
                this.teamLideres[2].imagen = "/img/ilustraciones/cartagena.jpg"


                this.teamRestantes = data.tribus.slice(3, data.tribus.length)


            } catch (error) {
                console.log(error);
                this.errorCatch(error)
            } finally {
                this.loading = false
            }
        },
        verIzquierda() {
            let container = document.querySelector('#content-scroll');
            container.scrollLeft -= 125;
            
        },
        verDerecha() {
            let container = document.querySelector('#content-scroll');
            container.scrollLeft += 125;
        },
        verTribu(id) {
            this.$router.push({name:'tribu.ver',params:{id_tribu:id}})
            
        }
    }
}
</script>
<style lang="scss" scoped>
 .card-shield-tribu{
     width: 220px;
     min-height: 412px;
     position: relative;
     /* box-shadow: 0px 3px 6px #00000014; */
     display: flex; 
     flex-direction: column;
     .box-card{
         .img-card{ border-radius: 6px 6px 0px 0px; }
     }

     .pill{
         display: flex;
         align-items: center;
         font-size: 12px;
         color: #FFFFFF;
         justify-content: center;
         min-width: 18px;
         height: 18px;
         background-color: #000000;
         border-radius: 20px;
     }
     .title-place{
         height: 27px;
         display: flex;
         align-items: center;
         justify-content: center;
         background-color: red;
         font-size: 16px;
     }
    .build-spacer{
        background-color: #FFFFFF;
        border-left: 2px solid;
        border-right: 2px solid;
        border-top: 2px solid;
        border-color: red;
        /* display: grid; grid-template-rows: 100px */
        flex-grow: 1;
        //height: 50%;
    }
    .image-tribu{
        border-left: 2px solid var(--color-shield);
        border-right: 2px solid var(--color-shield);
    }
    .end-shield{
        height: 45px;
        border-left: 2px solid var(--color-shield);
        border-right: 2px solid var(--color-shield);
        z-index: 2;
        border-radius: 0px 0px 8px 8px;
        &:after{
            transform: rotate(15deg)translate(9px, -2px);
            background-color: #FFFFFF;
            content: '';
            position: absolute;
            left: -5px;
            border-radius: 0px 0px 4px 7px;
            z-index: -1;
            bottom: -16px;
            border-bottom: 2px solid var(--color-shield);
            width: 117px;
            height: 50px;
        }
        &:before{
            transform: rotate(-15deg)translate(-9px, -2px);
            background-color: #FFFFFF;
            content: '';
            position: absolute;
            right: -5px;
            border-radius: 0px 0px 7px 4px;
            z-index: -11;
            bottom: -16px;
            border-bottom: 2px solid var(--color-shield);
            width: 117px;
            height: 50px;
        }
    }

 }
</style>