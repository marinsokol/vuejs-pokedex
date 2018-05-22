import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './routes/Home/index.vue'
import Favourites from './routes/Favourites/index.vue'
import Auth from './routes/Auth/index.vue'

Vue.config.productionTip = false

const routes = [
  {path: '/', component: Home},
  {path: '/favourites', component: Favourites},
  {path: '/auth', component: Auth},
]

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.use(VueRouter)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
