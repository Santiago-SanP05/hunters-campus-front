import axios from 'axios';

const api = "retos"

const retos = {
    crear: data => axios.post(`${api}/crear`, data),
    verDesafio: id => axios.get(`${api}/${id}`, ),
    editar: (id, data) => axios.put(`${api}/editar/${id}`, data),
}

export default retos