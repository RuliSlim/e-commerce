import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import { config } from '@/config/config.js';
axios.defaults.baseURL = config.$url;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    product: {}
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload;
    },
    SET_PRODUCT (state, payload) {
      state.product = payload;
    }
  },
  actions: {
    getProducts({ commit }, payload) {
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(({data}) => {
          commit('SET_PRODUCTS', data);
        })
        .catch(err => {
          
        })
    }
  },
  modules: {
  }
});
