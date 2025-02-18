import axios from 'axios'


const Retos = {
    getDatos(idReto){
        return axios(`retos/datos/${idReto}/participantes`)
    },
    finalizarReto(form){
        return axios.put(`retos/${form.id_reto}/ganador/finalizar`,form)
    },
}

export default Retos