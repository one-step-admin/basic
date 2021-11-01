import Vue from 'vue'

const component = require('./main.vue').default
const constructor = Vue.extend(component)

let instance

const spinkitLoading = options => {
    options = options || {}
    instance = new constructor({
        data: options
    })
    instance.vm = instance.$mount()
    instance.dom = instance.vm.$el
    document.body.appendChild(instance.dom)
    instance.show = true
    return instance.vm
}

const SpinkitLoadingClose = () => {
    instance.show = false
}

export default {
    install: Vue => {
        Vue.prototype[`$${component.name}`] = spinkitLoading
        Vue.prototype[`$${component.name}`].close = SpinkitLoadingClose
    }
}
