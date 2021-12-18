<script lang="ts" setup>
import Navbar from '../components/Navbar.vue'
import { ref } from 'vue'

const firstName = ref('')
const lastName = ref('')
const password = ref('')
const email = ref('')
</script>

<template>
  <div class="register-navbar">
    <Navbar />
  </div>
  <div class="register">
    <div class="register-title">
      <h1>REGISTER</h1>
    </div>
    <div class="register-main">
      <form class="register-form" action="submit">
        <div class="register-firstname">
          <label for="firstname">First Name:</label>
          <el-input type="text" v-model="firstName" required />
        </div>
        <div class="register-lastname">
          <label for="lastname">Last Name:</label>
          <el-input type="text" v-model="lastName" required />
        </div>
        <div class="register-email">
          <label for="email">Email:</label>
          <el-input v-model="email" required />
        </div>
        <div class="register-password">
          <label for="password">Password:</label>
          <el-input v-model="password" show-password required />
        </div>
        <button class="register-button">REGISTER</button>
      </form>
      <div class="have-account">
        <p>Already have an account?</p>
        <router-link to="signin">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.register {
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

  .register-title {
    background-color: rgb(0, 0, 0);
    color: white;
    font-family: "Lilita One", cursive;
    font-size: $base-font-m;
    padding: $base-padding;
    margin-bottom: 50px;
  }

  .register-main {
    box-shadow: $base-shadow;
    padding: 50px;
    background-color: white;

    .register-form {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .register-email,
      .register-password,
      .register-lastname,
      .register-firstname {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .register-button {
        background-color: $primary-color;
        color: white;
        border: none;
        width: 400px;
        height: 50px;
        font-size: $base-font-m;
        font-weight: 600;
        margin-top: 20px;
        box-shadow: $base-shadow;

        &:hover {
          background-color: $primary-color-dark;
          transition: all 0.3s ease-in-out 0s;
          cursor: pointer;
        }
      }
    }
    .have-account {
      display: flex;
      flex-direction: row;
      gap: 10px;
      justify-content: flex-start;
      align-items: center;
      font-weight: 600;
      margin-top: 40px;

      button {
        border: none;
        text-decoration: underline;
        color: $primary-color;
        font-size: $base-font-m;
        cursor: pointer;
        background-color: white;
      }
    }
  }
}
</style>
