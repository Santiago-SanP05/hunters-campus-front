<template>
    <div class="slim">
        <slot />
    </div>
</template>

<script>
import '~/plugins/slim/slim/slim.min.css'
import Slim from '~/plugins/slim/slim/slim.module.js'
export default {
    name: 'Cropper',
    props:['value','options'],
    data(){
        return {
            instance: null
        }
    },
    watch: {
        value(a, b){
            if (a === null) this.instance.remove()
            if (a) if (!a.image) this.instance.load(a)
        },
        'instance.dataBase64.output.name'(a, b){
            // if (a === null) this.$emit('input', null)
        }
    },
    mounted(){
        let that = this
        let defecto = {
            label: this.options.label,
            ratio: this.options.ratio,
            minSize: this.options.minSize,
            didRemove(file, slim){
                that.$emit('crop:remove')
                return true
            },
            didTransform(file, el, meta, slim){
                that.$emit('crop:change', {
                    'after': el.dataBase64.output,
                    'before': that.value
                })
                that.$emit('input', el.dataBase64.output)
                return true
            }
        }
        let param = { ...defecto, ...this.options }
        this.instance = new Slim(this.$el, param)
        /*
            * Para cargar la imagen que trae por defecto
            * 18:33
            */
        if (this.value !== null) this.instance.load(this.value)
        // this.instance.load(this.value)
    },
    methods: {
        remove(){
            this.instance.remove()
        }
    }
}
</script>
<style lang="scss" scoped>
.cover-cropper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dcf3fe;
  height: 100%;
  position: absolute;
}
</style>
