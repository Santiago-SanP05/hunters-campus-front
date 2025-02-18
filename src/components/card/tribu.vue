<template>
    <div class="card-shield-tribu">
        <div class="team-name f-22 f-600 text-center">
            SAN ANDRÉS
        </div>
        <img src="https://i.ytimg.com/vi/xg0N6hc_CxA/maxresdefault.jpg" class="img-card mt-1 obj-cover" height="122" width="100%" />
        <div class="title-place font-bold-italic text-white">
            Oslo Lion
        </div>
        <div class="build-spacer text-center">
            <div class="row mx-0 px-3 pt-2 mb-2">
                <div class="pill p-1">
                    5
                </div>
                <p class="col f-600 f-12 text-left">
                    Líder - Empresa
                </p>
            </div>
            <div v-for="data in 10" :key="data" class="row mx-0 px-3 mb-2">
                <div class="pill p-1">
                    4
                </div>
                <p class="col f-12 text-left">
                    Integrante 1 - Empresa
                </p>
            </div>
        </div>
        <div class="row mx-0 image-tribu d-flex j-center">
            <img src="https://thumbs.dreamstime.com/b/insignia-de-arte-para-juegos-del-equipo-deportes-dragon-sport-gr%C3%A1fica-dise%C3%B1o-videojuegos-equipos-dragones-con-texto-y-color-163278046.jpg" width="60" height="60" class="obj-cover rounded-circle" />
        </div>
        <div class="end-shield f-26 font-black d-flex align-items-end j-center">
            178.500
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
 .card-shield-tribu{
     width: 220px;
     min-height: 412px;
     position: relative;
     /* box-shadow: 0px 3px 6px #00000014; */
     display: flex; 
     flex-direction: column;
     .img-card{ border-radius: 6px 6px 0px 0px; }

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
     .title-place{
         height: 27px;
         display: flex;
         align-items: center;
         justify-content: center;
         background-color: red;
         font-size: 16px;
     }
    .build-spacer{
        background-color: #FFFFFF;
        border-left: 2px solid red;
        border-right: 2px solid red;
        border-top: 2px solid red;
        /* display: grid; grid-template-rows: 100px */
        flex-grow: 1;
        //height: 50%;
    }
    .image-tribu{
        border-left: 2px solid red;
        border-right: 2px solid red;
    }
    .end-shield{
        height: 45px;
        border-left: 2px solid red;
        border-right: 2px solid red;
        z-index: 2;
        border-radius: 0px 0px 8px 8px;
        &:after{
            transform: rotate(15deg)translate(9px, -2px);
            content: '';
            position: absolute;
            left: -5px;
            border-radius: 0px 0px 4px 7px;
            z-index: -1;
            bottom: -16px;
            border-bottom: 2px solid red;
            width: 117px;
            height: 50px;
        }
        &:before{
            transform: rotate(-15deg)translate(-9px, -2px);
            content: '';
            position: absolute;
            right: -5px;
            border-radius: 0px 0px 7px 4px;
            z-index: -11;
            bottom: -16px;
            border-bottom: 2px solid red;
            width: 117px;
            height: 50px;
        }
    }

 }
</style>