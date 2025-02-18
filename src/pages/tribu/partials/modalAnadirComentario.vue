<template>
    <modal ref="modalAnadirComentario" titulo="AÑADIR COMENTARIO" no-aceptar adicional="AÑADIR" @adicional="comentar">
        <div class="row mx-0 j-center">
            <div class="col-8 px-0">
                <p class="label-mini mt-4 f-600">
                    Comentario
                </p>
                <el-input v-model="comentario.comentario" maxlength="500" placeholder="Comentario" type="textarea" :rows="5" show-word-limit />
                <p class="f-18 f-400 mt-4 mb-2">
                    Ingresa tu contraseña de líder o administrador para añadirlo
                </p>
                <p class="label-mini f-600">
                    Contraseña
                </p>
                <el-input v-model="comentario.password" type="password" placeholder="Contraseña" class="w-100" />
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    data() {
        return {
            comentario:{
                password:'',
                comentario:''
            }
        }
    },
    methods: {
        toggle() {
            this.$refs.modalAnadirComentario.toggle();
        },
        comentar() {
            if(this.comentario.password == '' || this.comentario.comentario=='') {
                this.$notify({
                    title: 'Comentario',
                    message: 'Los campos son obligatorios',
                    type: 'warning'
                });
            }else{
                this.$emit('comentar',this.comentario)
            }
        },
        reset() {
            this.comentario= {
                password:'',
                comentario:''
            }
        }
    }
}
</script>