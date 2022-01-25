<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import store from '../store/index.js'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

const route = useRoute()
window.scrollTo(0, 0)
const loading = ref(false)

onMounted(() => {
  (async () => {
    loading.value = true
    const data = {
      category: route.params.category
    }
    try {
      await store.dispatch('getCategory', data)
      loading.value = false
    } catch (error) {
      console.log(error)
      loading.value = false
    }
  })()
})
</script>

<template>
  <div class="products">
    <div class="products-navbar">
      <Navbar />
    </div>
    <div class="products-body">
      <div class="products-body-items">
        <div v-for="(product, index) in store.getters.category" :key="index">
          <router-link :to="`/product/${product._id}`" class="products-body-items-row">
            <div class="products-body-items-row-image">
              <img :src="product.img" width="250" />
            </div>
            <div class="products-body-items-row-name">
              <h3>{{ product.name }}</h3>
            </div>
            <div class="products-body-items-row-rating">
              <el-rate
                v-model="store.state.ratings[index]"
                disabled
                show-score
                text-color="#ff9900"
              ></el-rate>
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
  <div v-loading.fullscreen.lock="loading === true" />
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.products {
  &-body {
    display: flex;
    width: 1300px;
    margin: auto;

    &-items {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 50px;
      margin-bottom: 100px;

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
