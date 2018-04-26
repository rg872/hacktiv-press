import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
      // children: [
      //   {
      //     path: 'articles',
      //     name: 'articles',
      //     component: Articles
      //   }
      // ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
