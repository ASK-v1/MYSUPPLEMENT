<script lang="ts" setup>
import { bestsellersFirst, bestsellersSecond } from '../best'
import { ref } from 'vue'
const value = ref(3.7)
</script>

<template>
  <div class="best">
    <div class="best-seller">
      <div class="best-title">
        <h1>BESTSELLERS</h1>
      </div>
      <div class="best-product-first">
        <div v-for="best in bestsellersFirst" :key="best.price" class="product-first">
          <div class="image">
            <router-link to="/">
              <img :src="best.url" />
            </router-link>
          </div>
          <div class="product-title">
            <h2>{{ best.title }}</h2>
          </div>
          <div class="product-rating">
            <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value} points"
            ></el-rate>
          </div>
          <div class="product-price">
            <h2>{{ best.price }}</h2>
          </div>
          <div class="product-button">
            <button class="add-cart">ADD TO CART</button>
          </div>
        </div>
      </div>
      <div class="best-product-second">
        <div v-for="best in bestsellersSecond" :key="best.price" class="product-second">
          <div class="image">
            <router-link to="/">
              <img :src="best.url" />
            </router-link>
          </div>
          <div class="product-title">
            <h2>{{ best.title }}</h2>
          </div>
          <div class="product-rating">
            <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value} points"
            ></el-rate>
          </div>
          <div class="product-price">
            <h2>{{ best.price }}</h2>
          </div>
          <div class="product-button">
            <button class="add-cart">ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.best {
  margin-bottom: 200px;
  margin-top: 100px;

  .best-seller {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;

    .best-title {
      background-color: rgb(0, 0, 0);
      color: white;
      font-family: "Lilita One", cursive;
      font-size: $base-font-m;
      padding: $base-padding;
    }

    .best-product-first {
      display: flex;
      text-align: center;
      gap: 10px;
      .product-first {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 10px;
      }
    }

    .best-product-second {
      display: flex;
      text-align: center;
      flex: 1;
      gap: 10px;
      .product-second {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 10px;
      }
    }

    .product-title,
    .product-price {
      font-size: $base-font-s;
    }

    .add-cart {
      color: white;
      text-decoration: none;
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
</style>
