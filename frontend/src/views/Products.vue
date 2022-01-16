<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Filters from '@/components/Filters.vue'
import store from '../store/index.js'
import { onMounted, ref } from 'vue'

window.scrollTo(0, 0)

onMounted(() => {
  (async () => {
    try {
      await store.dispatch('getProduct')
    } catch (error) {
      console.log(error)
    }
  })()
})

const ratings = ref([])
const sum = ref(0)

store.getters.products.forEach((product, key) => {
  if (product.review.length) {
    product.review.forEach((review) => {
      sum.value += review.rating
    })
    sum.value = (sum.value /= product.review.length).toFixed(1)
    ratings.value[key] = sum.value
    sum.value = 0
  } else sum.value = 0
})
</script>

<template>
  <div class="products">
    <div class="products-navbar">
      <Navbar />
    </div>
    <div class="products-body">
      <div class="products-body-filters">
        <Filters />
      </div>
      <div class="products-body-items">
        <div v-for="(product, index) in store.getters.products" :key="product">
          <router-link :to="`/product/${product._id}`" class="products-body-items-row">
            <div class="products-body-items-row-image">
              <img :src="product.img" width="250" />
            </div>
            <div class="products-body-items-row-name">
              <h3>{{ product.name }}</h3>
            </div>
            <div class="products-body-items-row-rating">
              <el-rate v-model="ratings[index]" disabled show-score text-color="#ff9900"></el-rate>
            </div>
            <div class="products-body-items-row-price">
              <h2>${{ product.price }}</h2>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="products-footer">
      <Footer />
    </div>
  </div>
  <div v-loading.fullscreen.lock="store.getters.status === 'loading'" />
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.products {
  &-body {
    display: flex;

    &-filters {
      position: relative;
      left: 0;
    }

    &-items {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 50px;
      margin: 0 20px 200px 20px;

      &-row {
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 15px;
        color: black;
        text-decoration: none;

        &-price {
          font-weight: 600;
          color: black;
          padding: $base-padding;
          width: 250px;
        }

        &:hover {
          box-shadow: $base-shadow;
          transition: all 0.3s ease-in-out 0s;

          .products-body-items-row-price {
            font-weight: 600;
            background-color: $primary-color;
            color: white;
            transition: all 0.3s ease-in-out 0s;
          }
        }
      }
    }
  }
}
</style>
