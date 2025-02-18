<template>
    <section class="scroll-none overflow-auto d-middle-center" style="height:calc(100vh - 100px)">
        <div class="container-error">
            <div class="row mx-0 j-center">
                <img src="/img/ilustraciones/ganador_detalle.svg" height="200" style="max-width:100%;" />
            </div>
            <p class="f-28 font-bold-italic text-center lh-32">
                {{ mensaje }}
            </p>
            <div class="row mx-0 mt-5 j-center">
                <div class="btn-general px-4">
                    REGRESAR
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        mensaje: {
            type: String,
            default: 'ESTE DESAFIO NO SE PUEDE FINALIZAR'
        }
    }
    
}
</script>