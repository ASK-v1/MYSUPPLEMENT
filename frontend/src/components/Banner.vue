<script setup>
const items = [
  require('../assets/images/carousel-1.jpg'),
  require('../assets/images/carousel-2.jpg')
]
</script>

<template>
  <div class="banner">
    <el-carousel class="carousel" height="600px" :autoplay="false">
      <el-carousel-item v-for="item in items" :key="item">
        <img class="images" :src="item" />
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
