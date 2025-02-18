import axios from 'axios'

const API = '/util'

const Util = {
    tribusSelect() {
        return axios(`${API}/tribus-select`)
    },
    integrantesTribuSelect(id) {
        return axios(`${API}/integrantes-tribu-select/${id}`)
    },
}

export default Util