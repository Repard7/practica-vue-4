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
    groupedCart: (state) => {
      const groups = {};
      state.cart.forEach(item => {
        const key = item.product_id;
        if (!groups[key]) {
          groups[key] = {
            product_id: item.product_id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
            quantity: 0
          };
        }
        groups[key].quantity += 1;
      });
      return Object.values(groups);
    }
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
    },

    ADD_TO_CART: ({ commit, dispatch, state }, productId) => {
      const API = process.env.VUE_APP_API.replace(/\/$/, '');
      return fetch(`${API}/cart/${productId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${state.token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(err => Promise.reject(err));
          }
          return response.json();
        })
        .then(data => {
          // После успешного добавления обновляем корзину
          dispatch('FETCH_CART');
          return data;
        })
        .catch(error => {
          console.error('Ошибка добавления в корзину:', error);
          throw error;
        });
    }
  },
  modules: {}
});