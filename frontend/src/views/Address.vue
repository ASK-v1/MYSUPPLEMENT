<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Addresses from '../components/Addresses.vue'
import { ref } from 'vue'
import store from '../store'

store.state.step = 'address'
const addressData = store.getters.user.address

const active = ref(2)
const checked1 = ref('')
const qty = ref(1)

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
          <div v-for="address in addressData" v-bind:key="address" class="address-body-items-left-mid">
            <el-checkbox class="address-body-items-left-mid-check" v-model="checked1">{{ address.addressTitle }}</el-checkbox>
            <div class="address-body-items-left-name">{{ address.firstName }}</div>
            <div class="address-body-items-left-name">{{ address.lastName }}</div>
            <div class="address-body-items-left-phone">{{ address.phone }}</div>
            <div class="address-body-items-left-address">{{ address.address }}</div>
            <div class="address-body-items-left-country">{{ address.country }}</div>
            <font-awesome-icon class="trash-icon" :icon="['fa', 'trash-alt']" color="#5000b5" />
          </div>
          <Addresses />
          <router-link class="address-body-items-left-button" to="/payment">
            <h2>PROCEED TO PAYMENT</h2>
          </router-link>
        </div>
        <div class="address-body-items-right">
          <div class="address-body-items-right-summary">
            <div class="address-body-items-right-summary-title">
              <h2>ORDER SUMMARY</h2>
            </div>
            <div class="address-body-items-right-summary-content">
              <img
                class="address-body-items-right-summary-content-image"
                :src="product.image"
                width="80"
                height="80"
              />
              <div class="address-body-items-right-summary-content-mid">
                <div class="address-body-items-right-summary-content-mid-title">
                  <h4>{{ product.title }}</h4>
                </div>
                <div class="address-body-items-right-summary-content-mid-info">{{ product.info }}</div>
                <div class="address-body-items-right-summary-content-mid-qty">
                  <h5>Qty: {{ qty }}</h5>
                </div>
              </div>
              <div class="address-body-items-right-summary-content-price">
                <h4>${{ product.price }}</h4>
              </div>
            </div>
            <div class="address-body-items-right-summary-overview">
              <div class="address-body-items-right-summary-overview-items">
                <h3>OVERVIEW</h3>
                <h4>1 ITEMS</h4>
              </div>
              <div class="address-body-items-right-summary-overview-subtotal">
                <h5>SUBTOTAL</h5>
                <h5>$58.99</h5>
              </div>
              <div class="address-body-items-right-summary-overview-delivery">
                <h5>DELIVERY COST</h5>
                <h5>$20</h5>
              </div>
              <div class="address-body-items-right-summary-overview-ordertotal">
                <h3>ORDER TOTAL</h3>
                <h4>$78.99</h4>
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
        gap: 60px;

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
          align-items: center;
          gap: 10px;
          border: 1px solid $dark;
          border-radius: $base-radius;
          padding: $base-padding;

          &-check {
          margin-bottom: 20px;
          background-color: rgb(0, 0, 0);
          color: white;
          font-family: "Lilita One", cursive;
          font-size: $base-font-m;
          padding: 7px;

            h4 {
              color: rgb(255, 255, 255);
            }
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

        &-button {
          color: rgb(255, 255, 255);
          padding: $base-padding;
          font-size: $base-font-s;
          font-weight: bold;
          width: 250px;
          background-color: rgb(0, 0, 0);
          cursor: pointer;
          text-align: center;
          text-decoration: none;

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
          gap: 60px;

          &-overview {
            display: flex;
            flex-direction: column;
            gap: 30px;

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
            gap: 50px;
            padding: $base-padding;
            border-bottom: 1px solid $dark;
            border-top: 1px solid $dark;

            &-mid {
              display: flex;
              flex-direction: column;
              gap: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
