import axios from 'axios'

const API = '/desafios'

const Desafios = {
    mostrar(id) {
        return axios(`${API}/mostrar/${id}`)
    },
    crearComentario(payload) {
        return axios.post(`${API}/comentarios`,payload)
    },
    aceptarDesafio(id_desafio,payload) {
        return axios.patch(`${API}/${id_desafio}/aceptar`,payload)
    },
    eliminarDesafio(id_desafio,params) {
        return axios.delete(`${API}/${id_desafio}`, {params})
    },
}

export default Desafios