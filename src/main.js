import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Layout from './components/Layout.vue'

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Layout },
]

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

Vue.use(VueRouter)
new Vue({
   el: '#app',
  router,
  // replace the content of <div id="app"></div> with App
  render: h => h(App)
}).$mount('#app')
