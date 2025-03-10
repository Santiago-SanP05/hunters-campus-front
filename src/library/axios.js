import axios from 'axios'
import store from '../store'
import router from '../router'

axios.defaults.baseURL = process.env.VUE_APP_URL || 'http://hunters.localhost/api'

// Request interceptor
axios.interceptors.request.use(request => {
    const token = store.getters['auth/getToken']
    if (token) request.headers.common['Authorization'] = `Bearer ${token}`

    const locale = store.getters['lang/locale']
    if (locale) request.headers.common['Accept-Language'] = locale

    // request.headers['X-Socket-Id'] = Echo.socketId()
    return request
})

// Response interceptor
axios.interceptors.response.use(response => response, error => {
    const { status } = error.response

    if (status >= 500) console.error(error)

    if (status === 401){
        store.dispatch('auth/removeAllData')
        router.push({ name: 'login' })
    }

    return Promise.reject(error)
})
