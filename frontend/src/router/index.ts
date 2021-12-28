import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Signin from '../views/Signin.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import Address from '../views/Address.vue'
import Payment from '../views/Payment.vue'
import Products from '../views/Products.vue'
import Product from '../views/Product.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/address',
    name: 'Address',
    component: Address
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
