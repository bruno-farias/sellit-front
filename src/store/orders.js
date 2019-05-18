import axios from 'axios'

const state = {
  orders: [],
  selectedOrder: {}
}

const mutations = {
  'SET_ORDER_LIST' (state, orders) {
    const list = orders.map(item => {
      const amount = item.order_products.reduce((acc, cur) => {
        return acc + parseFloat(cur.price)
      }, 0)
      return {
        id: item.id,
        customer: item.customer.name,
        customer_email: item.customer.email,
        items: item.order_products.length,
        amount: parseFloat(amount).toFixed(2),
        sales_person: item.user.name
      }
    })

    state.orders = list
  },
  'SET_SELECTED_ORDER' (state, selectedOrder) {
    state.selectedOrder = selectedOrder
  }
}

const actions = {
  fetchOrderList: ({ commit, dispatch }) => {
    dispatch('setLoadingStatus', true)
    dispatch('setLoadingMessage', 'Please wait...')

    axios.get('orders')
      .then(response => {
        console.log({ response })
        commit('SET_ORDER_LIST', response.data)
      })
      .catch(error => {
        console.log({ error })
        dispatch('openSnackbar', { message: error.response.statusText })
      })
      .finally(_ => {
        dispatch('setLoadingStatus', false)
      })
  },
  createOrder: ({ commit, dispatch }, { orderData }) => {
    dispatch('setLoadingStatus', true)
    dispatch('setLoadingMessage', 'Please wait...')
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: orderData,
      url: 'orders'
    }
    axios(options)
      .then(response => {
        console.log({ response })
        window.location.reload()
      })
      .catch(error => {
        console.log({ error })
      })
      .finally(_ => {
        dispatch('setLoadingStatus', false)
      })
  }
}

const getters = {
  orders (state) {
    return state.orders
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
