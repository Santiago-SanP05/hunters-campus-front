<template>
    <section v-loading="loading" class="custom-scroll overflow-auto" style="height:calc(100vh - 100px)">
        <div class="row mx-0 pl-5 pt-4">
            <div class="btn-grey px-3 mt-2" @click="$router.back()">
                <i class="icon-arrow-back f-14" />
                <span class="ml-2">REGRESAR</span>
            </div>
            <div class="col-8 pl-4">
                <div class="row mx-0 a-center">
                    <div class="col-auto px-0 font-bold-italic f-28">
                        ACTUALIZAR PUNTUACIÓN
                    </div>
                    <div class="btn-general px-3 ml-auto" @click="modalGuardar">
                        GUARDAR
                    </div>
                </div>
                <p class="f-18 my-3">
                    Indica los puntos, los juegos y las victorias de cada tribu de este torneo
                </p>
                <div class="row mx-0 my-4">
                    <div class="col-4 text-general f-20 d-middle">
                        <div class="mr-2" style="width:40px;height:5px;" />
                        Tribus
                    </div>
                    <div class="col text-center text-general f-20">
                        Puntos de juego
                    </div>
                    <div class="col text-center text-general f-20">
                        Juegos
                    </div>
                    <div class="col pr-0 text-center text-general f-20">
                        Victorias
                    </div>
                </div>
                <ValidationObserver ref="form1">
                    <div v-for="tribu in resultados" :key="tribu.id" class="row mx-0 mb-3">
                        <div class="col-4 f-20 d-middle">
                            <img v-if="tribu.logo" :src="tribu.logo" class="obj-cover rounded-circle mr-2" width="40" height="40" />
                            <img v-else src="/img/no-imagenes/tribu_no_imagen.svg" class="obj-cover rounded-circle mr-2" width="40" height="40" />
                            {{ tribu.nombre }}
                        </div>
                        <div class="col text-center font-black-italic f-20">
                            <ValidationProvider v-slot="{ errors }" :name="'puntos'+tribu.id" rules="required|numeric">
                                <el-input v-model="tribu.torneo.puntos" type="number" class="w-100" placeholder="Puntos" />
                                <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                            </ValidationProvider>
                        </div>
                        <div class="col text-center font-black-italic f-20">
                            <ValidationProvider v-slot="{ errors }" :name="'juegos'+tribu.id" rules="required|numeric">
                                <el-input v-model="tribu.torneo.juegos" type="number" class="w-100" placeholder="Juegos" />
                                <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                            </ValidationProvider>
                        </div>
                        <div class="col pr-0 text-center font-black-italic f-20">
                            <ValidationProvider v-slot="{ errors }" :name="'victorias'+tribu.id" rules="required|numeric">
                                <el-input v-model="tribu.torneo.victorias" type="number" class="w-100" placeholder="Victorias" />
                                <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                            </ValidationProvider>
                        </div>
                    </div>
                </ValidationObserver>
            </div>
        </div>
        <modal ref="modalActualizarPuntos" titulo="ACTUALIZAR PUNTOS" no-aceptar adicional="ACEPTAR" @adicional="guardar">
            <div class="row mx-0 j-center">
                <div class="col-8">
                    <p class="f-18 f-400">
                        Ingresa tu contraseña de administrador para aceptar el desafio
                    </p>
                    <p class="label-mini mt-4 f-600">
                        Contraseña
                    </p>
                    <el-input v-model="password" type="password" placeholder="Contraseña" class="w-100" />
                </div>
            </div>
        </modal>
    </section>
</template>

<script>
import Torneos from '~/services/torneos'
export default {
    data() {
        return {
            loading: false,
            resultados:[],
            password: ''
        }
    },
    created() {
        this.ranking()
    },
    methods:{
        async modalGuardar() {
            const isValid = await this.$refs.form1.validate()
            if (isValid) {
                this.$refs.modalActualizarPuntos.toggle()
            }

        },
        async ranking() {
            try {
                this.loading = true
                const {data} = await Torneos.ranking(this.$route.params.id_torneo)
                this.resultados = data.data.ranking
                this.loading = false
                    
            } catch (e) {
                console.log(e)
            }
        },
        async guardar() {
            try {
                const isValid = await this.$refs.form1.validate()
                if (isValid) {
                    this.loading = true
                    let payload = {
                        password: this.password,
                        resultados : this.resultados
                    }
                    const {data} = await Torneos.guardarPuntuacion(this.$route.params.id_torneo,payload)
                    if(data.success) {
                        this.$notify({
                            title: 'Actualización de puntos de torneo',
                            message: data.mensaje,
                            type: 'success'
                        });
                        this.$refs.modalActualizarPuntos.toggle()
                        this.password = ''
                        this.$router.push({name: 'torneo', params:{id_torneo:this.$route.params.id_torneo}});
                    }else{
                        this.$notify({
                            title: 'Actualización de puntos de torneo',
                            message: data.mensaje,
                            type: 'warning'
                        });
                        this.loading = false                    
                    }
                }          
                
                
            } catch (e) {
                this.loading = false                    
            }
        }        
    }
}
</script>