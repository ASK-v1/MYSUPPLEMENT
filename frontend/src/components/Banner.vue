<script setup>
import store from '../store'
const items = [
  require('../assets/images/carousel-1.jpg'),
  require('../assets/images/carousel-2.jpg')
]
const two = ['protein', 'vitamin']

const getProduct = async (param) => {
  const data = {
    category: param
  }
  try {
    await store.dispatch('getCategory', data)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="banner">
    <el-carousel class="carousel" height="600px" :autoplay="false">
      <el-carousel-item v-for="(item, index) in items" :key="index">
        <router-link @click="getProduct(two[index])" :to="`/products/${two[index]}`">
          <img class="images" :src="item" />
        </router-link>
      </el-carousel-item>
      <p>www.freepik.com</p>
    </el-carousel>
  </div>
</template>

<style lang="scss">
.banner {
  .carousel {
    text-align: center;
    .images {
      height: 600px;
      &:hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }
  }
}
</style>
