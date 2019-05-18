import Vue from 'vue'
import Vuex from 'vuex'

import shared from './shared'
import users from './users'
import groups from './groups'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shared,
    users,
    groups
  }
})
