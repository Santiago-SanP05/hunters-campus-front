import {Notification} from 'element-ui'

export default {
    methods: {
        errorCatch(e, referenciaValidador = null) {
            const estadosWarning= [400, 422]
            console.log(e);
            if(e.response && estadosWarning.includes(e?.response?.data?.status)) {
                this.notificacion(
                    _.get(e.response,'',''),
                    _.get(e.response,'data.mensaje','Ha ocurrido un error al realizar la consulta'),
                    'warning'
                )
            } else if (_.defaultTo(e?.response?.status, false) != 401) {
                this.notificacion(
                    _.get(e.response,'data.titulo','Error'),
                    _.get(e.response,'data.mensaje','Ha ocurrido un error al realizar la consulta'),
                    'error'
                )
            }
    
            if(this.existenValidaciones(e) && referenciaValidador) {
                this.$refs[referenciaValidador].setErrors(e.response.data.validaciones)
            }
        },
        existenValidaciones: excepcion => !_.isEmpty(excepcion?.response?.data?.validaciones),
        notificacion(title,message, type = 'info',isHtml = false) {
            Notification({
                title: title,
                message: message,
                type: type,
                dangerouslyUseHTMLString: isHtml
            })
        }
    }

}