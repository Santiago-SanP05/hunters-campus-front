import Vue from 'vue'
import lodash from 'lodash'
import generalMixin from '~/mixins/general'
import formateadores from '~/mixins/formateadores'
import './vee-validate'
import './draggable'
import './slim'
import './'
// import moment from 'moment'
// moment.updateLocale('es', {
//     week: { dow: 0 }
// })
Vue.prototype._ = lodash
Vue.mixin(generalMixin)
Vue.mixin(formateadores)
