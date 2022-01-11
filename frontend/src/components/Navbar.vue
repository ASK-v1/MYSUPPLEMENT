<script setup>
import { ref } from 'vue'
import store from '../store'

const search = ref('')
const cd = ref(false)
const isLogin = ref(store.getters.isLoggedIn)

const deleteCart = (products) => {
  store.dispatch('deleteCart', products)
}
</script>

<template>
  <div class="navbar">
    <div class="upper">
      <router-link to="/" class="logo">
        <img src="../assets/images/logo.png" />
      </router-link>
      <div class="search">
        <el-autocomplete
          class="search-input"
          v-model="search"
          placeholder="Search for Product"
          :trigger-on-focus="false"
          size="large"
        />
        <div class="search-icon">
          <router-link to="/" class="search-buttton"></router-link>
          <font-awesome-icon :icon="['fa', 'search']" size="lg" />
        </div>
      </div>
      <div class="account-cart">
        <h4 v-if="isLogin" class="sign-welcome">Welcome {{ store.getters.user.firstName }}</h4>
        <router-link v-else to="/signin" class="sign">Sign In/Register</router-link>
        <router-link to="/account" class="account">
          <font-awesome-icon :icon="['fa', 'user']" size="lg" />
        </router-link>
        <div class="cart-icon">
          <a @click="cd = true" class="cart">
            <font-awesome-icon :icon="['fa', 'shopping-cart']" size="lg" />
          </a>
          <div @click="cd = true" class="cart-count">
            <p>{{ store.getters.cart.length }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar-buttons">
      <div class="buttons">
        <router-link to="/products" class="nav-button">PROTEIN</router-link>
        <router-link to="/products" class="nav-button">VITAMINS</router-link>
        <router-link to="/products" class="nav-button">ENERGY</router-link>
        <router-link to="/products" class="nav-button">CREATINE</router-link>
        <router-link to="/products" class="nav-button">AMINO ACIDS</router-link>
        <router-link to="/products" class="nav-button">MUSCLE BOOSTERS</router-link>
      </div>
    </div>
  </div>
  <el-drawer
    size="20%"
    lock-scroll="false"
    show-close="false"
    v-model="cd"
  >
    <div class="cart-drawer-body">
      <div class="cart-drawer-title-close">
        <div class="cart-drawer-title">
          <h1>YOUR ORDER</h1>
        </div>
        <div class="cart-drawer-close" @click="cd = !cd">x</div>
      </div>
      <div v-if="store.getters.cart.length === 0" class="cart-drawer-no-items">THERE ARE NO ITEMS IN YOUR CART</div>
      <div v-for="products in store.getters.cart" :key="products" class="cart-drawer-products">
        <img :src="products.product.img" width="80" height="80" />
        <div class="cart-drawer-products-brand-price-name-qty">
          <div class="cart-drawer-products-brand">{{ products.product.brand }}</div>
          <div class="cart-drawer-products-info">{{ products.product.name }}</div>
          <div class="cart-drawer-products-price">${{ products.product.price }}</div>
          <el-input-number v-model="products.qty" :min="1" :max="products.product.qty" size="mini" />
        </div>
        <font-awesome-icon
          @click="deleteCart(products)"
          class="cart-drawer-products-delete"
          :icon="['fa', 'trash-alt']"
          color="#5000b5"
        />
      </div>
      <div class="cart-drawer-lower">
        <div class="subtotal">
          <div class="subtotal-title">
            <h2>SUBTOTAL</h2>
          </div>
          <div class="subtotal-price">
            <h3>${{ store.getters.totalPrice }}</h3>
          </div>
        </div>
        <div class="view-button">
          <router-link class="view-button-cart" to="/cart">
            <h2>VIEW CART</h2>
          </router-link>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.navbar {
  display: flex;
  flex-direction: column;

  .upper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: black;
    color: white;

    .logo {
      text-decoration: none;
      color: white;
      font-family: "Lilita One", cursive;
      padding: $base-padding;
      font-size: $base-font-xl;

      img {
        width: 200px;
      }
    }
    .search {
      display: inline-flex;
      justify-content: flex-end;
      align-items: center;

      .search-input {
        width: 500px;
      }

      .search-icon {
        position: absolute;
        display: flex;
        color: black;
        padding: 10px;
        cursor: pointer;
      }
    }

    .account-cart {
      display: flex;
      flex-direction: row;
      gap: 40px;
      margin-right: 50px;

      .sign {
        text-decoration: none;
        color: white;

        &:hover {
          color: $primary-color;
        }
      }

      .account {
        color: white;
      }

      .cart-icon {
        display: flex;
        justify-content: flex-end;

        .cart {
          color: white;
          cursor: pointer;
        }

        .cart-count {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: $primary-color;
          color: white;
          font-weight: 600;
          border-radius: $base-radius;
          width: 22px;
          margin: -16px;
          cursor: pointer;
        }
      }
    }
  }

  .navbar-buttons {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #cccccc;

    .buttons {
      display: flex;
      flex-direction: row;

      .nav-button {
        color: black;
        text-decoration: none;
        font-size: $base-font-s;
        padding: $base-padding;
        font-weight: 600;

        &:hover {
          background-color: $primary-color;
          color: white;
          padding: $base-padding;
          cursor: pointer;
          transition: all 0.3s ease-in-out 0s;
        }
      }
    }
  }
}
.cart-drawer {
  &-body {
    position: fixed;
    top: 0;
    height: 100%;
    width: 20%;
    background-color: white;
    z-index: 1;

    .cart-drawer-title-close {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 25px;

      .cart-drawer-title {
        background-color: black;
        padding: $base-padding;
        color: white;
        margin-left: 10px;
        font-size: $base-font-m;
        font-family: "Lilita One", cursive;
      }

      .cart-drawer-close {
        font-size: 25px;
        border-radius: 25px;
        background-color: black;
        height: 39px;
        width: 39px;
        text-align: center;
        color: white;
        font-weight: bolder;
        cursor: pointer;
        margin-right: 10px;

        &:hover {
          padding: 2px;
          margin-right: 8px;
          background-color: $dark;
          transition: all 0.2s ease-in-out 0s;
        }
      }
    }

    .cart-drawer-no-items {
      text-align: center;
      color: $dark;
      margin-top: 100px;
      padding: $base-padding;
      font-weight: 600;
      font-size: $base-font-l;
    }

    .cart-drawer-lower {
      display: inline-flex;
      flex-direction: column;
      background-color: $primary-color;
      width: 100%;
      height: 150px;
      padding: 30px 0 30px 0;
      bottom: 0;
      gap: 50px;
      position: absolute;
      z-index: 1;

      .subtotal {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-weight: 600;
        font-size: $base-font-m;
        font-family: "Lilita One", cursive;
        margin: 0 20px 0 20px;
      }

      .view-button {
        display: flex;
        justify-content: center;

        &-cart {
          color: rgb(0, 0, 0);
          padding: $base-padding;
          font-size: $base-font-s;
          box-shadow: $base-shadow;
          font-weight: bold;
          border: 1px solid black;
          width: 150px;
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

    .cart-drawer-products {
      margin-top: 10px;
      display: flex;
      padding: 20px 0 20px 0;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 1px solid rgb(200, 200, 200);

      &-brand-price-name-qty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;

        .cart-drawer-products-brand,
        .cart-drawer-products-price {
          font-weight: 600;
        }
      }

      &-delete {
        text-align: center;
        margin-right: 20px;
        font-size: 20px;
        cursor: pointer;
        margin-top: 20px;

        &:hover {
          color: $primary-color-dark;
        }
      }
    }
  }
}
</style>
