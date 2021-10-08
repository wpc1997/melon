import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import cuCustomHeader from './colorui/components/cu-custom-header.vue'
import cuCustomFoot from './colorui/components/cu-custom-foot.vue'
import cuCustomTitle from './colorui/components/cu-custom-title.vue'
import store from './store'


Vue.component('cu-custom',cuCustom)
Vue.component('cu-custom-header',cuCustomHeader)
Vue.component('cu-custom-foot',cuCustomFoot)
Vue.component('cu-custom-title',cuCustomTitle)
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
