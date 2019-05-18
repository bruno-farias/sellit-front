import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'

import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Users/Register.vue'
import Orders from './components/Orders/Index'
import PageNotFound from './components/PageNotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
    { path: '*', name: '404', component: PageNotFound }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('tryAutoLogin')
  const authed = store.getters.userToken
  if (authed === null && to.path !== '/login') {
    if (to.path === '/register') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
