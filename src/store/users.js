import axios from 'axios'
import router from '../router'

const state = {
  userToken: null,
  userData: null,
  loginError: null,
  salesPersons: [],
  users: []
}

const mutations = {
  'SET_USER_TOKEN' (state, accessToken) {
    state.userToken = accessToken
    axios.defaults.headers.common = { 'Authorization': `Bearer ${accessToken}` }
  },
  'SET_USER_DATA' (state, user) {
    state.userData = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email
    }
  },
  'SET_SALES_PERSONS' (state, users) {
    state.salesPersons = users
  },
  'SET_ALL_USERS' (state, users) {
    state.users = users
  },
  'DESTROY_USER_TOKEN' (state) {
    state.userToken = null
    state.userData = null
    localStorage.clear()
  }
}

const actions = {
  register: ({ commit, dispatch }, { userData }) => {
    axios.post('auth/register', userData)
      .then(_ => {
        router.push('/login')
      })
      .catch(error => {
        dispatch('openSnackbar', { message: error.response.statusText })
      })
  },
  login: ({ commit, dispatch }, { email, password }) => {
    axios.post('auth/login', { email, password })
      .then(response => {
        commit('SET_USER_TOKEN', response.data.access_token)
        dispatch('fetchLoggedUserData')

        const now = new Date()
        const expirationDate = new Date(now.getTime() + 3600 * 1000)
        // dispatch('setLogoutTimer', expirationDate)

        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('expirationDate', expirationDate)
        router.push('/orders')
      })
      .catch(error => {
        dispatch('openSnackbar', { message: error.response.statusText })
      })
  },
  fetchLoggedUserData: ({ commit, dispatch }) => {
    axios.post('auth/me')
      .then(response => {
        const user = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email
        }
        localStorage.setItem('userData', JSON.stringify(user))
        commit('SET_USER_DATA', user)
      })
      .catch(error => {
        dispatch('openSnackbar', { message: error.response.statusText })
      })
  },
  fetchSalesUsers: ({ commit }) => {
    axios.get('users/role?role=sales_person')
      .then(response => {
        commit('SET_SALES_PERSONS', response.data)
      })
  },
  fetchAllUsers: ({ commit }) => {
    axios.get('users')
      .then(response => {
        commit('SET_ALL_USERS', response.data)
      })
  },
  tryAutoLogin: ({ commit }) => {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }

    const expirationDate = localStorage.getItem('expirationDate')
    const now = new Date()
    if (now <= expirationDate) {
      return
    }

    commit('SET_USER_TOKEN', token)
    const user = JSON.parse(localStorage.getItem('userData'))
    if (user !== null) {
      commit('SET_USER_DATA', user)
    }
    return true
  },
  setLogoutTimer: ({ commit }, expirationTime) => {
    setTimeout(() => {
      commit('DESTROY_USER_TOKEN')
    }, expirationTime * 1000)
  },
  logout: ({ commit }) => {
    commit('DESTROY_USER_TOKEN')
  }
}

const getters = {
  isAuth (state) {
    return state.userToken !== null
  },
  userData (state) {
    return state.userData
  },
  userToken (state) {
    return state.userToken
  },
  salesPersons (state) {
    return state.salesPersons
  },
  users (state) {
    return state.users
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
