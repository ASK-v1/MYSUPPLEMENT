<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Addresses from '../components/Addresses.vue'
import { ref } from 'vue'
import store from '../store'
import router from '../router'

const active = ref(2)
const deliveryCost = 20
const showError = ref(false)
const loading = ref(false)

const selectAddress = async (address) => {
  loading.value = true
  const data = {
    userId: store.getters.user._id,
    selectId: address.id,
    len: store.getters.user.address.length
  }
  try {
    await store.dispatch('selectAddress', data)
    loading.value = false
  } catch (error) {
    console.log(error)
    loading.value = false
  }
}

const addressCheck = () => {
  if (store.getters.user.address.some(address => address.selected === true)) router.push('/payment')
  else showError.value = true
}
</script>

<template>
  <div class="address">
    <div class="address-navbar">
      <Navbar />
    </div>
    <div class="address-steps">
      <el-steps :active="active" simple style="margin-top: 50px" finish-status="success">
        <el-step title="CART"></el-step>
        <el-step title="ADDRESS"></el-step>
        <el-step title="PAYMENT"></el-step>
      </el-steps>
    </div>
    <div class="address-body">
      <div class="address-body-title">
        <h1>SHIPPING ADDRESS</h1>
      </div>
      <div class="address-body-items">
        <div class="address-body-items-left">
          <div class="address-body-items-left-title">
            <font-awesome-icon class="map-icon" :icon="['fa', 'map-marker-alt']" color="#5000b5" />
            <h3>Delivery Address</h3>
          </div>
          <el-alert
            class="error"
            v-if="showError"
            title="Please select address"
            type="error"
            effect="dark"
          ></el-alert>
          <div
            v-for="(address, index) in store.getters.user.address"
            v-bind:key="index"
            class="address-body-items-left-mid"
            @click="selectAddress(address)"
          >
            <el-alert
              v-if="store.getters.user.address[index].selected"
              title="Selected"
              type="success"
              center
              show-icon
            ></el-alert>
            <div class="address-body-items-left-mid-title">{{ address.addressTitle }}</div>
            <div class="address-body-items-left-mid-name">
              <h3>First Name:</h3>
              <h4>{{ address.firstName }}</h4>
            </div>
            <div class="address-body-items-left-mid-name">
              <h3>Last Name:</h3>
              <h4>{{ address.lastName.toUpperCase() }}</h4>
            </div>
            <div class="address-body-items-left-mid-phone">
              <h3>Phone:</h3>
              <h4>{{ address.phone }}</h4>
            </div>
            <div class="address-body-items-left-mid-address">
              <h3>Address:</h3>
              <h4>{{ address.address }}</h4>
            </div>
            <div class="address-body-items-left-mid-country">
              <h3>Country:</h3>
              <h4>{{ address.country }}</h4>
            </div>
          </div>
          <Addresses />
          <button @click="addressCheck" class="address-body-items-left-button">
            <h2>PROCEED TO PAYMENT</h2>
          </button>
        </div>
        <div class="address-body-items-right">
          <div class="address-body-items-right-summary">
            <div class="address-body-items-right-summary-title">
              <h2>ORDER SUMMARY</h2>
            </div>
            <div
              v-for="products in store.getters.cart"
              :key="products"
              class="address-body-items-right-summary-content"
            >
              <img
                class="address-body-items-right-summary-content-image"
                :src="products.product.img"
                width="100"
                height="100"
              />
              <div class="address-body-items-right-summary-content-mid">
                <div class="address-body-items-right-summary-content-mid-brand">
                  <h4>{{ products.product.brand }}</h4>
                </div>
                <div
                  class="address-body-items-right-summary-content-mid-name"
                >{{ products.product.name }}</div>
              </div>
              <div class="address-body-items-right-summary-content-mid-qty">
                <h5>{{ products.qty }}</h5>
              </div>
            </div>
            <div class="address-body-items-right-summary-overview">
              <div class="address-body-items-right-summary-overview-items">
                <h3>OVERVIEW</h3>
                <h4>{{ store.getters.cart.length }} ITEMS</h4>
              </div>
              <div class="address-body-items-right-summary-overview-subtotal">
                <h5>SUBTOTAL</h5>
                <h5>${{ store.getters.totalPrice }}</h5>
              </div>
              <div class="address-body-items-right-summary-overview-delivery">
                <h5>DELIVERY COST</h5>
                <h5>${{ deliveryCost }}</h5>
              </div>
              <div class="address-body-items-right-summary-overview-ordertotal">
                <h3>ORDER TOTAL</h3>
                <h4>${{ (parseFloat(store.getters.totalPrice) + 20).toFixed(2) }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="address-footer">
      <Footer />
    </div>
  </div>
  <div v-loading.fullscreen.lock="loading === true" />
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.address {
  &-steps {
    margin: 0 10% 0 10%;
  }

  &-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px 0px 300px 0px;

    &-title {
      background-color: rgb(0, 0, 0);
      color: white;
      font-family: "Lilita One", cursive;
      font-size: $base-font-m;
      padding: $base-padding;
      margin-bottom: 100px;
    }

    &-items {
      display: flex;
      align-items: flex-start;
      gap: 200px;

      &-left {
        display: flex;
        flex-direction: column;
        gap: 40px;

        &-title {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: flex-start;

          .map-icon {
            font-size: 25px;
          }
        }

        &-mid {
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
        }

        &-button {
          color: rgb(255, 255, 255);
          padding: $base-padding;
          font-size: $base-font-s;
          font-weight: bold;
          width: 530px;
          background-color: rgb(0, 0, 0);
          cursor: pointer;
          border: none;

          &:hover {
            background-color: $dark;
            transition: all 0.3s ease-in-out 0s;
          }
        }
      }

      &-right {
        &-summary {
          display: flex;
          flex-direction: column;

          &-title {
            margin-bottom: 25px;
          }

          &-overview {
            display: flex;
            flex-direction: column;
            gap: 30px;
            margin-top: 25px;

            &-items,
            &-ordertotal {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }

            &-subtotal,
            &-delivery {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              color: $dark;
            }
          }

          &-content {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 50px;
            padding: $base-padding;
            border-bottom: 1px solid $dark;

            &-mid {
              display: flex;
              flex-direction: column;
              gap: 10px;

              &-qty {
                background-color: black;
                color: white;
                padding: 7px;
                text-align: center;
                height: 27px;
                width: 27px;
                font-weight: 600;
                border-radius: 27px;
                font-size: $base-font-l;
              }

              &-name {
                inline-size: 250px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
