import axios from "axios";

const API = "desafios";

const ENDPOINTS = {
    getDesafiosDisponibles(params) {
        return axios(`${API}/disponibles`,{params})
    },
    getDesafiosProgramados(params) {
        return axios(`${API}/programados`,{params})
    },
    getDesafiosFinalizados(params) {
        return axios(`${API}/finalizados`,{params})
    },
    getDesafiosEspeciales(params) {
        return axios(`${API}/especiales`,{params})
    },
    getOtrosDesafios(params) {
        return axios(`${API}/otros`,{params})
    },
    getConsultarTorneo(id) {
        return axios(`${API}/info_torneo/${id}`)
    },
    postCrearTorneo(params) {
        return axios.post(`${API}/crear_torneo`,params)
    },
    putEditarTorneo(form,id) {
        return axios.put(`${API}/${id}/editar_torneo`,form)
    },
};

export default ENDPOINTS;
