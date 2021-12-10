<script lang="ts" setup>
import Navbar from '../components/Navbar.vue'
import Banner from '../components/Banner.vue'
import Best from '../components/Best.vue'
import Content from '../components/Content.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <div class="home">
    <div class="home-navbar">
      <Navbar />
    </div>
    <div class="home-content">
      <Banner />
    </div>
    <div class="home-best">
      <Best />
    </div>
    <div class="home-content">
      <Content />
    </div>
    <div class="home-footer">
      <Footer />
    </div>
  </div>
</template>

<style lang="scss">
  .home-best {
    margin-top: 5%;
  }
</style>
