import { createStore } from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    token: '',
    cart: [],
    userData: [],
    products: [],
    category: [],
    ratings: []
  },
  mutations: {
    USER_AUTH (state, payload) {
      state.token = payload
    },
    USER_DATA (state, payload) {
      state.userData = payload
    },
    PRODUCT_DATA (state, payload) {
      state.products = payload
      state.cart.forEach((cart) => {
        payload.forEach((p) => {
          if (cart.product._id === p._id) cart.product.qty = p.qty
        })
      })
    },
    LOGOUT (state) {
      state.token = ''
      state.userData = ''
    },
    ADD_TO_CART (state, payload) {
      const inCart = state.cart.find((item) => item.product._id === payload.product._id)
      if (inCart) inCart.qty += payload.qty
      else state.cart.push(payload)
    },
    DELETE_CART (state, payload) {
      const index = state.cart
        .map((item) => item.product._id)
        .indexOf(payload.product._id)
      state.cart.splice(index, 1)
    },
    ADD_QTY (state, payload) {
      const inCart = state.cart.find((item) => item.product._id === payload.id)
      inCart.qty = payload.qty
    },
    CLEAR (state) {
      state.cart = []
    },
    CATEGORY (state, payload) {
      state.category = payload
    },
    PRODUCT_RATINGS (state, payload) {
      let sum = 0
      payload.forEach((product, key) => {
        if (product.review.length) {
          product.review.forEach((review) => {
            sum += review.rating
          })
          sum = (sum /= product.review.length).toFixed(1)
          state.ratings[key] = sum
          sum = 0
        } else sum = 0
      })
    }
  },
  actions: {
    async loginUser ({ commit }, user) {
      const { data } = await axios.post('http://localhost:3000/users/login', user)
      const { userData, token } = data
      commit('USER_AUTH', token)
      commit('USER_DATA', userData)
    },
    async registerUser ({ commit }, user) {
      await axios.post('http://localhost:3000/users/register', user)
    },
    async logoutUser ({ commit }) {
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
      commit('PRODUCT_RATINGS', productData)
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
    async selectAddress ({ commit }, select) {
      await axios.put('http://localhost:3000/users/select', select)
      await this.dispatch('getAddress', this.getters.user._id)
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
      await axios.put('http://localhost:3000/products/order', orderSummary)
      await axios.put('http://localhost:3000/users/order', orderSummary)
      await axios.put('http://localhost:3000/users/admin', orderSummary)
      await this.dispatch('getAddress', this.getters.user._id)
      commit('CLEAR')
    },
    async getCategory ({ commit }, products) {
      const { data } = await axios.get(`http://localhost:3000/products/get/${products.category}`)
      await this.dispatch('getProduct')
      const { productData } = data
      commit('CATEGORY', productData)
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    user: (state) => state.userData,
    products: (state) => state.products,
    category: (state) => state.category,
    cart: (state) => state.cart,
    totalPrice: (state) => {
      let total = 0
      state.cart.forEach((item) => {
        total += item.product.price * item.qty
      })
      return total.toFixed(2)
    }
  },
  plugins: [createPersistedState()]
})
