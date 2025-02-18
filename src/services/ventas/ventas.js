import axios from 'axios'

const Ventas = {
    loadInformacion: id => axios.get(`ventas`)
}

export default Ventas