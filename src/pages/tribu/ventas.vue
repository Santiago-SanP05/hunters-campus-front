<template>
    <section class="pt-5 pl-5">
        <div class="row mx-0 pl-1 mb-3">
            <div class="col-auto text-black f-17 f-28 f-600 font-bold-italic">
                VENTAS DE PRODUCTOS LEECHE
            </div>
        </div>
        <div class="row mx-0">
            <div class="col-auto px-4 ml-3" />
            <div class="col-auto text-general f-20 text-center">
                Tribus
            </div>
        </div>
        <div v-for="(tr, key) in tribus" :key="key" class="row mx-0 align-items-center mb-3">
            <div class="col-3 d-middle">
                <img :src="tr.logo" width="48" height="48" class="obj-cover rounded-circle cr-pointer" @click="verTribu(tr.id)" />
                <div class="col f-20 text-black">
                    {{ tr.nombre }}
                </div>
            </div>
            <div class="col-6">
                <el-popover
                placement="bottom"
                width="200"
                trigger="hover"
                >
                    <div v-for="(mes, key2) in tr.meses" :key="`tool-${key2}`" class="row mx-0 mb-1 align-items-center">
                        <div :style="`width:14px;height:14px;background-color:${mes.color}`" />
                        <div class="col text-general f-16">
                            {{ mes.nombre }}
                        </div>
                        <div class="col text-general f-16 f-600 pr-0">
                            {{ agregarSeparadoresNumero(mes.total) }}
                        </div>
                    </div>
                    <div slot="reference" class="row mx-0 inclinacion bg-fondo border" style="height:9px">
                        <div v-for="(mes, key3) in tr.meses" :key="key3" class="h-100" :style="`width:${mes.porcentaje}%;background-color:${mes.color}`" />
                    </div>
                </el-popover>
            </div>
            <div class="col-auto px-2 font-bold-italic f-18">
                {{ agregarSeparadoresNumero(tr.total_ventas) }} 
            </div>
            <div class="col-auto px-3" />
            <div class="col-auto px-2 f-400 f-18">
                {{tr.miembros_verificados}}/{{tr.miembros_activos}}
            </div>
            <div v-if="tr.miembros_verificados == tr.miembros_activos" class="col-auto">
                <el-tooltip placement="bottom" effect="light">
                    <div slot="content">
                        <p class="text-general f-16">
                            Todos los Integrantes <br /> de la tribu verificados
                        </p>
                    </div>
                    <i class="icon-check f-20" style="color:#0090FF;" />
                </el-tooltip>
            </div>
        </div>
    </section>
</template>

<script>
import Ventas from '~/services/ventas/ventas'
export default {
    data() {
        return {
            tribus:[]
        }
    },
    mounted() {
        this.load()
    },
    methods:{
        async load() {
            const {data} = await Ventas.loadInformacion()
            this.tribus = data.tribus
        },
        verTribu(id) {
            this.$router.push({name:'tribu.ver',params:{id_tribu:id}})
            
        }
    }
}
</script>