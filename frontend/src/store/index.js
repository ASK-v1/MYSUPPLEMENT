import { createStore } from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    cart: [],
    status: '',
    token: localStorage.getItem('token') || '',
    userData: {},
    products: {}
  },
  mutations: {
    REQUEST (state) {
      state.status = 'loading'
    },
    SUCCESS (state) {
      state.status = 'success'
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
    },
    CLEAR (state) {
      state.cart = []
    }
  },
  actions: {
    async loginUser ({ commit }, user) {
      commit('REQUEST')
      const { data } = await axios.post('http://localhost:3000/users/login', user)
      const { token, userData } = data
      localStorage.setItem('token', token)
      commit('USER_DATA', userData)
      commit('AUTH_SUCCESS', token)
    },
    async registerUser ({ commit }, user) {
      commit('REQUEST')
      await axios.post('http://localhost:3000/users/register', user)
      commit('SUCCESS')
    },
    async logoutUser ({ commit }) {
      localStorage.removeItem('token')
      commit('LOGOUT')
    },
    async getAddress ({ commit }, userId) {
      commit('REQUEST')
      const { data } = await axios.get(`http://localhost:3000/users/address/get/${userId}`)
      const { userData } = data
      commit('USER_DATA', userData)
      commit('SUCCESS')
    },
    async saveAddress ({ commit }, save) {
      commit('REQUEST')
      await axios.put('http://localhost:3000/users/address/save', save)
      await this.dispatch('getAddress', this.getters.user._id)
      commit('SUCCESS')
    },
    async deleteAddress ({ commit }, data) {
      commit('REQUEST')
      await axios.delete(`http://localhost:3000/users/address/delete/${data.userId}/${data.addr}`)
      await this.dispatch('getAddress', this.getters.user._id)
      commit('SUCCESS')
    },
    async getProduct ({ commit }) {
      commit('REQUEST')
      const { data } = await axios.get('http://localhost:3000/products/get')
      const { productData } = data
      commit('PRODUCT_DATA', productData)
      commit('SUCCESS')
    },
    async addProduct ({ commit }, product) {
      commit('REQUEST')
      await axios.post('http://localhost:3000/products/add', product)
      await this.dispatch('getProduct')
      commit('SUCCESS')
    },
    async deleteProduct ({ commit }, productId) {
      commit('REQUEST')
      await axios.delete(`http://localhost:3000/products/delete/${productId}`)
      await this.dispatch('getProduct')
      commit('SUCCESS')
    },
    async addReview ({ commit }, review) {
      commit('REQUEST')
      await axios.put('http://localhost:3000/products/review', review)
      await this.dispatch('getProduct')
      commit('SUCCESS')
    },
    async selectAddress ({ commit }, select) {
      commit('REQUEST')
      await axios.put('http://localhost:3000/users/select', select)
      await this.dispatch('getAddress', this.getters.user._id)
      commit('SUCCESS')
    },
    addToCart ({ commit }, product) {
      commit('ADD_TO_CART', product)
    },
    deleteCart ({ commit }, product) {
      commit('DELETE_CART', product)
    },
    addQty ({ commit }, product) {
      commit('ADD_QTY', product)
    },
    async placeOrder ({ commit }, orderSummary) {
      commit('REQUEST')
      await axios.put('http://localhost:3000/products/order', orderSummary)
      await axios.put('http://localhost:3000/users/order', orderSummary)
      await this.dispatch('getAddress', this.getters.user._id)
      await this.dispatch('getProduct')
      commit('CLEAR')
      commit('SUCCESS')
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    status: state => state.status,
    user: state => state.userData,
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
