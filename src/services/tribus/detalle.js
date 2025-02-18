import axios from 'axios'

const api = 'tribus/detalle'

const detalle = {
    datos: id => axios.get(`${api}/datos/${id}`)
}

export default detalle