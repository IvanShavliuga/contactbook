import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    types: [
      'telegram',
      'email',
      'phone'
    ],
    select: null,
    list: [{
      id: 1,
      name: 'iv2',
      show: true,
      contacts: [{
        type: 'telegram',
        link: '@IvanShavliuga'
      }, {
        type: 'email',
        link: 'ivanov-ROM-88@yandex.by'
      }]
    }, {
      id: 2,
      name: 'test #1',
      show: true,
      contacts: [{
        type: 'phone',
        link: '+0 011 111 11 11'
      }, {
        type: 'telegram',
        link: 'test-is-test'
      }]
    }, {
      id: 3,
      name: 'test #2',
      show: true,
      contacts: [{
        type: 'phone',
        link: '+0 022 22 22 22'
      }, {
        type: 'email',
        link: 't2@test.tst'
      }]
    }]
  },
  mutations: {
    SHOW_ITEM (state, obj) {
      const ind = state.list.findIndex((el) => {
        return el.id === obj.id
      })
      state.list[ind].show = !state.list[ind].show
    },
    SELECT_ITEM (state, obj) {
      const ind = state.list.findIndex((el) => {
        return el.id === obj.id
      })
      const dta = {
        name: state.list[ind].name,
        show: state.list[ind].show,
        contacts: state.list[ind].contacts
      }
      state.select = dta
    }
  },
  actions: {
    showItem ({ commit }, obj) {
      commit('SHOW_ITEM', obj)
    },
    selectItem ({ commit }, obj) {
      commit('SELECT_ITEM', obj)
    }
  },
  getters: {
    types: state => state.types,
    list: state => state.list,
    select: state => state.select
  }
})
