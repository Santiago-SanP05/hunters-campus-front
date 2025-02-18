<template>
    <section class="sect-admin-premios">
        <div class="row justify-content-center">
            <div class="col-12 col-md-auto col-lg-auto">
                <div class="second-place text-center mt-lg-5 py-3">
                    <div>
                        <img v-if="true" src="/img/ilustraciones/cartagena.jpg" class="w-212px h-122px bg-f5 br-6" />
                        <div v-else class="sin-img w-212px h-122px bg-f5 d-middle-center br-6 mx-auto">
                            <p class="f-80 font-bold-italic text-general">2</p>
                        </div>
                    </div>
                    <div class="d-middle-center mb-5 mt-3" @click="crearPremio">
                        <p class="f-26 font-bol">San Andrés</p>
                        <i class="icon-pencil-outline ml-2 cr-pointer" />
                    </div>
                    <img src="/img/admin/2place.png" alt="" class="w-70" />
                </div>
            </div>
            <div class="col-12 col-md-auto col-lg-auto">
                <div class="first-place text-center py-3">
                    <div>
                        <img v-if="true" src="/img/ilustraciones/cancun.png" class="w-212px h-122px bg-f5 br-6" />
                        <div v-else class="sin-img w-212px h-122px bg-f5 d-middle-center br-6 mx-auto">
                            <p class="f-80 font-bold-italic text-general">1</p>
                        </div>
                    </div>
                    <div class="d-middle-center mb-5 mt-3" @click="crearPremio">
                        <p class="f-26 font-bol">Cancún</p>
                        <i class="icon-pencil-outline ml-2 cr-pointer" />
                    </div>
                    <img src="/img/admin/1place.png" alt="" class="w-80" />
                </div>
            </div>
            <div class="col-12 col-md-auto col-lg-auto">
                <div class="third-place text-center mt-lg-5 py-3">
                    <div>
                        <img v-if="false" src="/img/ilustraciones/cartagena.png" class="w-212px h-122px bg-f5 br-6" />
                        <div v-else class="sin-img w-212px h-122px bg-f5 d-middle-center br-6 mx-auto">
                            <p class="f-80 font-bold-italic text-general">3</p>
                        </div>
                    </div>
                    <div class="d-middle-center mb-5 mt-3 cr-pointer" @click="crearPremio">
                        <p class="f-26 font-bol">{{ false ? 'San Andrés' : 'Añadir' }}</p>
                        <i :class="`${ false ? 'icon-pencil-outline' : 'icon-plus f-20'}  ml-2`" />
                    </div>
                    <img src="/img/admin/3place.png" alt="" class="w-70" />
                </div>
            </div>
        </div>
        <modal-crear-premio ref="refCrearPremio" />
    </section>
</template>

<script>
import modalCrearPremio from './partials/modalCrearPremio.vue'
export default {
    components: { modalCrearPremio },
    data() {
        return {
            rutas: [
                { titulo: 'TRIBUS', ruta: 'asd' },
                { titulo: 'PREMIOS', ruta: 'asd' },
            ],
            prueba: this.$route.name
        }
    },
    methods: {
        crearPremio() {
            this.$refs.refCrearPremio.toggle()
        }
    }
}
</script>

<style lang="scss" scoped>
.sect-admin-premios{
	background-color: transparent;
	.card-wh{
		width: 291px;
		height: 500px;
	}
	.first-place{
		@extend .card-wh;
		background-color: #F6F9FB;
	}
	.second-place, .third-place{
		@extend .card-wh;
	}
	.f-80{
		font-size: 80px;
	}
	.sin-img{
		    background-image: url('/img/backgrounds/bg_fondo_sin playa.png');
		background-repeat: no-repeat;
		background-size: 217px 137px;
	}
	.w-70{
		width: 70%;
	}
}
</style>