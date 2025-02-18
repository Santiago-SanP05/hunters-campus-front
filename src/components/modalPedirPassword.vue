<template>
    <modal ref="modalPedirPassword" :titulo="titulo" no-aceptar adicional="GUARDAR" @adicional="onSubmit()">
        <ValidationObserver ref="form">
            <div class="row mx-0 j-center">
                <div class="col-8 px-0">
                    <p class="f-18">
                        {{ texto }}
                    </p>
                    <p class="label-mini mt-2">
                        Contraseña
                    </p>
                    <ValidationProvider v-slot="{ errors }" name="password" rules="required">
                        <el-input v-model="password" type="password" class="w-100" @keyup.enter.native="onSubmit()" />
                        <p class="v-error w-100 f-11"> {{ errors[0] }} </p>
                    </ValidationProvider>
                </div>
            </div>
        </ValidationObserver>
    </modal>
</template>

<script>
import auth from '~/services/auth/auth'
export default {
    props:{
        titulo: {
            type: String,
            default: ''
        },
        texto: {
            type: String,
            default: ''
        },

    },
    data() {
        return {
            password: ''
        }
    },
    methods: {
        toggle() {
            this.password = ''
            this.$refs.form.reset()
            this.$refs.modalPedirPassword.toggle();
        },
        async onSubmit() {
            try {
                const params = {
                    password: this.password
                }

                const { data } = await auth.pedirPassword(params);

                this.$emit('data', data.usuario)

            } catch (error) {
                this.errorCatch(error, 'form')
            }
        }
    }
}
</script>