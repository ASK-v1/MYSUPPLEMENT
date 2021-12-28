<script lang="ts" setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { product } from '../cart'
import { ref } from 'vue'

const qty = ref(1)
const active = ref(1)
</script>

<template>
  <div class="cart">
    <div class="cart-navbar">
      <Navbar />
    </div>
    <div class="cart-steps">
      <el-steps :active="active" simple style="margin-top: 50px" finish-status="success">
        <el-step title="CART"></el-step>
        <el-step title="ADDRESS"></el-step>
        <el-step title="PAYMENT"></el-step>
      </el-steps>
    </div>
    <div class="cart-body">
      <div class="cart-body-title">
        <h1>SHOPPING CART</h1>
      </div>
      <div class="cart-body-items">
        <div class="cart-body-items-left">
          <div class="cart-body-items-left-image">
            <img :src="product.image" width="160" height="160" />
          </div>
          <div class="cart-body-items-left-title-info">
            <div class="cart-body-items-left-title">
              <h3>{{ product.title }}</h3>
            </div>
            <div class="cart-body-items-left-info">{{ product.info }}</div>
          </div>
          <div class="cart-body-items-left-qty">
            <el-input-number v-model="qty" :min="1" :max="10" size="large" />
          </div>
          <div class="cart-body-items-left-total">
            <h3>${{ product.price }}</h3>
          </div>
          <font-awesome-icon
            class="cart-body-items-left-delete"
            :icon="['fa', 'trash-alt']"
            color="#5000b5"
          />
        </div>
        <div class="cart-body-items-right">
          <div class="cart-body-items-right-overview">
            <h3>OVERVIEW</h3>
            <h4>1 ITEMS</h4>
          </div>
          <div class="cart-body-items-right-subtotal">
            <h5>SUBTOTAL</h5>
            <h5>$58.99</h5>
          </div>
          <div class="cart-body-items-right-delivery">
            <h5>DELIVERY COST</h5>
            <h5>$20</h5>
          </div>
          <div class="cart-body-items-right-ordertotal">
            <h3>ORDER TOTAL</h3>
            <h4>$78.99</h4>
          </div>
          <div class="cart-body-items-right-buttons">
            <router-link class="checkout" to="/address">
              <h2>PROCEED TO CHECKOUT</h2>
            </router-link>
            <router-link class="continue" to="/">
              <h2>CONTİNUE SHOPPING</h2>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-footer">
      <Footer />
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.cart {
  &-steps {
    margin: 0 10% 0 10%;
  }

  &-body {
    display: flex;
    flex-direction: column;
    margin: 50px 0px 300px 0px;
    align-items: center;

    &-title {
      background-color: rgb(0, 0, 0);
      color: white;
      font-family: "Lilita One", cursive;
      font-size: $base-font-m;
      padding: $base-padding;
      margin-bottom: 100px;
      align-items: center;
    }

    &-items {
      display: flex;
      gap: 222px;
      align-items: flex-start;

      &-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 30px;

        &-title-info {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        &-delete {
          font-size: 25px;
          cursor: pointer;
          &:hover {
            color: $primary-color-dark;
          }
        }
      }

      &-right {
        display: flex;
        flex-direction: column;
        gap: 30px;

        &-overview,
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

        &-buttons {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 30px;
          margin-top: 30px;

          .checkout {
            color: rgb(255, 255, 255);
            padding: $base-padding;
            font-size: $base-font-s;
            font-weight: bold;
            border: 1px solid black;
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

          .continue {
            color: rgb(0, 0, 0);
            padding: $base-padding;
            font-size: $base-font-s;
            border: 1px solid black;
            font-weight: bold;
            width: 250px;
            background-color: rgb(255, 255, 255);
            cursor: pointer;
            text-align: center;
            text-decoration: none;

            &:hover {
              background-color: rgb(200, 200, 200);
              transition: all 0.3s ease-in-out 0s;
            }
          }
        }
      }
    }
  }
}
</style>
