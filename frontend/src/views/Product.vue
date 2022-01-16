<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Reviews from '@/components/Reviews.vue'
import { computed, ref } from 'vue'
import store from '../store'
import { useRoute } from 'vue-router'

window.scrollTo(0, 0)
const route = useRoute()

const product = computed(() => {
  return store.getters.products.filter((product) => product._id === route.params.productId)[0]
})

const showSuccess = ref(false)
const showError = ref(false)
const qty = ref(1)
const sum = ref(0)
const flavor = ref('')
const flavors = product.value.flavor[0].split(',')

if (product.value.review.length) {
  product.value.review.forEach((review) => { sum.value += review.rating })
  sum.value = (sum.value /= product.value.review.length).toFixed(1)
} else sum.value = 0

const addCart = () => {
  if (flavor.value === '') showError.value = true
  else {
    const data = {
      product: product.value,
      qty: qty.value,
      flavor: flavor.value
    }
    showError.value = false
    showSuccess.value = true
    store.dispatch('addToCart', data)
  }
}
</script>

<template>
  <div class="product">
    <div class="product-navbar">
      <Navbar />
    </div>
    <div class="product-body">
      <div class="product-body-bc-img">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/products' }">Products</el-breadcrumb-item>
          <el-breadcrumb-item>{{ product.brand }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div
          v-bind:class="{
            'product-body-bc-img-image': product.qty !== 0,
            'product-body-bc-img-image-soldout': product.qty === 0
          }"
        >
          <img :src="product.img" width="350" height="350" />
        </div>
      </div>
      <div class="product-body-items">
        <div class="product-body-items-brand">
          <h2>{{ product.brand }}</h2>
        </div>
        <div class="product-body-items-name">
          <h2>{{ product.name }}</h2>
        </div>
        <div class="products-body-items-rating">
          <el-rate v-model="sum" disabled show-score text-color="#ff9900"></el-rate>
        </div>
        <div class="product-body-items-info">{{ product.info }}</div>
      </div>
    </div>
    <el-alert
      v-if="showError"
      title="Please select a flavor"
      type="error"
      show-icon
      effect="dark"
      center
    ></el-alert>
    <el-alert
      v-if="showSuccess"
      title="Added to your cart"
      type="success"
      show-icon
      effect="dark"
      center
    ></el-alert>
    <div v-if="product.qty !== 0" class="product-bar">
      <div class="product-bar-price">${{ product.price }}</div>
      <div class="product-bar-size">{{ product.servings }} Servings</div>
      <div class="product-bar-flavor">
        <h4>Flavor</h4>
        <el-select v-model="flavor" placeholder="Select">
          <el-option v-for="item in flavors" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="product-bar-qty">
        <h4>Qty</h4>
        <el-input-number v-model="qty" :min="1" :max="product.qty" size="large" />
      </div>
      <button class="product-bar-button" @click="addCart">ADD TO CART</button>
    </div>
    <div v-else class="product-bar">
      <h1>SOLD OUT</h1>
    </div>
    <div class="product-reviews">
      <Reviews></Reviews>
    </div>
    <div class="product-footer">
      <Footer />
    </div>
  </div>
  <div v-loading.fullscreen.lock="store.getters.status === 'loading'" />
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.product {
  display: flex;
  flex-direction: column;

  &-body {
    margin: 50px 0 150px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;

    &-bc-img {
      display: flex;
      align-items: center;
      flex-direction: column;

      &-image {
        &-soldout {
          filter: grayscale(100%);
        }
      }
    }

    &-items {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 25px;
      margin: 0 300px 0 300px;

      &-brand {
        background-color: black;
        color: white;
        padding: 10px;
        align-self: flex-start;
        font-family: "Lilita One", cursive;
        font-size: $base-font-s;
      }

      &-info {
        inline-size: 500px;
      }
    }
  }

  &-bar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 50px;
    align-items: center;
    padding: 25px;
    padding-bottom: 50px;
    background-color: $primary-color;
    margin-bottom: 150px;

    h1 {
      font-family: "Lilita One", cursive;
      color: white;
      margin-top: 10px;
    }

    &-price,
    &-size {
      padding: $base-padding;
      color: black;
      margin-top: 25px;
      background-color: rgb(255, 255, 255);
      border-radius: 10px;
      border: 5px solid black;
      font-family: "Lilita One", cursive;
      font-size: $base-font-m;
    }

    &-flavor,
    &-qty {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      font-weight: 600;
      gap: 10px;
      font-family: "Lilita One", cursive;
      font-size: $base-font-m;
    }

    &-button {
      color: rgb(255, 255, 255);
      padding: 25px;
      font-size: $base-font-m;
      font-weight: bold;
      background-color: rgb(0, 0, 0);
      text-align: center;
      margin-top: 30px;
      box-shadow: $base-shadow;
      border: none;

      &:hover {
        background-color: $dark;
        transition: all 0.3s ease-in-out 0s;
        cursor: pointer;
      }
    }
  }
  &-footer {
    margin-top: 200px;
  }
}
</style>
