import axios from 'axios'
import router from '../router'

const baseUrl = process.env.NODE_ENV === "development" ? 'http://localhost:5000' : 'https://mevn-dashboard.herokuapp.com'

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    error: null
}
const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    authError: state => state.error
}
const actions = {
    //login user
    async login({ commit }, user) {
        try {
            commit('auth_request')

            let res = await axios.post(baseUrl + '/api/users/login', user)
            if (res.data.success) {
                const token = res.data.token
                const user = res.data.user

                localStorage.setItem('token', token)

                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', token, user)
            }
            return res
        } catch (err) {
            commit('auth_error', err)
        }
    },

    //register user
    async register({ commit }, userData) {
        try {
            commit('register_request')
            let res = await axios.post(baseUrl + '/api/users/register', userData)
            if (res.data.success !== undefined) {
                commit('register_success')
            }
            return res
        } catch (err) {
            commit('auth_error', err)
        }
    },

    //get user data
    async getUser({ commit }) {
        commit('get_request')
        let res = await axios.get(baseUrl + '/api/users/get')
        commit('get_user', res.data.user)
        return res
    },

    //logout
    async logout({ commit }) {
        await localStorage.removeItem('token')
        commit('logout')
        delete axios.defaults.headers.common['Authorization']
        router.push('/login')
        return
    }
}
const mutations = {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, token, user) {
        state.token = token
        state.user = user
        state.status = 'success'
        state.error = null
    },
    register_request(state) {
        state.status = 'loading'
    },
    register_success(state) {
        state.status = 'success'
        state.error = null
    },
    auth_error(state, err) {
        state.error = err.response.data.message
    },
    get_request(state) {
        state.status = 'loading'
    },
    get_user(state, payload) {
        state.status = 'success'
        state.error = null
        state.user = payload
    },
    logout(state) {
        state.status = ''
        state.token = ''
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}