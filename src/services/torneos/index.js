import axios from 'axios'

const API = '/torneos'

const Torneos = {
    mostrar(id) {
        return axios(`${API}/mostrar/${id}`)
    },
    ranking(id) {
        return axios(`${API}/ranking/${id}`)
    },
    crearComentario(payload) {
        return axios.post(`${API}/comentarios`,payload)
    },    
    guardarPuntuacion(id_torneo,payload) {
        return axios.post(`${API}/${id_torneo}/actualizar-puntuacion`,payload)
    },
    eliminarTorneo(id_torneo,params) {
        return axios.delete(`${API}/${id_torneo}`, {params})
    },
    getAsignarPuntos(idTorneo) {
        return axios(`${API}/${idTorneo}/get/asignar/puntos`)
    },
    asignarPuntosTorneo(form) {
        return axios.post(`${API}/${form.id_torneo}/asignar/puntos`,form)
    },
    eventoEspecial() {
        return axios(`${API}/get/tribus`)
    },
    asignarPuntosEvento(form) {
        return axios.post(`${API}/asignar/puntos/especiales`, form)
    },
    reportarAusencia(id_torneo,payload) {
        return axios.post(`${API}/${id_torneo}/reportar-ausencia`, payload)
    }
}

export default Torneos