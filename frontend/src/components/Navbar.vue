<script lang="ts" setup>
import { ref } from 'vue'
const count = ref(0)
const search = ref('')
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
        <router-link to="/account" class="sign">Sign In/Register</router-link>
        <router-link to="/" class="account">
          <font-awesome-icon :icon="['fa', 'user']" size="lg" />
        </router-link>
        <div class="cart-icon">
          <router-link to="/" class="cart">
            <font-awesome-icon :icon="['fa', 'shopping-cart']" size="lg" />
          </router-link>
          <div class="cart-count">
            <p>{{ count }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar-buttons">
      <div class="buttons">
        <router-link to="/" class="nav-button">PROTEIN</router-link>
        <router-link to="/" class="nav-button">VITAMINS</router-link>
        <router-link to="/" class="nav-button">ENERGY</router-link>
        <router-link to="/" class="nav-button">CREATINE</router-link>
        <router-link to="/" class="nav-button">AMINO ACIDS</router-link>
        <router-link to="/" class="nav-button">MUSCLE BOOSTERS</router-link>
      </div>
    </div>
  </div>
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
</style>
