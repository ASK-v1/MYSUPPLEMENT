<script setup>
import Navbar from '../components/Navbar.vue'
import Addresses from '../components/Addresses.vue'
import store from '../store'
import router from '../router'
import { ref } from 'vue'

const order = ref(false)
const addresses = ref(true)

const switchOrderAddress = () => {
  order.value = !order.value
  addresses.value = !addresses.value
}

const logout = async () => {
  try {
    await store.dispatch('logoutUser')
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}

const deleteAddress = async (address) => {
  const data = {
    userId: store.getters.user._id,
    addr: address.id
  }
  try {
    await store.dispatch('deleteAddress', data)
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
        <button v-if="!addresses" @click="switchOrderAddress">ADDRESSES</button>
        <button v-if="order" class="order-active">ORDER HISTORY</button>
        <button v-if="!order" @click="switchOrderAddress">ORDER HISTORY</button>
        <button @click="logout">LOGOUT</button>
      </div>
      <div class="order-addresses">
        <div v-if="order" class="order">
          <h3 v-if="!store.getters.user">You don't have any orders yet!</h3>
          <div v-for="order in store.user" :key="order" class="order-items">
            <img class="order-items-image" :src="order.img" width="100" height="100" />
            <div class="order-items-mid">
              <div class="order-items-image-mid-brand">
                <h4>{{ products.product.brand }}</h4>
              </div>
              <div class="order-items-mid-name">{{ products.product.name }}</div>
              <div class="order-items-qty">
                <h5>Qty: {{ products.qty }}</h5>
              </div>
            </div>
          </div>
          <div class="order-items-overview">
            <div class="order-items-overview-item">
              <h3>OVERVIEW</h3>
              <h4>{{ store.getters.cart.length }} ITEMS</h4>
            </div>
            <div class="order-items-overview-subtotal">
              <h5>SUBTOTAL</h5>
              <h5>${{ store.getters.totalPrice }}</h5>
            </div>
            <div class="order-items-overview-delivery">
              <h5>DELIVERY COST</h5>
              <h5>$20</h5>
            </div>
            <div class="order-items-overview-ordertotal">
              <h3>ORDER TOTAL</h3>
              <h4>${{ (parseFloat(store.getters.totalPrice) + 20).toFixed(2) }}</h4>
            </div>
          </div>
        </div>
        <div v-if="addresses" class="addresses">
          <Addresses></Addresses>
          <h3 v-if="!store.getters.user.address[0]">You have no saved addresses.</h3>
          <div
            v-for="(address, index) in store.getters.user.address"
            v-bind:key="index"
            class="addresses-items"
          >
            <el-alert
              v-if="store.getters.user.address[index].selected"
              title="Selected"
              type="success"
              center
              show-icon
            ></el-alert>
            <div class="addresses-items-title">{{ address.addressTitle }}</div>
            <div class="addresses-items-name">
              <h3>First Name:</h3>
              <h4>{{ address.firstName }}</h4>
            </div>
            <div class="addresses-items-name">
              <h3>Last Name:</h3>
              <h4>{{ address.lastName.toUpperCase() }}</h4>
            </div>
            <div class="addresses-items-phone">
              <h3>Phone:</h3>
              <h4>{{ address.phone }}</h4>
            </div>
            <div class="addresses-items-address">
              <h3>Address:</h3>
              <h4>{{ address.address }}</h4>
            </div>
            <div class="addresses-items-country">
              <h3>Country:</h3>
              <h4>{{ address.country }}</h4>
            </div>
            <font-awesome-icon
              @click="deleteAddress(address)"
              class="trash-icon"
              :icon="['fa', 'trash-alt']"
              color="#5000b5"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-loading.fullscreen.lock="store.getters.status === 'loading'" />
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
      width: 800px;
      background-color: white;
      margin-top: 60px;
      gap: 30px;
      border-radius: $base-radius;

      &-items {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: 1px solid $dark;
        border-radius: $base-radius;
        padding: $base-padding;
        inline-size: 500px;

        &-title {
          color: $primary-color;
          font-family: "Lilita One", cursive;
          font-size: $base-font-l;
          padding: 7px;
          margin-bottom: 10px;
          text-align: center;
        }

        &-name,
        &-phone,
        &-country,
        &-address {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
          color: $dark;

          h3 {
            color: black;
          }
        }

        .trash-icon {
          font-size: 25px;
          cursor: pointer;
          align-self: center;

          &:hover {
            color: $primary-color-dark;
          }
        }
      }
    }
  }
}
</style>
