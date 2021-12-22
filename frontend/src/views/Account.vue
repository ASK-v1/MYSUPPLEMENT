<script lang="ts" setup>
import Navbar from '../components/Navbar.vue'
import Addresses from '../components/Addresses.vue'

import { ref } from 'vue'

const order = ref(false)
const addresses = ref(true)

const switchOrder = () => {
  order.value = true
  addresses.value = false
}
const switchAddresses = () => {
  addresses.value = true
  order.value = false
}

</script>

<template>
  <div class="account">
    <div class="account-navbar">
      <Navbar />
    </div>
    <div class="account-body">
      <div class="account-title">
        <h1>MY ACCOUNT</h1>
      </div>
      <div class="account-buttons">
        <button v-if="addresses" class="addresses-active">ADDRESSES</button>
        <button v-if="!addresses" @click="switchAddresses">ADDRESSES</button>
        <button v-if="order" class="order-active">ORDER HISTORY</button>
        <button v-if="!order" @click="switchOrder">ORDER HISTORY</button>
        <button>LOGOUT</button>
      </div>
      <div class="order-addresses">
        <div v-if="order" class="order">
          <p>You don't have any orders yet!</p>
        </div>
        <div v-if="addresses" class="addresses">
          <p>You have no saved addresses.</p>
          <Addresses></Addresses>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.account-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0 calc(50% - 500px) 0;
  background-image: linear-gradient(
    66deg,
    #ff7171 3%,
    #c850c0 33%,
    #ffcc70 99%
  );

  .account-title {
    background-color: rgb(0, 0, 0);
    color: white;
    font-family: "Lilita One", cursive;
    font-size: $base-font-m;
    padding: $base-padding;
    margin-bottom: 50px;
  }

  .account-buttons {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 20px;

    button {
      color: black;
      text-decoration: none;
      font-size: $base-font-s;
      padding: $base-padding;
      border-radius: 5px;
      border: none;
      font-weight: bold;

      &:hover {
        background-color: rgba(0, 0, 0);
        color: white;
        cursor: pointer;
        transition: all 0.3s ease-in-out 0s;
      }
    }
    .addresses-active,
    .order-active {
      color: white;
      background-color: black;
    }
  }
  .order-addresses {
    .order,
    .addresses {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 60px;
      width: 600px;
      background-color: white;
      margin-top: 60px;
      gap: 60px;
      border-radius: $base-radius;
      font-size: $base-font-m;
    }
  }
}
</style>
