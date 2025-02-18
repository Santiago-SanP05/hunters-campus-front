<template>
    <div class="row mx-0 tabs">
        <template v-for="(item,index) in tabs">
            
            <router-link
            :key="index"
            :data-xd="item.ruta"
            :to="{ name: `${item.ruta}`, params: item.params || {} }"
            :class="{'router-link-active': subIsActive(item.active)}"
            class="d-middle position-relative tab-inner px-2"
            >
                <!-- <el-tooltip :disabled="item.component_name==$route.ruta" class="item" effect="light" :content="item.titulo" placement="top">
                    <i v-if="item.icono" :class="`${item.icono}`" class="mdi f-20" />
                </el-tooltip> -->
                <div class="side-button mr-2" :class="{'router-link-active': subIsActive(item.active)}" />
                <div class="container-tab px-2">
                    <p class="nombre-tab font-bold-italic f-16">{{ item.titulo }}</p>
                </div>
                <div v-if="item.num !== undefined" class="ml-2">
                    ({{ item.num }})
                </div>
            </router-link>
        </template>
        <slot name="btnAgregar" />
    </div>
</template>
<script>
export default {
    name: 'TabsIcons',
    props: {
        tabs: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        isActive() {
            return this.$route.name
        }
    },
    methods: {
        subIsActive(input) {
            const paths = Array.isArray(input) ? input : [input]
            return paths.some(path => {
                return this.$route.path.indexOf(path) === 0 || this.$route.path.indexOf(path) === 1 || this.$route.name === path
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.side-button{
    width: 7px;
    height: 26px;
    transform: skewX(-15deg);
}

.tabs{
    .item-tab{
        min-width: 40px;
        background: var(--color-general);
        color: #ffffff;
    }
    a{
        .container-tab{
            background-color: #F6F9FB;  
            height: 26px;
            margin-right: 10px;
            color: #637381;
            transform: skewX(-15deg);
            
        }
        .side-button{
            background-color: #F6F9FB;  
        }
        //padding: 15px 12px 15px 12px !important;
        //color: var(--color-gray) ;
        //font-size: 14px;
        //border-bottom: 2px solid transparent !important;
        
        &.router-link-active{
            /* padding: 12px 12px 5px 12px; */
            /* border-bottom: 2px solid var(--color-general) !important; */
            .side-button{
                background-color: #FF0000;
            }
            .container-tab{
                background-color: #FF0000 !important;
                color: #FFFFFF !important;
            }
            .nombre-tab{
                display: inline-block;
            }
            .item-tab{
                background: var(--color-general);
                color: white;
            }
        }
        &:hover{
            text-decoration: none !important;
        }
    }
}
</style>
