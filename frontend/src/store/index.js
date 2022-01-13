import { createStore } from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    cart: [],
    qty: '',
    status: '',
    step: '',
    token: localStorage.getItem('token') || '',
    userData: {},
    products: {}
  },
  mutations: {
    AUTH_REQUEST (state) {
      state.status = 'loading'
    },
    AUTH_SUCCESS (state, payload) {
      state.status = 'success'
      state.token = payload
    },
    USER_DATA (state, payload) {
      state.userData = payload
    },
    PRODUCT_DATA (state, payload) {
      state.products = payload
    },
    LOGOUT (state) {
      state.status = ''
      state.token = ''
      state.userData = ''
    },
    ADD_TO_CART (state, payload) {
      const inCart = state.cart.find(item => { return item.product._id === payload.product._id })
      if (inCart) inCart.qty += payload.qty
      else state.cart.push(payload)
    },
    DELETE_CART (state, payload) {
      const index = state.cart.map(item => item.product._id).indexOf(payload.product._id)
      state.cart.splice(index, 1)
    },
    ADD_QTY (state, payload) {
      const inCart = state.cart.find(item => { return item.product._id === payload.id })
      inCart.qty = payload.qty
    }
  },
  actions: {
    async loginUser ({ commit }, user) {
      commit('AUTH_REQUEST')
      const { data } = await axios.post('http://localhost:3000/users/login', user)
      const { token, userData } = data
      localStorage.setItem('token', token)
      commit('AUTH_SUCCESS', token)
      commit('USER_DATA', userData)
    },
    async registerUser ({ commit }, user) {
      await axios.post('http://localhost:3000/users/register', user)
    },
    async logoutUser ({ commit }) {
      localStorage.removeItem('token')
      commit('LOGOUT')
    },
    async getAddress ({ commit }, userId) {
      const { data } = await axios.get(`http://localhost:3000/users/address/get/${userId}`)
      const { userData } = data
      commit('USER_DATA', userData)
    },
    async saveAddress ({ commit }, save) {
      await axios.put('http://localhost:3000/users/address/save', save)
      await this.dispatch('getAddress', this.getters.user._id)
    },
    async deleteAddress ({ commit }, data) {
      await axios.delete(`http://localhost:3000/users/address/delete/${data.userId}/${data.addr}`)
      await this.dispatch('getAddress', this.getters.user._id)
    },
    async getProduct ({ commit }) {
      const { data } = await axios.get('http://localhost:3000/products/get')
      const { productData } = data
      commit('PRODUCT_DATA', productData)
    },
    async addProduct ({ commit }, product) {
      await axios.post('http://localhost:3000/products/add', product)
      await this.dispatch('getProduct')
    },
    async deleteProduct ({ commit }, productId) {
      await axios.delete(`http://localhost:3000/products/delete/${productId}`)
      await this.dispatch('getProduct')
    },
    async addReview ({ commit }, review) {
      await axios.put('http://localhost:3000/products/review', review)
      await this.dispatch('getProduct')
    },
    addToCart ({ commit }, product) {
      commit('ADD_TO_CART', product)
    },
    deleteCart ({ commit }, product) {
      commit('DELETE_CART', product)
    },
    addQty ({ commit }, product) {
      commit('ADD_QTY', product)
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.userData,
    step: state => state.step,
    products: state => state.products,
    cart: state => state.cart,
    totalPrice: (state) => {
      let total = 0
      state.cart.forEach(item => { total += (item.product.price * item.qty) })
      return total.toFixed(2)
    }
  },
  plugins: [createPersistedState()]
})
