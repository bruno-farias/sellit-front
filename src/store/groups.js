import axios from 'axios'
import router from '../router';

const state = {
  groups: [],
  selectedGroup: {}
}

const mutations = {
  'SET_GROUP_LIST' (state, groups) {
    const list = groups.map(item => {
      return {
        id: item.id,
        name: item.name,
        description: item.description
      }
    })

    state.groups = list
  },
  'SET_SELECTED_GROUP' (state, selectedGroup) {
    state.selectedGroup = selectedGroup
  }
}

const actions = {
  fetchGroupList: ({ commit, dispatch }) => {
    dispatch('setLoadingStatus', true)
    dispatch('setLoadingMessage', 'Please wait...')
    axios.get('groups')
      .then(response => {
        commit('SET_GROUP_LIST', response.data)
      })
      .catch(error => {
        console.log({ error })
        dispatch('openSnackbar', { message: error.response.statusText })
      })
      .finally(_ => {
        dispatch('setLoadingStatus', false)
      })
  },
  createGroup: ({ commit, dispatch }, { groupData }) => {
    dispatch('setLoadingStatus', true)
    dispatch('setLoadingMessage', 'Please wait...')
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: groupData,
      url: 'groups'
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
  groups (state) {
    return state.groups
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
