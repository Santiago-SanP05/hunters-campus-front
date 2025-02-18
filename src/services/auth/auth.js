import axios from "axios"

const api = "auth"

const auth = {
    pedirPassword: data => axios.post(`${api}/pedir-password`, data)
}

export default auth