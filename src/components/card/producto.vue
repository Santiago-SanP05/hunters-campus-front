<template>
    <div class="card-producto d-middle p-1" :class="diseno.border?border[diseno.color]:''">
        <div class="position-relative">
            <i v-if="diseno.posicion==0" class="icon-bookmark f-20 position-absolute" :class="text[diseno.color]" style="top:-6px;right:4px;" />
            <img class="br-10" height="90" width="90" src="https://img.culturacolectiva.com/content_image/2020/1/21/1579624512515-receta-de-frappe-de-chocolate-con-vino-tinto-en-5-minutos.003.jpeg" alt="" />
            <div
            class="position-absolute text-white w-100 f-10 text-center"
            :class="colores[diseno.color]"
            :style="diseno.posicion==0?'bottom:0px;border-radius: 0 0 10px 10px;':'top:0px;border-radius: 10px 10px 0 0;'"
            >
                MÁS BARATO
            </div>
        </div>
        <div class="col px-2">
            <p class="nombre lh-18 f-600">Malteada de vainilla Francesa con palitos de chocolate</p>
            <p>600ml</p>
            <div class="row mx-0 align-items-center pb-1">
                <span class="text-morado f-600">$12.000</span>
                <strike class="ml-2 f-12">$14.000</strike>
                <div class="cr-pointer text-center ml-auto br-10 bg-gr-red py-1 text-white" style="width:120px;">
                    Añadir
                </div>
                <el-input-number v-if="agregar" v-model="num" :min="1" :max="10" class="ml-auto" style="width:145px;" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        diseno: {
            type: Object,
            default: () => {
                return {
                    color: 0,
                    border: true,
                    posicion: 0,
                    texto: ''
                }
            }
        }
    },
    data(){
        return {
            num: 1,
            agregar: false,
            colores: [ 'bg-gr-general', 'bg-gr-red', 'bg-gr-purple', 'bg-gr-pink' ],
            text: [ 'text-gr-general', 'text-gr-red', 'text-gr-purple', 'text-gr-pink' ],
            border: [ 'border-blue', 'border-red', 'border-purple', 'border-pink' ],
        }
    },
    methods: {
        disenoCard(idx){
            this.diseno.color = this.colores[idx]
            this.borde_activo = this.border[idx]
        }
    }
}
</script>

<style lang="css" scoped>
.card-producto{
    width: 400px;
    border-radius: 16px;
}
.nombre{
    height: 38px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: pre-line;
}
.border-blue{
    border: 1px solid #0892DD;
}
.border-red{
    border: 1px solid #FF612B;
}
.border-purple{
    border: 1px solid #9508EB;
}
.border-pink{
    border: 1px solid #D6017B;
}
</style>
