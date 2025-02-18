<template>
    <el-drawer :visible.sync="drawer" :title="titulo" :size="width">
        <slot />
    </el-drawer>
</template>

<script>
export default {
    props: {
        titulo: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '30%'
        }
    },
    data() {
        return {
            drawer: false,
        };
    },
    methods:{
        toggle() {
            this.drawer = !this.drawer
        }
    }
}
</script>
