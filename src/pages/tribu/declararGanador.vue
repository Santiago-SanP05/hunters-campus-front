<template>
    <section class="scroll-none overflow-auto px-5 pt-4" style="height:calc(100vh - 100px)">
        <div v-show="retoValido" class="row mx-0">
            <div class="btn-grey px-3 mt-2" @click="$router.push({name:'desafio.detalle',params:{id_desafio:idReto}})">
                <i class="icon-arrow-back f-14" />
                <span class="font-medium-italic ml-2">REGRESAR</span>
            </div>
            <div class="col">
                <div class="row mx-0 a-center justify-content-between">
                    <p class="col-auto px-0 f-28 font-bold-italic">
                        DECLARAR GANADOR
                    </p>
                    <div class="btn-general px-3" @click="validar">
                        FINALIZAR
                    </div>
                </div>
                <p class="f-18 my-3">
                    Selecciona la tribu ganadora y los integrantes de cada una de las tribus que participaron del desafío.
                </p>
                <div class="row mx-0 justify-content-between">
                    <template v-for="(data, key) in tribus">
                        <div :key="key" class="col-auto px-0">
                            <div class="row mx-0 j-center mb-3 cr-pointer" @click="ganador = data.id"> 
                                <img :src="data.logo" class="obj-cover rounded-circle" :class="ganador == data.id ? 'active-image' : ''" width="66" height="66" />
                                <div class="col-12 my-1" />
                                <div class="box-title d-middle-center" :class="ganador == data.id ? 'active' : ''">
                                    {{ data.nombre }}
                                </div>
                            </div>
                            <div v-for="(m,key2) in data.miembros" :key="key2" class="row mx-0 a-center" :class="key2 == 0 ? 'mb-3' : ''">
                                <el-checkbox v-model="m.checked" class="check-dark check-md" />
                                <p class="f-18 col">
                                    {{ m.nombre_completo }}
                                </p>
                            </div>
                        </div>
                        <div v-show="(key + 1) < tribus.length" :key="`vs-${key}`" class="col-auto f-22 font-bold-italic pt-3">
                            VS
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <error v-show="!retoValido" mensaje="ESTE DESAFIO NO SE PUEDE FINALIZAR" />
        <!-- Partials -->
        <modal-pedir-password ref="modalPedirPassword" titulo="GUARDAR CAMBIOS" texto="Ingresa tu contraseña para guardar los cambios" @data="validarUsuario" />
    </section>
</template>

<script>
import Retos from '~/services/retos/retos'
export default {

    data() {
        return{
            retoValido:true,
            ganador: null,
            tribus:[],
            idsHabilitados:[],
            usersParticiparon:[],
            idUser:null
        }
    },
    computed:{
        idReto() {
            return this.$route.params.id_reto
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        async load() {
            try {
                
                const {data} = await Retos.getDatos(this.idReto)
                this.tribus = data.tribus
                this.idsHabilitados = data.ids

            } catch (error) {
                //this.errorCatch(error)
                this.retoValido = false
            }
        },
        validarUsuario(user) {
            console.log(user);
            if(user.tipo === 1 && this.idsHabilitados.includes(user.id)) {
                this.idUser = user.id
                this.finalizarReto()
            }else{
                this.notificacion("ERROR","No tiene permiso para finalizar el desafio",'warning')
            }
        },
        async finalizarReto() {
            try {
                const form = {
                    id_reto: this.idReto,
                    ganador:this.ganador,
                    participantes: this.usersParticiparon,
                    id_user: this.idUser
                }
                
                const {data} = await Retos.finalizarReto(form)
                this.notificacion("Exito","Desafio finalizado correctamente",'success')
                this.$refs.modalPedirPassword.toggle();
                this.$router.push({name:'desafio.detalle',params:{id_desafio:this.idReto}})

            } catch (error) {
                this.$refs.modalPedirPassword.toggle();
                this.retoValido = false
                //this.errorCatch(error)
            }
        },
        validar() {
            this.usersParticiparon = []
            if(this.ganador === null) {
                this.notificacion("Advertencia","Por favor seleccione un ganador",'warning')
                return
            }
            
            let validCheck = false
            for (const t of this.tribus) {
                validCheck = false
                for (const m of t.miembros) {

                    if(m.checked) {
                        this.usersParticiparon.push(m.id_miembro)
                        validCheck = true
                    }

                }
                if(validCheck === false) {
                    this.notificacion("Advertencia","Por favor seleccione minimo un integrante de cada Tribu",'warning')
                    return
                }
            }

            this.$refs.modalPedirPassword.toggle();
        },
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