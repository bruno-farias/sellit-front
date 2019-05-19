import axios from 'axios'

const state = {
  products: []
}

const mutations = {
  'SET_PRODUCTS' (state, products) {
    state.products = products
  }
}

const actions = {
  fetchProducts: ({ commit, dispatch }) => {
    axios.get('products')
      .then(response => {
        commit('SET_PRODUCTS', response.data)
      })
      .catch(error => {
        dispatch('openSnackbar', { message: error.response.statusText })
      })
      .finally(_ => {
        dispatch('setLoadingStatus', false)
      })
  }
}

const getters = {
  products (state) {
    return state.products
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
