<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Filters from '@/components/Filters.vue'
import store from '../store/index.js'
import { ref } from 'vue'

window.scrollTo(0, 0)
const value = ref(3.7)

const getProduct = async () => {
  try {
    await store.dispatch('getProduct')
  } catch (error) {
    console.log(error)
  }
}
getProduct()

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
        <div v-for="product in store.getters.products" :key="product">
          <router-link  to="/product" class="products-body-items-row">
            <div class="products-body-items-row-image">
              <img :src="product.img" width="260" />
            </div>
            <div class="products-body-items-row-name">
              <h3>{{ product.name }}</h3>
            </div>
            <div class="products-body-items-row-rating">
              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value} points"
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
      justify-content: center;
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
          color: rgb(0, 0, 0);
          padding: 10px;
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
