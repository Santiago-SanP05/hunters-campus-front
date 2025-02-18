<template>
    <section class="pl-5 pt-5 scroll-none overflow-auto" style="height:calc(100vh - 100px)">
        <div class="row mx-0">
            <div class="btn-grey px-3" @click="$router.push({name:'home.puntos-otros-eventos'})">
                <i class="icon-arrow-back text-white f-14 mr-2" />
                REGRESAR
            </div>
            <div class="col ml-3">
                <p class="font-bold-italic f-28 lh-32">
                    OTORGAR PUNTOS
                </p>
                <div class="row mx-0 mt-3">
                    <ValidationObserver ref="form1" class="row mx-0 w-100">
                        <div class="col-3 px-0 pb-5">
                            <p class="label-mini">
                                Título
                            </p>
                            <ValidationProvider v-slot="{ errors }" name="titulo" rules="required|max:70">
                                <el-input v-model="form.titulo" placeholder="Título" class="w-100" />
                                <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                            </ValidationProvider>
                            <div class="row mx-0 py-3" />
                            <div class="row mx-0">
                                <div class="col pl-0">
                                    <p class="label-mini">
                                        Puntos a sumar o restar
                                    </p>
                                    <ValidationProvider v-slot="{ errors }" name="puntos" rules="required|numeric|between:1000,100000">
                                        <el-input v-model="form.puntos" placeholder="No. de puntos" class="w-100" />
                                        <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                                    </ValidationProvider>
                                </div>
                                <div class="col-auto pl-0 d-flex align-items-end">
                                    <button type="button" class="inclinacion btn-add px-2" :style="`background-color:${afectacion == 1 ? 'green': ''}`" @click="afectacion = 1">
                                        <i class="icon-plus f-18" />
                                    </button>
                                    <button type="button" class="inclinacion btn-minus ml-2 px-2" :style="`background-color:${afectacion == 2 ? 'red': ''}`" @click="afectacion = 2">
                                        <i class="icon-minus f-18" />
                                    </button>
                                </div>
                            </div>
                            <div class="row mx-0 py-3" />
                            <p class="label-mini">
                                Seleccionar tribu
                            </p>
                            <ValidationProvider v-slot="{ errors }" name="tribu" rules="required">
                                <el-select v-model="idTribu" placeholder="Seleccionar" class="w-100" @change="selectedTribu">
                                    <el-option
                                    v-for="item in tribus"
                                    :key="item.id"
                                    :label="item.nombre"
                                    :value="item.id"
                                    />
                                </el-select>
                                <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                            </ValidationProvider>
                            <div class="row mx-0 py-3" />
                            <p class="label-mini">Seleccionar los participantes</p>
                            <div v-for="(m,key2) in miembros" :key="key2" class="row mx-0 a-center" :class="key2 == 0 ? 'mb-3' : ''">
                                <el-checkbox v-model="m.checked" class="check-dark check-md" />
                                <p class="f-18 col">
                                    {{ m.nombre_completo }}
                                </p>
                            </div>
                            <div class="row mx-0 py-3" />
                            <div class="row mx-0">
                                <div class="btn-general px-4" @click="validar">
                                    GUARDAR
                                </div>
                            </div>
                        </div>
                        <div class="col-4 ml-4">
                            <p class="label-mini">
                                Descripción del otorgamiento
                            </p>
                            <ValidationProvider v-slot="{ errors }" name="descripcion" rules="required|max:1000">
                                <el-input v-model="form.descripcion" placeholder="Descripción" type="textarea" :rows="20" class="w-100" />
                                <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                            </ValidationProvider>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>
        <modal-pedir-password ref="modalPedirPassword" titulo="GUARDAR CAMBIOS" texto="Ingresa tu contraseña de administrador para guardar los cambios" @data="validarUsuario" />
    </section>
</template>

<script>
import Torneos from '~/services/torneos/index'
export default {
    data() {
        return {
            form:{
                titulo:'',
                puntos:'',
                descripcion:'',
                id_tribu:null,
                participantes:[],
                id_user:null,
                afectacion:0
            },
            idUser:null,
            afectacion:1,
            idTribu:null,
            miembros:[],
            tribus:[]
        }
    },
    mounted() {
        this.load()
    },
    methods:{
        async load() {
            try {
                
                const {data} = await Torneos.eventoEspecial()
                this.tribus = data.tribus

            } catch (error) {
                this.errorCatch(error)
            }
        },
        async validar() {
            const valid = await this.$refs.form1.validate()
           
            if(!valid) return
            
            this.usersParticiparon = []

            this.usersParticiparon = _.map(_.filter(this.miembros, ['checked', true]),'id_miembro')
                 
            if(this.usersParticiparon.length === 0) {
                this.notificacion("Advertencia","Por favor seleccione minimo un integrante de la tribu",'warning')
                return
            }

            this.$refs.modalPedirPassword.toggle();
        },
        validarUsuario(user) {
            if(user.tipo === 2) {
                this.idUser = user.id
                this.asignarPuntosEvento()
            }else{
                this.notificacion("ERROR","No tiene permiso para otorgar puntos",'warning')
            }
        },
        async asignarPuntosEvento() {
            try {

                this.form.id_tribu = this.idTribu
                this.form.participantes = this.usersParticiparon
                this.form.id_user = this.idUser
                this.form.afectacion = this.afectacion
                
                const {data} = await Torneos.asignarPuntosEvento(this.form)
                this.notificacion("Exito","Puntos asignados correctamente",'success')
                this.$refs.modalPedirPassword.toggle();
                this.$router.push({name:'home.puntos-otros-eventos'})

            } catch (error) {
                this.errorCatch(error)
            }
        },
        selectedTribu() {
            this.miembros = []
            if(this.idTribu === null) return

            this.miembros = this.tribus.find(t=>t.id == this.idTribu).miembros
        }
    }
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
    
}
</style>