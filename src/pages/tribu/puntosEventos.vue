<template>
    <section>
        <section v-if="!showError" class="pl-5 pt-5 scroll-none overflow-auto" style="height:calc(100vh - 100px)">
            <div class="row mx-0">
                <div class="btn-grey px-3" @click="$router.back()">
                    <i class="icon-arrow-back text-white f-14 mr-2" />
                    REGRESAR
                </div>
                <div class="col px-5">
                    <p class="f-28 font-bold-italic lh-32 f-600">
                        {{ punto.manual_nombre }}
                    </p>
                    <div class="row mx-0 mt-3">
                        <p class="col-auto px-0 mr-4 f-57 f-600 font-black-italic" :class="setColorPts(punto)">
                            {{ signoPts(punto) }}{{ punto.puntos_afectado }} pts.
                        </p>
                    </div>
                    <div class="row mx-0 py-3" />
                    <div class="row mx-0">
                        <img :src="lider.imagen" class="rounded-circle obj-cover cr-pointer" width="66" height="66" @click="irAPunto()" />
                        <div class="col px-4">
                            <p class="font-bold-italic f-21">
                                Lider: {{ lider.nombre }}
                            </p>
                            <p class="mt-2 f-18">
                                Asignado por: {{ created.nombre }}
                            </p>
                            <div class="row mx-0 text-general mt-1">
                                <i class="icon-date-end f-18" />
                                <p class="col f-17 px-2">
                                    {{ punto.created_at | helper-fecha('DD MMM YYYY hh:mm a') }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="row mx-0 py-3" />
                    <p class="mt-3 f-21 font-bold-italic">
                        Descripción
                    </p>
                    <p class="f-18 f-400 mt-2">
                        {{ punto.manual_descripcion }}
                    </p>
                </div>
            </div>
        </section>
        <error v-else mensaje="Punto no existe" />
    </section>
</template>

<script>
import verPunto from '~/services/puntos/verPunto'
export default {
    data() {
        return {
            showError:false,
            punto: {},
            created: {},
            lider: {},
        }
    },
    async mounted() {
        await this.verPunto()
    },
    methods: {
        async verPunto() {
            try {
                const { data } = await verPunto.datos(this.$route.params.id_punto);
                this.punto = data.punto
                this.created = data.created
                this.lider = data.lider
            } catch (error) {
                if (_.get(error, 'response.data.cod') == 'nep') {
                    this.showError = true
                } else {
                    this.errorCatch(error)
                }            }
        },
        signoPts(puntos) {
            return puntos.puntos_nuevos - puntos.puntos_anteriores <= 0 ? '-' : '+'
        },
        setColorPts(puntos) {
            return puntos.puntos_nuevos - puntos.puntos_anteriores <= 0 ? 'text-red' : 'text-green'
        },
        irAPunto() {
            this.$router.push({
                name:'tribu.ver',
                params:{ id_tribu: this.lider.tribu}
            })
        }
    }
}
</script>