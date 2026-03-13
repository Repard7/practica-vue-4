import { createStore } from 'vuex'
import { loginRequest, registerRequest } from '@/utils/api.js'

const API = process.env.VUE_APP_API; // базовая ссылка на API

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
    products: [], // список товаров
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    products: (state) => state.products,
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
          // После регистрации не логиним автоматически
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
    // Новое действие для загрузки товаров
    FETCH_PRODUCTS: ({ commit }) => {
      return fetch(`${API}/products`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка загрузки товаров');
          }
          return response.json();
        })
        .then(data => {
          commit('SET_PRODUCTS', data.data); // предполагаем, что данные в data.data
        })
        .catch(error => {
          console.error('Ошибка FETCH_PRODUCTS:', error);
          throw error;
        });
    }
  },
  modules: {}
});