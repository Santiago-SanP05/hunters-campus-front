<template>
    <section class="pl-5 pr-5 overflow-auto custom-scroll" style="height:calc(100vh - 180px)">
        <div class="row mx-0">
            <div class="btn-grey px-3 mt-2" @click="$router.back()">
                <i class="icon-arrow-back text-white f-14 mr-2" />
                REGRESAR
            </div>
            <div class="col ml-3">
                <p class="font-bold-italic f-28 mb-4">
                    CREAR DESAFIO
                </p>
                <ValidationObserver ref="form" v-slot="{ handleSubmit}">
                    <form class="row mx-0" @submit.prevent="handleSubmit(onSubmit)">
                        <div class="col-4">
                            <ValidationProvider v-slot="{ errors }" name="titulo" rules="required">
                                <p class="label-mini">
                                    Título del desafio
                                </p>
                                <el-input v-model="titulo" placeholder="Titulo" class="w-100" show-word-limit maxlength="60" />
                                <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                            </ValidationProvider>
                            <div class="row mx-0 py-3" />
                            <ValidationProvider v-slot="{ errors }" name="día" rules="required">
                                <p class="label-mini">
                                    Día del desafío
                                </p>
                                <el-date-picker
                                v-model="dia"
                                type="date"
                                class="w-100"
                                format="dd MMM yyyy"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickerOptions"
                                />
                                <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                            </ValidationProvider>
                            <div class="row mx-0 py-3" />
                            <ValidationProvider v-slot="{ errors }" name="hora" rules="required">
                                <p class="label-mini">
                                    Hora
                                </p>
                                <el-time-picker
                                v-model="hora"
                                size="small"
                                class="w-100"
                                :picker-options="{
                                    start: '07:30',
                                    step: '00:30',
                                    end: '24:00',
                                    format: 'hh:mm a',
                                    valueFormat:'HH:mm'
                                }"
                                format="hh:mm a"
                                value-format="HH:mm"
                                :clearable="false"
                                placeholder="Seleccione hora"
                                />
                                <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                            </ValidationProvider>

                            <div class="row mx-0 py-3" />
                            <ValidationProvider v-slot="{ errors }" name="lugar" rules="required">
                                <p class="label-mini">
                                    Lugar del desafío
                                </p>
                                <el-input v-model="lugar" placeholder="Lugar del desafío" class="w-100" show-word-limit maxlength="40" />
                                <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                            </ValidationProvider>
                            <div class="row mx-0 py-3" />
                            <ValidationProvider v-slot="{ errors }" name="puntos" :rules="rules">
                                <p class="label-mini">
                                    Puntos a apostar
                                </p>
                                <el-input v-model="puntos" placeholder="No. de puntos" class="w-100" />
                                <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                            </ValidationProvider>

                            <div class="row mx-0 py-3" />
                            <p class="label-mini">
                                Tribus en el desafio
                            </p>
                            <div class="row mx-0 mt-2">
                                <div v-for="tribu in tribus_desafio" :key="tribu" class="d-middle-center f-22 inclinacion button-tribu mr-2 cr-pointer" :class="cantidad == tribu ? 'active' : ''" @click="cantidad = tribu">
                                    {{ tribu }}
                                </div>        
                            </div>
                            <div class="row mx-0 py-4" />
                            <div class="row mx-0">
                                <button type="submit" class="btn-general px-4">
                                    CREAR
                                </button>
                            </div>
                        </div>
                        <div class="col-5">
                            <ValidationProvider v-slot="{ errors }" name="descripción" rules="required">
                                <p class="label-mini">
                                    Descripción del desafio
                                </p>
                                <el-input v-model="descripcion" placeholder="Descripción (Sea lo mas detallado)" class="w-100" type="textarea" :rows="20" show-word-limit maxlength="1200" />
                                <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                            </ValidationProvider>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
        <modal-pedir-password ref="modalPedirPassword" titulo="Crear desafio" texto="Ingresa tu contraseña de líder para guardar el desafio" @data="handleUsuario($event)" />
    </section>
</template>

<script>
import retos from "~/services/desafios/retos"
import moment from 'moment'
export default {
    name: 'CrearDesafio',
    data() {
        return {
            descripcion: '',
            titulo: '',
            dia: '',
            puntos: '',
            cantidad: 2,
            hora: '10:45',
            lugar: '',
            tribus_desafio: [2,3,4],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < moment().subtract(1,'days');
                }
            }
        }
    },
    computed: {
        rules() {
            let maxValue = 15000
            if(this.cantidad == 3) maxValue = 12000
            if(this.cantidad == 4) maxValue = 11000
            return {
                required: true,
                numeric: true,
                min_value: 6000,
                max_value: maxValue,
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.modalPedirPassword.toggle()
        },
        async handleUsuario(usuario) {
            try {
                if(usuario.tipo == 2) return this.notificacion('', 'No tienes permiso de crear un desafio', 'error')
                if (usuario.tipo == 1) {
                    this.$refs.modalPedirPassword.toggle()
                    let model = {
                        fecha: this.dia,
                        titulo: this.titulo,
                        descripcion: this.descripcion,
                        cantidad: this.cantidad,
                        hora: this.hora,
                        lugar: this.lugar,
                        puntos: this.puntos,
                        created_by: usuario.id,
                    }
                    const { data } = await retos.crear(model);
                    if(data.exito) {
                        this.$router.push({
                            name: 'desafio.detalle',
                            params: { id_desafio: data.model.id }
                        })
                    }
                }
            } catch (error) {
                this.errorCatch(error)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.button-tribu{
    width: 45px;
    height: 39px;
    background-color: #DFE4E8;
    color: #637381;
    &.active{
        background-color: #FF0000 !important;
        color: #FFFFFF !important;
    }
}
</style>
