import { loginService } from '@/services/login/login'

const state = {
    selectLogin:[]
}

// getters
const getters = {
    getselectLogin:() => state.selectLogin,
}

// actions
const actions = {
    loadSelectLogin: ({ commit }) => {
        
        return loginService.getUser()
        .then(s => {
            commit('getSelectLogin',s);
            return s
        },
        ).catch(s => {
            console.log(s);
        })
    }
}

// mutations
const mutations = {
    getSelectLogin(state,payload) {
        state.selectLogin = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }