import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import './static/alicss/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import * as Win from './utils/window.js'

// const Api = require('electron').remote.require('./api');
import * as Api from './api/api.js'

import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style
import 'swiper/css/swiper.css'

Vue.prototype.$Api = Api
Vue.prototype.$Win = Win
Vue.use(ElementUI)

Vue.use(VueAwesomeSwiper /* { default options with global component } */)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
