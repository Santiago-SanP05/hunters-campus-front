import Vue from 'vue'

import HelperFecha from './fecha'
[
    HelperFecha,
].forEach(Filter => {
    Vue.use(Filter)
})
