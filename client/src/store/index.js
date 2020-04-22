import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import { config } from '@/config/config.js';
axios.defaults.baseURL = config.$url;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    carts: [],
    cartsList: [],
    totalAmount: 0
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload;
    },
    SET_PRODUCT (state, payload) {
      state.product = payload;
    },
    SET_CARTS (state, payload) {
      state.carts = payload;
    },
    ADD_TO_CART (state, payload) {
      state.carts.push(payload);
    },
    SET_AMOUNT (state, payload) {
      state.totalAmount = payload;
    },
    SET_CARTSLIST (state, payload) {
      // state.cartsList = payload;
      state.cartsList = [...payload]
    },
    UPDATE_CARTLIST: (state, payload) => {
      let data = {
        id: payload.ProductId,
        CartId: payload.id,
        amount: payload.amount,
        name: payload.Product.name,
        image: payload.Product.image,
        price: payload.Product.price,
        stock: payload.Product.stock,
      }
      let index
      for(let i in state.cartsList){
        if(state.cartsList[i].CartId == data.CartId){
          index = i
        }
      }
      state.cartsList.splice(index,1,data);
      state.totalAmount = 0;
      state.cartsList.forEach(el => state.totalAmount += el.amount);
      console.log('masuk')
    },
    ADD_AMOUNT (state, payload) {
      state.totalAmount += payload;
    },
    RESET_STATE (state) {
      state.totalAmount = 0
      state.products = []
      state.product = {}
      state.carts = []
      state.cartsList = []
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
    },
    getCarts ({ commit }) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          let { Carts } = data;
          let amount = 0;
          let products = []
          Carts.forEach(el => {
            amount += el.amount;
            products.push({
              id: el.Product.id,
              name:  el.Product.name,
              image:  el.Product.image,
              price:  el.Product.price,
              amount:  el.amount,
              stock: el.Product.stock,
              CartId: el.id
            });
          })
          commit('SET_AMOUNT', amount);
          commit('SET_CARTSLIST', products);
        })
        .catch(err => console(err.response));
    },
    addToCart ({ commit, dispatch }, payload) {
      return axios({
        method: 'POST',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          amount: payload.amount,
          ProductId: payload.id
        }
      })
        .then(({ data }) => {
          console.log(data, 'masuk sini');
          commit('ADD_AMOUNT', payload.amount)
          dispatch('getCarts');
          // commit('ADD_AMOUNT', payload.amount)
        }) 
    },
    updateCart ({ commit }, payload) {
      axios({
        method: 'PUT',
        url: '/carts/' + payload.id,
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          // console.log(data)
          commit('UPDATE_CARTLIST', data);
        })
        .catch(err => console(err));
    },
    deleteCart ({ commit }, payload) {
      return axios({
        method: 'DELETE',
        url: '/carts/' + payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    checkout ({ commit, state }) {
      return axios({
        method: 'POST',
        url: '/carts/checkout',
        data: state.cartsList,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    }
  },
  modules: {
  }
});
