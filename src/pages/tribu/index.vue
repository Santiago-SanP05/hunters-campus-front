<template>
    <section>
        <section v-if="!showError" class="custom-scroll overflow-auto px-5 pt-3" style="height:calc(100vh - 100px)">
            <div class="row mx-0">
                <div class="col-5">
                    <div class="row mx-0">
                        <div class="btn-grey px-3" @click="$router.push({name:'home.desafios-disponibles'})">
                            <i class="icon-arrow-back f-14" />
                            <span class="font-medium-italic ml-2">REGRESAR</span>
                        </div>
                    </div>
                    <div class="row mx-0 mt-4">
                        <img :src="user.imagen" width="122" height="122" class="br-4 obj-cover" />
                        <div class="col-auto">
                            <div class="inclinacion font-bold-italic text-white ml-3 f-36 d-middle-center" style="width:46px;height:46px;" :style="{backgroundColor: _.get(user, 'color', 'red')}">
                                {{ _.get(user, 'posicion', '0') }}°
                            </div>
                        </div>
                        <div class="col">
                            <p class="f-50 font-medium-italic lh-32">
                                {{ _.get(user, 'nombre', '') }}
                            </p>
                            <p class="f-46 text-red f-600 font-black-italic">
                                {{ agregarSeparadoresNumero(user.puntos) }} pts.
                            </p>
                        </div>
                    </div>
                    <div class="row mx-0 mt-3">
                        <div style="width:122px;">
                            <p class="f-600 text-center">
                                DESAFIOS
                            </p>
                            <div class="row mx-0 j-center my-3 mb-4">
                                <div class="shield-winners">
                                    <div class="text-field bg-green d-middle-center">
                                        Ganados
                                    </div>
                                    <div class="field-numbers d-middle-center f-40 font-black-italic">
                                        {{ ganados }}
                                    </div>
                                    <div class="field-numbers d-middle-center f-13 font-black-italic">
                                        {{ puntosGanados }}
                                    </div>
                                    <div class="end-shield" />
                                </div>
                            </div>
                            <div class="row mx-0 j-center my-3 mb-4">
                                <div class="shield-lost">
                                    <div class="text-field bg-red d-middle-center">
                                        Perdidos
                                    </div>
                                    <div class="field-numbers d-middle-center f-40 font-black-italic">
                                        {{ perdidos }}
                                    </div>
                                    <div class="field-numbers d-middle-center f-13 font-black-italic">
                                        {{ puntosPerdidos }}
                                    </div>
                                    <div class="end-shield" />
                                </div>
                            </div>
                            <div class="inclinacion border-black h-32x d-middle">
                                <div class="h-100 d-middle-center bg-black w-75 text-white">
                                    ENVIADOS
                                </div>
                                <div class="h-100 d-middle-center w-25">
                                    {{ enviados }}
                                </div>
                            </div>
                            <div class="inclinacion border-black h-32x d-middle mt-3">
                                <div class="h-100 d-middle-center bg-black w-75 text-white">
                                    ACEPTADOS
                                </div>
                                <div class="h-100 d-middle-center w-25">
                                    {{ aceptados }}
                                </div>
                            </div>
                        </div>
                        
                        <div class="col pl-5">
                            <div v-for="(m,key2) in miembros" :key="`m2-${key2}`" class="row a-center j-center mx-0 px-3 mb-2">
                                <div class="pill p-1" :class="{'bg-red':user.promedio_puntos > m.cant_participaciones}">
                                    {{ m.cant_participaciones }}
                                </div>
                                <p class="col f-18 text-left" :class="{'f-600':m.lider}">
                                    {{ m.nombre_completo }}  <i v-show="m.estado == 0" class="icon-user-inactive" />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="row mx-0 py-5" />
                    <div class="row mx-0 a-center">
                        <img src="/img/logos/bell_leeche.png" width="30" height="30" />
                        <p class="col-auto font-medium-italic f-30">
                            Puntos por compras en Leeche
                        </p>
                    </div>
                    <div class="row mx-0">
                        <div class="col-12 mt-4">
                            <echart :options="chart_Crecimiento" />
                        </div>
                    </div>
                    <div class="row mx-0 py-3" />
                    <div class="row mx-0 inclinacion position-relative progress-points" style="">
                        <div class="inclinacion h-100 bg-red position-absolute" :style="`width:${porcentajeAcumulado}%`" />
                        <span class="position-absolute f-18 f-600 font-bold-italic" style="left:50%;top:16px;"> {{ porcentajeAcumulado.toFixed(1) }}%. </span>    
                        <span class="position-absolute f-18 f-400" style="left:-21px;top:16px;">{{ agregarSeparadoresNumero(totalAcumulado) }} pts</span>
                        <span class="position-absolute f-18 f-400" style="right:-21px;top:16px;">300.000 pts.</span>
                    </div>
                    <div class="row mx-0 py-5" />
                    <p class="f-30 font-medium-italic mb-3">
                        Participación de los integrantes
                    </p>
                    <div v-for="(m, idx) in miembrosParticipacion" :key="idx" class="row mx-0 a-center mb-3">
                        <div class="col-auto">
                            <el-tooltip placement="bottom" :content="`ID: ${m.leeche_cliente_id}`" effect="light">
                                <i v-if="m.leeche_cliente_id" class="icon-check f-20" style="color:#0090ff" />
                            </el-tooltip>
                        </div>
                        <div class="col px-0">
                            <div class="row mx-0">
                                <p class="col-12 px-0  f-18 lh-21">
                                    {{ m.nombre_completo }} <i v-show="m.estado == 0" class="icon-user-inactive" />
                                </p>
                                <div class="col-9 px-0 progress-points inclinacion">
                                    <div class="h-100 bg-red" :style="`width:${m.porcentaje_interno}%`" />
                                </div>
                                <div class="col-auto px-2 font-bold-italic">
                                    {{ agregarSeparadoresNumero(m.compras) }}
                                </div>
                                <div class="col-auto px-2">
                                    {{ m.porcentaje_general.toFixed(1) }}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row mx-0 justify-content-end">
                        <div class="col-9 px-0">
                            <p class="f-30 font-medium-italic lh-32 mb-2">
                                Historial de puntos
                            </p>
                            <div class="row mx-0 mb-4">
                                <img src="/img/ilustraciones/ganador_detalle.svg" width="30" height="30" />
                                <div class="col-auto px-1 text-general f-16">
                                    Desafio
                                </div>
                                <img src="/img/ilustraciones/medalla_puntos.svg" width="30" height="30" />
                                <div class="col-auto px-1 text-general f-16">
                                    Torneos especiales
                                </div>
                                <img src="/img/ilustraciones/medalla_ventas.svg" width="30" height="30" />
                                <div class="col-auto px-1 text-general f-16">
                                    Otros puntos
                                </div>
                            </div>
                            <div v-for="historial in puntos" :key="historial.id" class="row mx-0 mb-3 cr-pointer" @click="goTo(historial)">
                                <div class="col-auto inclinacion px-2 bg-general" />
                                <div class="col bg-fondo d-flex inclinacion ml-2 py-2">
                                    <img :src="historialImagen(historial)" />
                                    <div class="col pr-2">
                                        <p class="f-25 lh-32 font-black-italic f-600" :class="setColorPts(historial)">
                                            {{ signoPts(historial) }}{{ historial.puntos_afectados || 0 }} pts.
                                        </p>
                                        <p class="f-17">
                                            {{ historial.nombre }}
                                        </p>
                                    </div>
                                    <div class="col-auto pt-1 px-2 text-general">
                                        <i class="icon-date-end f-18" />
                                        {{ historial.fecha | helper-fecha('DD MMM YYYY') }}
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </section>
        <error v-else mensaje="No existe la tribu" />
    </section>
</template>

<script>
import Vue from 'vue'
import echarts from 'echarts'
Vue.component('echarts',echarts);

import detalle from '~/services/tribus/detalle'


export default {
    data() {
        return {
            showError: false,
            ganados: 0,
            ganadosPuntos: 0,
            aceptados: 0,
            enviados: 0,
            perdidos: 0,
            puntosPerdidos: 0,
            totalAcumulado: 0,
            porcentajeAcumulado:0,
            puntos: [],
            miembros: [],
            miembrosParticipacion: [],
            grafica: [],
            user: {},

            chart_Crecimiento : {
                backgroundColor: '#fff',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        label: {
                            show: true,
                            backgroundColor: '#fff',
                            color: '#556677',
                            borderColor: 'rgba(0,0,0,0)',
                            shadowColor: 'rgba(0,0,0,0)',
                            shadowOffsetY: 0
                        },
                        lineStyle: {
                            width: 1
                        }
                    },
                    backgroundColor: '#fff',
                    textStyle: {
                        color: '#5c6c7c'
                    },
                    padding: [5, 5],
                    extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
                },
                xAxis: [
                    {
                        type: 'category',
                        // data: ['Ener', 'Feb', 'Mar', 'abril', 'may','jun'],
                        axisLine: {
                            lineStyle: {
                                color: '#DCE2E8'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                color: '#556677'
                            },
                            fontSize: 12,
                            margin: 15
                        },
                        axisPointer: {
                            label: {
                                padding: [0, 0, 10, 0],
                                margin: 15,
                                fontSize: 12,
                                backgroundColor: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: '#fff'
                                    }, {

                                        offset: 0.86,
                                        color: '#fff'
                                    }, {
                                        offset: 0.86,
                                        color: '#FF1720',
                                    }, {
                                        offset: 1,
                                        color: '#FF1720',
                                    }],
                                    global: false
                                }
                            }
                        },
                        boundaryGap: false
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#DCE2E8'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#556677'
                            }
                        },
                        splitLine: {
                            show: true
                        }
                    }, {
                        type: 'value',
                        position: 'right',
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#556677'
                            },
                            formatter: '{value}'
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#DCE2E8'
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                dataset:{
                    dimensions:['nombre','total'],
                    source: []
                },
                series: [
                    {
                        name: 'Puntos',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 10,
                        smooth: true,
                        yAxisIndex: 0,
                        showSymbol: false,
                        lineStyle: {
                            width: 5,
                            color: '#FF1720',
                            shadowColor: 'rgba(158,135,255, 0.3)',
                            shadowBlur: 10,
                            shadowOffsetY: 20
                        },
                        itemStyle: {
                            normal: {
                                color:  '#FF1720',
                                borderColor: '#FF1720'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#E5E5E5'
                                },
                                {
                                    offset: 1,
                                    color: '#F0F0F0'
                                }
                                ], false)
                            }
                        },
                    }
                ]
            },
        }
    },
    async mounted() {
        await this.detalle()
    },
    methods: {
        signoPts(puntos) {
            return puntos.puntos_nuevos - puntos.puntos_anteriores <= 0 ? '-' : '+'
        },
        setColorPts(puntos) {
            return puntos.puntos_nuevos - puntos.puntos_anteriores <= 0 ? 'text-red' : 'text-green'
        },
        historialImagen({tipo}) {
            if(tipo == 1) return '/img/ilustraciones/ganador_detalle.svg'
            if(tipo == 2) return '/img/ilustraciones/medalla_puntos.svg'
            if(tipo == 3) return '/img/ilustraciones/medalla_ventas.svg'
            return ''
        },
        async detalle() {
            try {
                const { data } = await detalle.datos(this.$route.params.id_tribu);
                this.ganados = data.ganados
                this.puntosGanados = data.puntos_ganados
                this.aceptados = data.aceptados
                this.enviados = data.enviados
                this.perdidos = data.perdidos
                this.puntosPerdidos = data.puntos_perdidos
                this.puntos = data.puntos
                this.user = data.user
                this.miembros = data.miembros
                this.miembrosParticipacion = data.miembros_participacion
                this.grafica = data.grafica
                this.totalAcumulado = data.total_acumulado
                this.chart_Crecimiento.dataset.source = data.grafica
                this.porcentajeAcumulado = (this.totalAcumulado / 300000) * 100
            } catch (error) {
                if (_.get(error, 'response.data.cod') == 'tne') {
                    this.showError = true
                } else {
                    this.errorCatch(error)
                }
            }
        },
        goTo(historial) {
            if(historial.tipo == 1) return this.$router.push({ name: 'desafio.detalle', params: { id_desafio: historial.id_reto } })
            if(historial.tipo == 2) return this.$router.push({ name: 'torneo', params: { id_torneo: historial.id_torneo } })
            if(historial.tipo == 3) return this.$router.push({ name: 'puntos.detalle', params: { id_punto: historial.id } })
            
        }
    }
}
</script>
<style lang="scss" scoped>
.f-50{
    font-size: 50px;
}
.f-46{
    font-size: 46px;
}
.f-25{
    font-size: 25px;
}

.progress-points{
    border: 1px solid #DFE4E8;
    height:15px;
    background-color:#F6F9FB;
}

.shield-winners{
    width: 84px;
    border-right: 2px solid var(--color-green);
    border-left: 2px solid var(--color-green);
    display: flex; 
     flex-direction: column;
    height: 105px;
    .text-field{
        height: 23px;
        color: #FFFFFF;
        
    }
    .field-numbers{
        flex-grow: 1;
    }
    .end-shield{
        height: 0px;
        /* border-left: 2px solid var(--color-green);
        border-right: 2px solid var(--color-green); */
        z-index: 2;
        border-radius: 0px 0px 8px 8px;
        position: relative;
        &:after{
            transform: rotate(16deg)translate(6px, -9px);
            content: '';
            position: absolute;
            left: -5px;
            border-radius: 0px 0px 4px 5px;
            z-index: -1;
            bottom: -14px;
            border-bottom: 2px solid var(--color-green);
            width: 45px;
            height: 50px;
        }
        &:before{
            transform: rotate(-15deg)translate(-6px, -11px);
            content: '';
            position: absolute;
            right: -5px;
            border-radius: 0px 0px 5px 4px;
            z-index: -11;
            bottom: -16px;
            border-bottom: 2px solid var(--color-green);
            width: 45px;
            height: 50px;
        }
    }
}
.shield-lost{
    width: 84px;
    border-right: 2px solid var(--color-red);
    border-left: 2px solid var(--color-red);
    height: 105px;
    display: flex; 
     flex-direction: column;
    .text-field{
        height: 23px;
        color: #FFFFFF;
    }
    .field-numbers{
        flex-grow: 1;
    }
    .end-shield{
        height: 0px;
        /* border-left: 2px solid var(--color-green);
        border-right: 2px solid var(--color-green); */
        z-index: 2;
        border-radius: 0px 0px 8px 8px;
        position: relative;
        &:after{
            transform: rotate(16deg)translate(6px, -9px);
            content: '';
            position: absolute;
            left: -5px;
            border-radius: 0px 0px 4px 5px;
            z-index: -1;
            bottom: -14px;
            border-bottom: 2px solid var(--color-red);
            width: 45px;
            height: 50px;
        }
        &:before{
            transform: rotate(-15deg)translate(-6px, -11px);
            content: '';
            position: absolute;
            right: -5px;
            border-radius: 0px 0px 5px 4px;
            z-index: -11;
            bottom: -16px;
            border-bottom: 2px solid var(--color-red);
            width: 45px;
            height: 50px;
        }
    }
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
</style>