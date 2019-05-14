import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import UUID from 'vue-uuid';
import VueTextareaAutosize from 'vue-textarea-autosize';
import router from './router/index'
 
Vue.use(UUID);
Vue.use(BootstrapVue);
Vue.use(VueTextareaAutosize);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
