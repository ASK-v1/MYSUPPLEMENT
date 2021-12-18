<script lang="ts" setup>
import Navbar from '../components/Navbar.vue'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

<template>
  <div class="signin-navbar">
    <Navbar />
  </div>
  <div class="signin">
    <div class="signin-title">
      <h1>SIGN IN</h1>
    </div>
    <div class="signin-main">
      <form class="signin-form" action="submit">
        <div class="signin-email">
          <label for="email">Email:</label>
          <el-input v-model="email" required />
        </div>
        <div class="signin-password">
          <label for="password">Password:</label>
          <el-input v-model="password" show-password required />
        </div>
        <button class="signin-button">SIGN IN</button>
      </form>
      <div class="not-registered">
        <p>Not registered?</p>
        <router-link to="/register">Create an account</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.signin {
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

  .signin-title {
    background-color: rgb(0, 0, 0);
    color: white;
    font-family: "Lilita One", cursive;
    font-size: $base-font-m;
    padding: $base-padding;
    margin-bottom: 50px;
  }

  .signin-main {
    box-shadow: $base-shadow;
    padding: 50px;
    background-color: white;

    .signin-form {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .signin-email,
      .signin-password {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .signin-button {
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

    .not-registered {
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
