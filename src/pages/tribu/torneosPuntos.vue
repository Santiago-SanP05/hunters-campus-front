<template>
    <section class="scroll-none overflow-auto px-5 pt-4" style="height:calc(100vh - 100px)">
        <div v-show="torneoValido">
            <div class="row mx-0">
                <div class="btn-grey px-3 mt-2" @click="$router.push({name:'torneo',params:{id_torneo:idTorneo}})">
                    <i class="icon-arrow-back f-14" />
                    <span class="font-medium-italic ml-2">REGRESAR</span>
                </div>
                <div class="col">
                    <div class="row mx-0 a-center justify-content-between">
                        <p class="col-auto px-0 f-28 font-bold-italic">
                            OTORGAR PUNTOS
                        </p>
                        <div class="btn-general px-3" @click="validar">
                            FINALIZAR
                        </div>
                    </div>
                    <p class="f-18 my-3">
                        Indica los puntos otorgados para cada una de las tribus.
                    </p>
                    <div v-for="(t,key) in tribus" :key="key" class="row mx-0 mb-4">
                        <div class="col-auto px-0">
                            <img :src="t.logo" width="62" height="62" class="rounded-circle obj-cover" />
                            <p class="mt-2 f-16 f-400">
                                {{ t.nombre }}
                            </p>
                        </div>
                        <div class="col-auto px-3" />
                        <div class="col-3">
                            <p class="label-mini">
                                Puntos a otorgar
                            </p>
                            <ValidationProvider :ref="`campo`" v-slot="{ errors }" name="puntos" rules="numeric|between:100,100000">
                                <el-input v-model="t.puntos" placeholder="No. de puntos" class="w-100" />
                                <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                            </ValidationProvider>
                        </div>
                        <div class="col-8">
                            <p class="label-mini">
                                Comentarios
                            </p>
                            <el-input v-model="t.comentario" placeholder="Comentarios" maxlength="300" class="w-100" />
                            <p v-show="!isNaN(t.puntos) && t.puntos != '' && t.comentario == ''" class="v-error w-100 f-11"> {{ errorComentario }} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <error v-show="!torneoValido" mensaje="ESTE TORNEO NO EXISTE O FUE ELIMINADO" />
        <!-- Partials -->
        <modal-pedir-password ref="modalPedirPassword" titulo="GUARDAR CAMBIOS" texto="Ingresa tu contraseña de administrador para guardar los cambios" @data="validarUsuario" />
    </section>
</template>

<script>
import Torneos from '~/services/torneos/index'
export default {
    
    data() {
        return{
            torneoValido:true,
            tribus:[],
            tribusAsignar:[],
            idUser:null,
            errorComentario:'Este campo es Requerido'
        }
    },
    computed:{
        idTorneo() {
            return this.$route.params.id_torneo
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        async load() {
            try {
                
                const {data} = await Torneos.getAsignarPuntos(this.idTorneo)
                this.tribus = data.tribus

            } catch (error) {
                //this.errorCatch(error)
                this.torneoValido = false
            }
        },
        validarUsuario(user) {
            //console.log(user);
            if(user.tipo === 2) {
                this.idUser = user.id
                this.asignarPuntosTorneo()
            }else{
                this.notificacion("ERROR","No tiene permiso para otorgar puntos",'warning')
            }
        },
        async asignarPuntosTorneo() {
            try {
                const form = {
                    id_torneo: this.idTorneo,
                    tribus: this.tribusAsignar,
                    id_user: this.idUser,
                }
                
                const {data} = await Torneos.asignarPuntosTorneo(form)
                this.notificacion("Exito","Puntos asignados correctamente",'success')
                this.$refs.modalPedirPassword.toggle();
                this.$router.push({name:'torneo',params:{id_torneo:this.idTorneo}})

            } catch (error) {
                this.$refs.modalPedirPassword.toggle();
                this.torneoValido = false
                //this.errorCatch(error)
            }
        },
        async validar() {

            let tribusAsiganar = []
            for (const key in this.tribus) {
                const {valid} = await this.$refs.campo[key].validate()

                if(!valid) {
                    this.notificacion("Advertencia","Tiene datos erroneos en su asignacion","warning")
                    return
                }

                if(this.tribus[key].puntos != '' && this.tribus[key].comentario == '') {
                    this.notificacion("Advertencia","Los comentarios son requeridos para las tribus con puntos","warning")
                    return
                }

                if(this.tribus[key].puntos != '' && this.tribus[key].comentario != '') {
                    tribusAsiganar.push({id:this.tribus[key].id, puntos:this.tribus[key].puntos, comentario:this.tribus[key].comentario})
                }

            }

            if(tribusAsiganar.length == 0) {
                this.notificacion("Advertencia","Por favor Llene los datos a ingresar","warning")
                return
            }

            this.tribusAsignar = tribusAsiganar

            this.$refs.modalPedirPassword.toggle();
        },
        finalizar() {
            this.$refs.modalPedirPassword.toggle();
        }
    }
}
</script>
<style lang="scss" scoped>
.box-title{
    width: 72px;
    height: 24px;
    font-size: 16px;
    &.active{
        background-color: #FF0000 !important;
        color: #FFFFFF !important;
    }
}
.active-image{
    border: 3px solid #FF0000;
}
</style>