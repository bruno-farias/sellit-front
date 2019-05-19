import Vue from 'vue'
import Vuex from 'vuex'

import shared from './shared'
import users from './users'
import orders from './orders'
import products from './products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shared,
    users,
    orders,
    products
  }
})
