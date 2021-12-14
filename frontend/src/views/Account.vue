<script lang="ts" setup>
import Navbar from '../components/Navbar.vue'
import Signin from '../components/Signin.vue'
import Register from '../components/Register.vue'

import { onMounted, ref } from 'vue'

const register = ref(true)

const onYourEvent = ref(false)

onMounted(() => {
  if (onYourEvent.value) console.log('TRUE')
  else console.log('FALSE')
})

</script>

<template>
  <div class="home">
    <div class="home-navbar">
      <Navbar />
    </div>
    <div class="home-signin">
      <Signin />
    </div>
    <div v-if="register" class="home-register">
      <Register @sign="onYourEvent" />
    </div>
  </div>
</template>

<style lang="scss">
</style>
