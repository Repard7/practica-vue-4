import { createStore } from 'vuex'
import { loginRequest, registerRequest } from '@/utils/api.js' // обнови импорт

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
    },
    AUTH_ERROR: (state) => {
      state.token = '';
    }
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
          throw error; // пробрасываем ошибку дальше
        });
    },
    // Новое действие для регистрации
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
      return Promise.resolve(); // для возможности использовать .then() в компоненте
    }
  },
  modules: {}
});