<template>
    <nav class="navbar navbar-expand-lg text-white justify-content-center px-2">
        <div class="col px-0 pr-xl-3 pr-lg-3 pr-md-2 pr-sm-2 pr-1 d-flex">
            <slot name="leftSide" />
            <!-- <img height="30" class="img-hover" :src="`/img/logos/${url_gbp}.svg`" @mouseenter="setColorImage(1)" @mouseleave="setDefaultImage(1)" />
            <img height="30" class="img-hover" :src="`/img/logos/${url_fullSmart}.svg`" @mouseenter="setColorImage(2)" @mouseleave="setDefaultImage(2)" />
            <img height="30" class="img-hover" :src="`/img/logos/${url_smartMilk}.svg`" @mouseenter="setColorImage(3)" @mouseleave="setDefaultImage(3)" />
            <img height="30" class="img-hover" :src="`/img/logos/${url_sudimac}.svg`" @mouseenter="setColorImage(4)" @mouseleave="setDefaultImage(4)" />
            <img height="30" class="img-hover" :src="`/img/logos/${url_cabi}.svg`" @mouseenter="setColorImage(5)" @mouseleave="setDefaultImage(5)" /> -->
        </div>
        <router-link :to="{ name: 'home', }">
            <img height="65" :src="`/img/logos/hunters-color.svg`" />
        </router-link>
        <div class="col px-0 pl-xl-3 px-lg-3 pl-md-2 pl-sm-2 pl-1 d-flex justify-content-end">
            <slot name="rightSide">
                <div class="btn-grey-light text-general px-3 f-300" @click="$emit('openLoginAdmin')">
                    INGRESAR COMO ADMINISTRADOR
                </div>
            </slot>
            <!-- <div v-if="isActive.includes('admin')" class="btn-grey-light text-general px-3 f-300" @click="goToHome">
                IR A LA PÁGINA DE INICIO
            </div> -->
        </div>
        <!-- <div class="col px-0 pl-xl-3 pl-lg-3 pl-md-2 pl-sm-2 pl-1 d-flex justify-content-around">
            <img height="30" class="img-hover" :src="`/img/logos/${url_mcd}.svg`" @mouseenter="setColorImage(6)" @mouseleave="setDefaultImage(6)" />
            <img height="30" class="img-hover" :src="`/img/logos/${url_grow}.svg`" @mouseenter="setColorImage(7)" @mouseleave="setDefaultImage(7)" />
            <img height="30" class="img-hover" :src="`/img/logos/${url_campus}.svg`" @mouseenter="setColorImage(8)" @mouseleave="setDefaultImage(8)" />
            <img height="30" class="img-hover" :src="`/img/logos/${url_iaf}.svg`" @mouseenter="setColorImage(9)" @mouseleave="setDefaultImage(9)" />
            <img height="30" class="img-hover" :src="`/img/logos/${url_vecino}.svg`" @mouseenter="setColorImage(10)" @mouseleave="setDefaultImage(10)" />
            <img height="30" class="img-hover" :src="`/img/logos/${url_leeche}.svg`" @mouseenter="setColorImage(11)" @mouseleave="setDefaultImage(11)" />
        </div> -->
        <!-- <modal-lateral ref="refModalLoginAdmin">
            <p>prueba</p>
        </modal-lateral> -->
    </nav>
</template>

<script>
export default {
    data() {
        return {
            url_gbp: 'gbp',
            url_fullSmart: 'fullsmart',
            url_smartMilk: 'smart-milk',
            url_sudimac: 'sudimac',
            url_cabi: 'cabi',
            url_mcd: 'mi-conjunto',
            url_grow: 'grow',
            url_campus: 'campus',
            url_iaf: 'iaf',
            url_vecino: 'mi-vecino',
            url_leeche: 'leeche',
        }
    },
    computed: {
        isActive() {
            return this.$route.name
        }
    },
    methods: {
        goToHome() {
            this.$router.push({ name: 'home' })
        },
        openLoginAdmin() {
            this.$refs.refModalLoginAdmin.toggle()
        },
        setColorImage(key) {
            switch (key) {
            case 1:
                this.url_gbp = 'gbp-color' 
                break;
            case 2:
                this.url_fullSmart = 'fullsmart-color'
                break;
            case 3: 
                this.url_smartMilk = 'smartMilk-color'
                break;
            case 4: 
                this.url_sudimac = 'sudimac-color'
                break;
            case 5: 
                this.url_cabi = 'cabi-color'
                break;
            case 6: 
                this.url_mcd = 'mcd-color'
                break;
            case 7: 
                this.url_grow = 'grow-color'
                break;
            case 8:
                this.url_campus = 'campus-color'
                break;
            case 9: 
                this.url_iaf = 'iaf-color'
                break;
            case 10: 
                this.url_vecino = 'vecino-color'
                break;
            case 11: 
                this.url_leeche = 'leeche-color'
                break;
            
            }
        },
        setDefaultImage(key) {
            switch (key) {
            case 1:
                this.url_gbp = 'gbp' 
                break;
            case 2:
                this.url_fullSmart = 'fullsmart'
                break;
            case 3: 
                this.url_smartMilk = 'smart-milk'
                break;
            case 4: 
                this.url_sudimac = 'sudimac'
                break;
            case 5: 
                this.url_cabi = 'cabi'
                break;
            case 6: 
                this.url_mcd = 'mi-conjunto'
                break;
            case 7: 
                this.url_grow = 'grow'
                break;
            case 8:
                this.url_campus = 'campus'
                break;
            case 9: 
                this.url_iaf = 'iaf'
                break;
            case 10: 
                this.url_vecino = 'mi-vecino'
                break;
            case 11: 
                this.url_leeche = 'leeche'
                break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar{
    /* position: fixed; */
    /* top: 0px; */
    width:100vw;
    height: 98px;
    z-index: 5;
    background: var(--gr-r-general);
    /* box-shadow: 0 3px 6px 0 #00000029; */
    /* border-radius: 0 0 8px 8px; */
}
.img-hover{
    transition: transform .2s;
    &:hover{
        transform: scale(1.2);
    }
}

@media (max-width: 1366px) {
    .img-hover{
        height: 25px !important;
        transition: transform .2s;
        &:hover{
            transform: scale(1.2) !important;
        }
    }
    
}
</style>
