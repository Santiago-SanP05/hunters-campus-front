/* eslint-disable no-undef */
import store from '~/store'
import moment from 'moment'
import { isEmpty } from 'lodash'
export default {
    methods: {
        /**
         * @info Devuelve una fecha con el formato deseado
         *
         * @param { String, Date, DateTime } fecha = Fecha que se desea formatear
         * @param { String } formato = Formato deseado para la fecha (defecto 'día nombre-mes año' : 06 jun. 2020)
         */
        formatearFecha(fecha, formatoDestino = 'D MMM Y', formatoOriginal = moment.ISO_8601) {
            return this.fechaEsValida(fecha)
                ? moment(fecha, formatoOriginal).format(formatoDestino)
                : (_.isNull(fecha) || _.isUndefined(fecha))
                    ? '-'
                    : 'Fecha Inválida'
        },
        fechaEsValida: (fecha) => moment(fecha,
            [moment.ISO_8601, 'D-M-Y', 'D/M/Y', 'Y-M-D', 'Y/M/D', 'DD MMM Y', 'D MMM Y', 'Y-M-D HH:mm:ss', 'D/M/Y HH:mmA'],
            true)
            .isValid(),
        /**
         * @info Devuelve un número redondeado según los decimales que se establezcan
         *
         * @param { Number, String } valor = Valor decimal que se quiere redondear
         * @param { Number } decimales = Número de decimales que se quieren mostrar (opcional, defecto 0)
         */
        redondearNumero(valor, decimales = 0) {
            valor = valor ?? 0
            return Number(Math.round(valor + 'e' + decimales) + 'e-' + decimales)
        },

        /**
         * @info Devuelve un número truncado (sin redondear), con la cantidad de decimales que se establezcan
         *
         * @param { Number, String } valor = Valor decimal que se quiere truncar
         * @param { Number } decimales = Número de decimales que se quieren mostrar (opcional, defecto 0)
         */
        truncarNumero(valor, decimales = 0) {
            valor = valor ?? 0
            return parseFloat(valor.toFixed(decimales))
        },

        /**
         * @info Método que formatea un string con saltos de línea y retorna HTML puro
         * @param { String } texto Texto a formatear
         * @return { HTML }
         */
        formatearTextoHtml: texto => _.isEmpty(texto) || _.isNull(texto) ? '' : texto.replace(/\n/gi, '<br/>'),

        /**
         * @info Devuelve un número formateado según el código ISO
         *
         * @param { Number, String, Float } numero
         * @param { Number } decimales
         * @return { String }
         */
        // agregarSeparadoresNumero: (numero, ISO = 'es') => numero.toLocaleString(ISO),

        agregarSeparadoresNumero(num,decimales = 0) {
            if(!num) return 0
            return this.$options.filters.currency(num, '', decimales, {
                decimalSeparator: ',',
                thousandsSeparator: '.',
            })
        },
        porcentajesBordes(num,decimales = 1) {
            if(!num) return 0
            return this.$options.filters.currency(num, '', decimales, {
                decimalSeparator: '.',
                thousandsSeparator: '',
            })
        },
        separadorNumero(num, decimales = 0, simbolo=true) {
            let signo = simbolo? '$': '';
            if(!num) return `${signo}0`
            let n = parseFloat(num)
            let decimalesNew = 0
            if(!_.isEmpty(this.$tienda)) {
                decimalesNew = this.$tienda.decimales
            }else{
                const moneda = store.getters["cedis/moneda"];
                decimalesNew = moneda.decimales
            }

            return this.$options.filters.currency(n,`${signo} `,decimalesNew,{
                decimalSeparator: ',',
                thousandsSeparator: '.',
            })
        },
        separadorNumeroDecimales(num, decimales = 0, simbolo=true) {
            let signo = simbolo? '$': '';
            if(!num) return `${signo}0`
            let n = parseFloat(num)
            return this.$options.filters.currency(n, `${signo} `, decimales, {
                decimalSeparator: ",",
                thousandsSeparator: "."
            });
        },
        formatearDecimalesSeparador(value, tipoDecimal, decimales) {
            return this.$options.filters.currency(value, "$", decimales, {
                thousandsSeparator: tipoDecimal ? "," : ".",
                decimalSeparator: tipoDecimal ? "." : ",",
            });
        }
    }
}
