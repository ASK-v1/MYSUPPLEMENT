<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<template>
  <div class="not-found-navbar">
    <Navbar />
  </div>
  <div class="not-found-body">
    <h1>404</h1>
    <h3>Not Found</h3>
  </div>
</template>

<style lang="scss">
.not-found-body {
  margin-top: 200px;
  margin-bottom: 200px;
  text-align: center;
  font-family: "Lilita One", cursive;

  h1 {
    font-size: 200px;
    background: linear-gradient(
      66deg,
      #ff7171 3%,
      #c850c0 33%,
      #ffcc70 99%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h3 {
    margin-top: 50px;
    font-size: 50px;
  }
}
</style>
