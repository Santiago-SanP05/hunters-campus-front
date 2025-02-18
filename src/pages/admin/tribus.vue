<template>
    <section class="sect-admin-tribus pl-4">
        <div class="row">
            <div class="col-12 col-lg-9">
                <div class="row mb-4">
                    <div class="col-auto my-auto">
                        <p class="f-28 font-bold-italic">TRIBUS</p>
                    </div>
                    <div class="col-4 ml-lg-auto my-auto">
                        <el-input v-model="search" class="w-100" placeholder="Buscar" prefix-icon="el-icon-search" />
                    </div>
                    <div class="col-auto my-auto">
                        <div class="btn-general font-medium-italic px-3 f-300 w-178px f-18 h-32px" @click="createTribe">
                            CREAR TRIBU
                        </div>
                    </div>
                </div>
                <!--  -->
                <div v-for="(item, index) in tribus" :key="index" class="row mx-0 mt-4">
                    <div class="col-auto px-2 inclinacion" style="background-color: #000 " />
                    <div class="col py-2 inclinacion bg-fondo ml-2 py-4">
                        <div class="row mx-0">
                            <div class="col-auto">
                                <div class="inclinacion w-30px h-27px text-white text-center font-bold-italic f-20" style="background-color: #000 ">
                                    {{ item.puesto }}°
                                </div>
                            </div>
                            <div class="col-auto col-lg-4 my-auto">
                                <div class="d-middle">
                                    <img src="" alt="" class="wf-52px bg-inactive h-52px bg-70" />
                                    <div class="ml-3">
                                        <p class="f-20 font-bold-italic">{{ item.nombre }}</p>
                                        <p class="f-17 text-red font-black-italic"> {{ item.puntos }} pts.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto my-auto">
                                <div class="d-middle text-grey-light fk-regular">
                                    <i class="icon-account-circle-outline" />
                                    <p class="f-17 ml-1"> {{ item.miembros }} Participantes</p>
                                </div>
                            </div>
                            <div class="col-auto my-auto d-flex text-general ml-auto">
                                <el-switch v-model="item.activo" active-color="#29D884" inactive-color="#DFE1E6" />
                            </div>
                            <div class="col-auto my-auto d-middle">
                                <el-tooltip effect="light" content="Agregar participante" placement="bottom">
                                    <div class="btn-general wf-47px mx-2" @click="openModalAddMember">
                                        <i class="icon-plus" />
                                    </div>
                                </el-tooltip>
                                <el-tooltip effect="light" content="Editar tribu" placement="bottom">
                                    <div class="btn-grey mx-2 wf-47px" @click="editTribe(item)">
                                        <i class="icon-pencil-outline f-15" />
                                    </div>
                                </el-tooltip>
                                <el-tooltip effect="light" content="Eliminar tribu" placement="bottom">
                                    <div class="btn-grey mx-2 wf-47px" @click="openModalDeleteTribe(item.id)">
                                        <i class="icon-icon-trash-outline f-15" />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="row mx-0 a-center" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal-crear-tribu ref="refModalCrearTribu" />
        <modal-agregar-participante ref="refModalAgregarParticipante" />
        <modal-eliminar-tribu ref="refModalEliminarTribu" />
    </section>
</template>

<script>
import modalCrearTribu from './partials/modalCrearTribu.vue'
import modalAgregarParticipante from './partials/modalAgregarParticipante.vue'
import modalEliminarTribu from './partials/modalEliminarTribu.vue'
export default {
    components: {
        modalCrearTribu,
        modalAgregarParticipante,
        modalEliminarTribu,
    },
    data() {
        return {
            rutas: [
                { titulo: 'TRIBUS', ruta: 'asd' },
                { titulo: 'PREMIOS', ruta: 'asd' },
            ],
            value2: false,
            search: '',
            tribus: [
                {
                    id: 1,
                    puesto: 1,
                    nombre: 'Oslo lions',
                    puntos: '1.500',
                    miembros: 15,
                    activo: true,
                    color: '#92D050',
                    img: null
                },
                {
                    id: 2,
                    puesto: 2,
                    nombre: 'Snaklan',
                    puntos: '1.000',
                    miembros: 8,
                    activo: true,
                    color: '#0090FF',
                    img: null
                },
            ]
        }
    },
    methods: {
        openModalAddMember() {
            this.$refs.refModalAgregarParticipante.toggle()
        },
        openModalDeleteTribe() {
            this.$refs.refModalEliminarTribu.toggle()
        },
        createTribe() {
            this.$refs.refModalCrearTribu.toggle()
        },
        editTribe(item) {
            this.$refs.refModalCrearTribu.toggle(item)
        },
    }
}
</script>

<style lang="scss" scoped>
.sect-admin-tribus{
	.text-grey-light{
		color: #637381;
	}
}
</style>