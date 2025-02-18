import axios from 'axios'

const api = 'puntos/ver'

const verPunto = {
    datos: id => axios.get(`${api}/datos/${id}`)
}

export default verPunto