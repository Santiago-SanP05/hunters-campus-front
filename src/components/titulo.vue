<template>
    <div class="row m-3 text-general a-center">
        <h4>{{texto}}</h4>
        <div class="col d-middle">
            <div class="col br-gr-red br-7" style="height:3px;"></div>
            <div class="bg-yellow br-7" />
            <div class="bg-yellow br-7 mx-1" style="width:20px;height:3px;" />
            <div class="bg-yellow br-7 line-10" style="width:10px;height:3px;" />
            <i class="icon-flight f-23 text-yellow" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        texto: {
            type: String,
            default: 'Sin titulo'
        }
    }
}
</script>

<style lang="css" scoped>
.br-7{
    border-radius: 7px;
}
.br-gr-red{
    background: var(--gr-r-red);
}
.bg-yellow{
    background: #FF9C32;
}
.text-yellow{
    color: #FF9C32;
}
</style>
