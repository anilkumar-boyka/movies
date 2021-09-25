import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || null,
        email: localStorage.getItem('email') || null
    },
    getters: {
        isAuthenticated: ((state => (state.token !== null && state.email !== null))),
        getEmail: state => state.email,
    },
    mutations: {
        setLoginToken(state, userInfo) {
            state.token = userInfo.accessToken;
            state.email = userInfo.email
        },
        logout(state) {
            state.token = null;
            state.email = null
        }

    },
    actions: {
        login: function ({ commit }, userInfo) {
            localStorage.setItem('token', userInfo.accessToken)
            localStorage.setItem('email', userInfo.email)
            commit('setLoginToken', userInfo);
        },
        logout: function ({ commit }) {
            localStorage.clear();
            commit('logout')
        }
    }
})
export default store;