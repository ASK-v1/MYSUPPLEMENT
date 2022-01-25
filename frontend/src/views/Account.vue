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

const logout = () => {
  store.dispatch('logoutUser')
  router.push('/')
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
          <div v-for="items in store.getters.user.orderHistory.reverse()" :key="items" class="order-items">
            <div class="order-date">
              <h3>{{ items.date }}</h3>
            </div>
            <div v-for="order in items.order" :key="order">
              <div class="order-items-upper">
                <img class="order-items-upper-image" :src="order.img" width="100" height="100" />
                <div class="order-items-upper-mid">
                  <div class="order-items-upper-mid-brand">
                    <h4>{{ order.brand }}</h4>
                  </div>
                  <div class="order-items-upper-mid-name">{{ order.name }}</div>
                </div>
                <div class="order-items-upper-qty">
                  <h5>{{ order.qty }}</h5>
                </div>
              </div>
            </div>
            <div class="order-items-overview">
              <div class="order-items-overview-item">
                <h3>OVERVIEW</h3>
                <h4>{{ items.order.length }} ITEMS</h4>
              </div>
              <div class="order-items-overview-subtotal">
                <h5>SUBTOTAL</h5>
                <h5>${{ parseFloat(items.order[0].totalPrice).toFixed(2) }}</h5>
              </div>
              <div class="order-items-overview-delivery">
                <h5>DELIVERY COST</h5>
                <h5>$20</h5>
              </div>
              <div class="order-items-overview-ordertotal">
                <h3>ORDER TOTAL</h3>
                <h4>${{ (parseFloat(items.order[0].totalPrice) + 20).toFixed(2) }}</h4>
              </div>
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
    .order {
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

      &-date {
        background-color: $dark;
        padding: 5px;
        border-top-right-radius: $base-radius;
        border-top-left-radius: $base-radius;
        color: rgb(255, 255, 255);
        font-weight: bolder;
        font-family: "Lilita One", cursive;
      }

      &-items {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        gap: 40px;
        border-radius: $base-radius;
        inline-size: 500px;
        text-align: center;

        &-upper {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin: 0 10px 0 10px;

          &-mid {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;

            &-brand {
              color: rgb(0, 0, 0);
              font-family: "Lilita One", cursive;
              font-size: $base-font-s;
            }
          }

          &-qty {
            background-color: black;
            color: white;
            padding: 7px;
            height: 27px;
            width: 27px;
            font-weight: 600;
            border-radius: 27px;
            font-size: $base-font-l;
            margin-top: 10px;
          }
        }

        &-overview {
          padding: $base-padding;
          border-bottom-right-radius: $base-radius;
          border-bottom-left-radius: $base-radius;
          background-color: $primary-color;
          color: white;
          font-weight: bolder;
          display: flex;
          flex-direction: column;
          gap: 15px;

          & > * {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 60px;
          }
        }
      }
    }

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
