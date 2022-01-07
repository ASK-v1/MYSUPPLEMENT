<script setup>
import Navbar from '../components/Navbar.vue'
import Addresses from '../components/Addresses.vue'
import store from '../store'
import router from '../router'
import { ref } from 'vue'

const addressData = store.getters.user.address

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

const logout = async () => {
  try {
    await store.dispatch('logoutUser')
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}

const deleteAddress = async (param) => {
  const data = {
    userId: store.state.userData._id,
    addr: param.id
  }

  try {
    await store.dispatch('deleteAddress', data)
    router.go()
  } catch (error) {
    console.log(error)
  }
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
        <button @click="logout">LOGOUT</button>
      </div>
      <div class="order-addresses">
        <div v-if="order" class="order">
          <h3>You don't have any orders yet!</h3>
        </div>
        <div v-if="addresses" class="addresses">
          <div v-for="address in addressData" v-bind:key="address" class="addresses-items">
            <div class="addresses-items-title">{{ address.addressTitle }}</div>
            <div class="addresses-items-name">{{ address.firstName }}</div>
            <div class="addresses-items-name">{{ address.lastName.toUpperCase() }}</div>
            <div class="addresses-items-address">{{ address.address }}</div>
            <div class="addresses-items-country">{{ address.country }}</div>
            <font-awesome-icon @click="deleteAddress(address)" class="trash-icon" :icon="['fa', 'trash-alt']" color="#5000b5" />
          </div>
          <h3 v-if="!store.getters.user.address[0]">You have no saved addresses.</h3>
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
      width: 200px;

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

      &-items {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        border: 1px solid $dark;
        border-radius: $base-radius;
        padding: $base-padding;

        &-title {
          background-color: rgb(0, 0, 0);
          color: white;
          font-family: "Lilita One", cursive;
          font-size: $base-font-m;
          padding: 7px;
        }

        .trash-icon {
          font-size: 25px;
          cursor: pointer;
          margin-top: 20px;

          &:hover {
            color: $primary-color-dark;
          }
        }
      }
    }
  }
}
</style>
