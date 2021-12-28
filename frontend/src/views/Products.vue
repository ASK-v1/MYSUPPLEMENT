<script lang="ts" setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Filters from '@/components/Filters.vue'
import { bestsellersFirst, bestsellersSecond } from '../best'
import { ref, onMounted } from 'vue'

onMounted(() => {
  window.scrollTo(0, 0)
})

const moreBest = bestsellersFirst.concat(bestsellersSecond).concat(bestsellersSecond).concat(bestsellersFirst).concat(bestsellersFirst)
const value = ref(3.7)

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
      <div class="products-body-item">
        <div v-for="best in moreBest" :key="best.price" class="products-body-items">
          <div class="products-body-items-image">
            <router-link to="/product">
              <img :src="best.url" width="260" />
            </router-link>
          </div>
          <div class="products-body-items-title">
            <h2>{{ best.title }}</h2>
          </div>
          <div class="products-body-items-rating">
            <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value} points"
            ></el-rate>
          </div>
          <div class="products-body-items-price">
            <h2>{{ best.price }}</h2>
          </div>
          <div class="products-body-items-add">
            <button class="add-cart">ADD TO CART</button>
          </div>
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
    flex-direction: row;

    &-filters {
      position: relative;
      left: 0;
    }

    &-item {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 0 50px 250px 50px;
      gap: 50px;

      .products-body-items {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        &-title,
        &-price {
          font-size: $base-font-s;
        }

        &-add {
          button {
            color: white;
            padding: 20px;
            font-size: $base-font-m;
            box-shadow: $base-shadow;
            background-color: $primary-color;
            font-family: "Nunito Sans", sans-serif;
            border: none;
            font-weight: 600;
            margin-bottom: 20px;

            &:hover {
              background-color: $primary-color-dark;
              transition: all 0.3s ease-in-out 0s;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
