<template>
    <div class="cont-menu">
        <div class="menu-lateral">
            <div class="overflow-auto scroll-none menu" style="height:calc(100vh - 105px);">
                <div v-for="(item, idx) in menus" :key="idx" class="row mx-0 my-3 j-center">
                    <el-tooltip class="item" effect="light" :content="item.titulo" placement="top-start">
                        <router-link
                        v-slot="{ navigate, isActive }"
                        :data-xd="item.ruta"
                        :to="{ name: `${item.ruta}`, params: item.params || {} }"
                        :class="{'router-link-active': subIsActive(item.active)}"
                        >
                            <a
                            class="d-middle-center position-relative rounded-circle cr-pointer"
                            :class="{'router-link-exact-active router-link-active': isActive}"
                            @click="navigate"
                            >
                                <div v-show="item.cant>0" class="badge">
                                    {{ item.cant }}
                                </div>
                                <i class="f-25 text-white" :class="item.icon" />
                            </a>
                        </router-link>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            rutaActiva: '',
            menus: [
                { titulo: 'Configuración', ruta: 'configurar', icon: 'icon-cog', cant: 0 },
            ]
        }
    },
    computed: {
        ...mapGetters({
            rol: 'auth/obtenerRoles',
            user: 'auth/obtenerUsuario',
        }),
        isActive(){
            return this.$route.name
        }
    },
    methods: {
        menuSeleccionado(){
            return this.menus[0]
        },
        ir(ruta){
            this.rutaActiva=ruta
            this.$router.push({ name: ruta })
        },
        subIsActive(input){
            const paths = Array.isArray(input) ? input : [input]
            return paths.some(path => {
                return this.$route.path.indexOf(path) === 0 || this.$route.path.indexOf(path) === 1 || this.$route.name === path
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.cont-menu{
    position: fixed;
    top:85px;
    width: 100px;
    height: calc(100vh - 85px);
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.menu-lateral{
    width:70px;
    height: calc(100vh - 130px);
    background: var(--gr-general-light);
    border-radius: 12px;
}
.badge{
    position: absolute;
    top: 2px;
    left: 35px;
    border-radius: 20px!important;
    border: 1px solid #fff;
    color: #fff;
    background: linear-gradient(to right, #FF9D32 5%, #FF2525)
}
.menu{
    a{
        &:hover{
            background:#ffffff50;
        }
        width:56px;height:56px;
        &.router-link-exact-active.router-link-active{
            background:#ffffff50;
        }
        &:hover{
            text-decoration: none !important;
        }
    }
}
</style>
