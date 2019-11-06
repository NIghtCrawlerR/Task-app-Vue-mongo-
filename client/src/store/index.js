import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './auth'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        Auth
    },
    state: {},
    getters: {},
    mutations: {},
    actions: {},
});