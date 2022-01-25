<script setup>
import { onMounted } from 'vue'
import store from '../store/index.js'

onMounted(() => {
  (async () => {
    try {
      await store.dispatch('getProduct')
    } catch (error) {
      console.log(error)
    }
  })()
})
</script>

<template>
  <div class="best">
    <div class="best-title">
      <h1>BESTSELLERS</h1>
    </div>
    <div class="best-products">
      <div v-for="(best, key) in store.getters.products" :key="best">
        <router-link :to="`/product/${best._id}`" class="best-products-items">
          <div class="best-products-items-image">
            <img :src="best.img" width="260" />
          </div>
          <div class="best-products-items-name">
            <h3>{{ best.name }}</h3>
          </div>
          <div class="best-products-items-rating">
            <el-rate v-model="store.state.ratings[key]" disabled show-score text-color="#ff9900"></el-rate>
          </div>
          <div class="best-products-items-price">
            <h2>${{ best.price }}</h2>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.best {
  margin-bottom: 200px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-title {
    background-color: rgb(0, 0, 0);
    color: white;
    font-family: "Lilita One", cursive;
    font-size: $base-font-m;
    padding: $base-padding;
    margin-bottom: 50px;
  }

  &-products {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 25px;
    width: 1300px;
    margin: auto;

    &-items {
      display: flex;
      flex-direction: column;
      gap: 15px;
      text-decoration: none;
      color: black;

      &-price {
        font-weight: 600;
        color: black;
        padding: $base-padding;
        width: 250px;
      }

      &:hover {
        box-shadow: $base-shadow;
        transition: all 0.3s ease-in-out 0s;

        .best-products-items-price {
          font-weight: 600;
          background-color: $primary-color;
          color: white;
          transition: all 0.3s ease-in-out 0s;
        }
      }
    }
  }
}
</style>
