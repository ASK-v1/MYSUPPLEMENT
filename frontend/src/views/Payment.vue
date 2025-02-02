<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { ref } from 'vue'
import store from '../store'
import router from '../router'

const active = ref(3)
const cardNumber = ref('')
const NameOnCard = ref('')
const expiryDate = ref('')
const cvc = ref('')
const checked1 = ref('')
const date = new Date()
const loading = ref(false)
const showError = ref(false)

const placeOrder = async () => {
  loading.value = true
  try {
    await store.dispatch('getProduct')
    const data = {
      userId: store.getters.user._id,
      order: store.getters.cart.map((items) => ({
        id: items.product._id,
        brand: items.product.brand,
        name: items.product.name,
        img: items.product.img,
        total: items.product.qty,
        qty: items.qty,
        totalPrice: parseFloat((store.getters.totalPrice) + 20).toFixed(2)
      })),
      address: store.getters.user.address.filter(address => address.selected === true)[0],
      date: date.toLocaleDateString()
    }
    await store.dispatch('placeOrder', data)
    await store.dispatch('getProduct')
    loading.value = false
    router.push('/')
  } catch (error) {
    console.log(error)
    showError.value = true
    loading.value = false
  }
}
</script>

<template>
  <div class="payment">
    <div class="payment-navbar">
      <Navbar />
    </div>
    <div class="payment-steps">
      <el-steps :active="active" simple style="margin-top: 50px" finish-status="success">
        <el-step title="CART"></el-step>
        <el-step title="ADDRESS"></el-step>
        <el-step title="PAYMENT"></el-step>
      </el-steps>
    </div>
    <div class="payment-body">
      <div class="payment-body-title">
        <h1>SECURE PAYMENT</h1>
      </div>
      <div class="payment-body-items">
        <div class="payment-body-items-left">
          <div class="payment-body-items-left-title">
            <font-awesome-icon class="card-icon" :icon="['fa', 'credit-card']" color="#5000b5" />
            <h3>Credit Card</h3>
          </div>
          <el-alert class="error" v-if="showError" title="ERROR" type="error" effect="dark"></el-alert>
          <div class="payment-body-items-left-card">
            <form class="card-form" action="submit">
              <div class="card-form-number">
                <label for="number">Card number</label>
                <el-input v-model="cardNumber" required />
              </div>
              <div class="card-form-name">
                <label for="name">Name on card</label>
                <el-input v-model="NameOnCard" required />
              </div>
              <div class="card-form-date-cvc">
                <div class="card-form-date">
                  <label for="date">Expiry date</label>
                  <el-date-picker v-model="expiryDate" type="month" placeholder="Pick a month"></el-date-picker>
                </div>
                <div class="card-form-cvc">
                  <label for="cvc">CVC</label>
                  <el-input v-model="cvc" required />
                </div>
              </div>
            </form>
          </div>
          <el-checkbox class="payment-body-items-left-check" v-model="checked1">
            <h4>
              I have read and agree to the Terms and Conditions
              <br />& Privacy Policy of this online store.
            </h4>
          </el-checkbox>
          <button @click="placeOrder" class="payment-body-items-left-button">
            <h2>PLACE MY ORDER</h2>
          </button>
        </div>
        <div class="payment-body-items-right">
          <div class="payment-body-items-right-summary">
            <div class="payment-body-items-right-summary-title">
              <h2>ORDER SUMMARY</h2>
            </div>
            <div
              v-for="products in store.getters.cart"
              :key="products"
              class="payment-body-items-right-summary-content"
            >
              <img
                class="payment-body-items-right-summary-content-image"
                :src="products.product.img"
                width="100"
                height="100"
              />
              <div class="payment-body-items-right-summary-content-mid">
                <div class="payment-body-items-right-summary-content-mid-brand">
                  <h4>{{ products.product.brand }}</h4>
                </div>
                <div
                  class="payment-body-items-right-summary-content-mid-name"
                >{{ products.product.name }}</div>
              </div>
              <div class="payment-body-items-right-summary-content-mid-qty">
                <h5>{{ products.qty }}</h5>
              </div>
            </div>
            <div class="payment-body-items-right-summary-overview">
              <div class="payment-body-items-right-summary-overview-items">
                <h3>OVERVIEW</h3>
                <h4>{{ store.getters.cart.length }} ITEMS</h4>
              </div>
              <div class="payment-body-items-right-summary-overview-subtotal">
                <h5>SUBTOTAL</h5>
                <h5>${{ store.getters.totalPrice }}</h5>
              </div>
              <div class="payment-body-items-right-summary-overview-delivery">
                <h5>DELIVERY COST</h5>
                <h5>$20</h5>
              </div>
              <div class="payment-body-items-right-summary-overview-ordertotal">
                <h3>ORDER TOTAL</h3>
                <h4>${{ (parseFloat(store.getters.totalPrice) + 20).toFixed(2) }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="payment-footer">
      <Footer />
    </div>
  </div>
  <div v-loading.fullscreen.lock="loading === true" />
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.payment {
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
      gap: 233px;

      &-left {
        display: flex;
        flex-direction: column;
        gap: 60px;

        &-title {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: flex-start;

          .card-icon {
            font-size: 25px;
          }
        }

        &-card {
          .card-form {
            display: flex;
            flex-direction: column;
            gap: 30px;

            &-number {
              display: flex;
              flex-direction: column;
              gap: 10px;
            }

            &-name {
              display: flex;
              flex-direction: column;
              gap: 10px;
            }

            &-date-cvc {
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 100px;

              .card-form-date {
                display: flex;
                flex-direction: column;
                gap: 10px;
              }

              .card-form-cvc {
                display: flex;
                flex-direction: column;
                gap: 10px;
              }
            }
          }
        }

        &-check {
          display: flex;
          text-align: center;
          justify-content: center;
          align-items: center;

          h4 {
            color: $dark;
          }
        }

        &-button {
          color: rgb(255, 255, 255);
          padding: $base-padding;
          font-size: $base-font-s;
          font-weight: bold;
          width: 500px;
          background-color: rgb(0, 0, 0);
          border: 1px solid black;
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
            gap: 50px;
            justify-content: space-between;
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
