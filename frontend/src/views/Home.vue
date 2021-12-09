<script lang="ts" setup>
import Navbar from '../components/Navbar.vue'
import Content from '../components/Content.vue'
</script>

<template>
  <div class="home">
    <div class="home-navbar">
      <Navbar />
    </div>
    <div class="home-content">
      <Content />
    </div>
  </div>
</template>

<style lang="scss">
  .home-best {
    margin-top: 5%;
  }
</style>
