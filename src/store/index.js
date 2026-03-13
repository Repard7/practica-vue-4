import { createStore } from 'vuex'
import { loginRequest, registerRequest } from '@/utils/api.js'

const API = process.env.VUE_APP_API;

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
    products: [],
    cart: []
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    products: (state) => state.products,
    cart: (state) => state.cart,
  },
  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
    },
    AUTH_ERROR: (state) => {
      state.token = '';
    },
    SET_PRODUCTS: (state, products) => {
      state.products = products;
    },
    SET_CART: (state, items) => {
      state.cart = items;
    },
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return loginRequest(user)
        .then((token) => {
          commit('AUTH_SUCCESS', token);
          localStorage.setItem('myAppToken', token);
        })
        .catch((error) => {
          commit('AUTH_ERROR');
          localStorage.removeItem('myAppToken');
          throw error;
        });
    },
    REGISTER_REQUEST: ({ commit }, user) => {
      return registerRequest(user)
        .then((token) => {
        })
        .catch((error) => {
          throw error;
        });
    },
    LOGOUT: ({ commit }) => {
      commit('AUTH_ERROR');
      localStorage.removeItem('myAppToken');
      return Promise.resolve();
    },

    FETCH_PRODUCTS: ({ commit }) => {
      return fetch(`${API}/products`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка загрузки товаров');
          }
          return response.json();
        })
        .then(data => {
          commit('SET_PRODUCTS', data.data); 
        })
        .catch(error => {
          console.error('Ошибка FETCH_PRODUCTS:', error);
          throw error;
        });
    },
    FETCH_CART: ({ commit, state }) => {
      const API = process.env.VUE_APP_API.replace(/\/$/, '');
      return fetch(`${API}/cart`, {
        headers: {
          'Authorization': `Bearer ${state.token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            if (response.status === 401) {
            }
            throw new Error('Ошибка загрузки корзины');
          }
          return response.json();
        })
        .then(data => {
          commit('SET_CART', data.data);
        })
        .catch(error => {
          console.error('FETCH_CART error:', error);
          throw error;
        });
    }
  },
  modules: {}
});