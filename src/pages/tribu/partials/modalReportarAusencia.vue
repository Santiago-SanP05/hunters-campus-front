<template>
    <modal ref="modalReportarAusencia" titulo="Reportar Ausencia" no-aceptar adicional="Reportar" @adicional="reportarAusencia">
        <div v-loading="loading" class="row mx-0">
            <ValidationObserver ref="form1">
                <div class="row mx-0 j-center">
                    <div class="col-10 px-0">
                        <p class="label-mini">
                            Seleccionar tribu
                        </p>
                        <ValidationProvider v-slot="{ errors }" :name="'tribu'" rules="required">
                            <el-select v-model="tribu" placeholder="Seleccionar tribu" class="w-100">
                                <el-option
                                v-for="t in tribus"
                                :key="t.id"
                                :label="t.nombre"
                                :value="t.id"
                                />
                            </el-select>
                            <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                        </ValidationProvider>
                    </div>
                    <div class="col-10 px-0 my-3">
                        <p class="label-mini">
                            Integrante
                        </p>
                        <ValidationProvider v-slot="{ errors }" :name="'integrante'" rules="required">
                            <el-select v-model="integrante" placeholder="Seleccionar integrante" class="w-100">
                                <el-option
                                v-for="i in integrantes"
                                :key="i.id"
                                :label="i.nombre"
                                :value="i.id"
                                />
                            </el-select>
                            <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                        </ValidationProvider>
                    </div>
                    <div class="col-10 px-0 my-3">
                        <p class="label-mini">
                            Comentario
                        </p>
                        <ValidationProvider v-slot="{ errors }" :name="'comentario'" rules="required">
                            <el-input v-model="comentario" maxlength="300" placeholder="Comentario" type="textarea" :rows="5" show-word-limit />
                            <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                        </ValidationProvider>
                    </div>
                    <div class="col-10 px-0 f-18 f-400 mt-4 mb-2 px-0">
                        Ingresa tu contraseña de administrador para reportar
                    </div>
                    <div class="col-10 px-0">
                        <p class="label-mini">
                            Contraseña
                        </p>
                        <ValidationProvider v-slot="{ errors }" :name="'password'" rules="required">
                            <el-input v-model="password" type="password" class="w-100" />
                            <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                        </ValidationProvider>
                    </div>
                </div>
            </ValidationObserver>
        </div>
    </modal>
</template>

<script>
import Torneos from '~/services/torneos'
import Util from '~/services/util'
export default {
    data() {
        return {
            loading: false,
            tribus: [],
            tribu: null,
            integrantes: [],
            integrante: null,
            comentario: '',
            password: '',
        }
    },
    watch:{
        tribu: {
            handler(val) {
                this.obtenerIntegrantes(val)
            },
            deep: true
        },
    },
    created() {
        this.obtenerTribus()
    },    
    methods:{
        toggle() {
            this.$refs.modalReportarAusencia.toggle();
        },
        async obtenerTribus() {
            try {
                this.loading = true

                const {data} = await Util.tribusSelect()

                this.tribus = data.data
                this.loading = false                    
            } catch (e) {
                console.log(e)
            }
        },
        async obtenerIntegrantes(id) {
            try {
                this.loading = true

                const {data} = await Util.integrantesTribuSelect(id)
                this.integrantes = data.data
                this.integrante = null
                this.loading = false
                    
            } catch (e) {
                console.log(e)
            }
        },
        async reportarAusencia() {
            try {
                this.loading = true

                
                const isValid = await this.$refs.form1.validate()
                if (isValid) {
                    let payload = {
                        id_miembro: this.integrante,
                        comentario: this.comentario,
                        password: this.password
                    }
                    const {data} = await Torneos.reportarAusencia(this.$route.params.id_torneo, payload)
                    if(data.success) {
                        this.reset()
                        this.$refs.modalReportarAusencia.toggle();
                        this.$notify({
                            title: 'reportar Ausencia',
                            message: data.mensaje,
                            type: 'success'
                        });
                        this.$parent.mostrar()
                        this.$parent.ranking()
                    }else{
                        this.$notify({
                            title: 'reportar Ausencia',
                            message: data.mensaje,
                            type: 'warning'
                        });
                    }
                }
                this.loading = false
                    
            } catch (e) {
                console.log(e)
            }
        },
        reset() {
            this.tribu= null
            this.integrantes= []
            this.integrante= null
            this.comentario= ''
            this.password= ''
        }
    }
}
</script>