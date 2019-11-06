import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import UUID from 'vue-uuid';
import VueTextareaAutosize from 'vue-textarea-autosize';
import router from './router/index'
import { store } from './store'
import axios from 'axios'

Vue.use(UUID);
Vue.use(BootstrapVue);
Vue.use(VueTextareaAutosize);

Vue.config.productionTip = false

Vue.prototype.$http = axios
const token = localStorage.getItem('token')

if(token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
