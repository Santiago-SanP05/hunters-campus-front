<template>
    <div class="main-layout">
        <navbar @openLoginAdmin="openLoginAdmin" />
        <div class="app-wrapper">
            <child />
            <!-- <div class="contenedor border px-2 pt-3">
            </div> -->
        </div>
        <modal-lateral ref="refModalLoginAdmin" titulo="ADMINISTRADOR" class="modal-login-admin" width="min(350px, 100%)">
            <div class="mx-4 mt-5">
                <div class="d-middle mb-4">
                    <div class="skewX-15 w-10px h-30px bg-red mr-1" />
                    <div class="skewX-15 w-10px h-30px bg-red mr-1" />
                    <div class="skewX-15 w-10px h-30px bg-red mr-1" />
                    <p class="f-22 font-bold-italic ml-2">INICIAR SESIÓN</p>
                </div>
                <div class="my-4">
                    <p class="f-14 fk-medium">Usuario</p>
                    <el-input v-model="login.user" class="w-100" placeholder="Nombre de usuario" />
                </div>
                <div class="my-4">
                    <p class="f-14 fk-medium">Contraseña</p>
                    <el-input v-model="login.password" type="password" class="w-100" placeholder="Contraseña" />
                </div>
                <div class="btn-general px-3 f-300 mt-4 w-183px f-22 h-38px ml-auto mr-2" @click="logIn">
                    INICIAR SESIÓN
                </div>
            </div>
        </modal-lateral>
    </div>
</template>

<script>
import '../assets/sass/app.scss'
export default {
    name: 'MainLayout',
    data() {
        return {
            login: {
                user: '',
                password: '',
            }
        }
    },
    methods: {
        logIn() {
            this.$refs.refModalLoginAdmin.toggle()
            this.$router.push({name:'admin'})
        },
        openLoginAdmin() {
            this.$refs.refModalLoginAdmin.toggle()
        },
    }
}
</script>
<style lang="scss" >
main{
    padding-left: 65px !important
}

.main-layout{
    background-image: url('/img/backgrounds/bg-general.png');
    /* background-image: url('/img/backgrounds/bg_fondo_sin playa.png'); */
    background-repeat: no-repeat;
    background-size: cover;
}
.app-wrapper {
    font-family: 'Kunnari';
    font-weight: 400;
    color: var(--color-text);
    height: calc(100vh - 98px);
    width: 100vw;
    display: flex;
    flex-flow: column;
    align-items: stretch;
    justify-content: stretch;

    & > .full-height-wrapper {
        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
        justify-content: flex-start;
        flex: 1 1 auto;

        .conf-section {
            flex: 1 1 auto;
            margin: 1.5rem 1rem;
            padding: 1rem;
        }

    }
}
.contenedor{
    min-height: 95%;
    width: 100%;
    /* margin: auto 0; */
    /* box-shadow: 0 3px 6px 0 #00000029; */
    /* border-radius: 12px; */

}
</style>
