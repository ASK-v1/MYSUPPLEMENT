<script setup>
import Navbar from '../components/Navbar.vue'
import { ref } from 'vue'
import store from '../store'
import router from '../router'

const email = ref('')
const password = ref('')

const showError = ref(false)

const login = async () => {
  const user = {
    email: email.value,
    password: password.value
  }
  try {
    await store.dispatch('loginUser', user)
    if (store.state.userData.email === 'admin@gmail.com') router.push('admin')
    else router.push('/')
  } catch (error) {
    showError.value = true
    console.log(error)
  }
}
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
      <el-alert class="error" v-if="this.showError" title="Incorrect email or password" type="error" effect="dark"> </el-alert>
      <form class="signin-form" @submit.prevent="login">
        <div class="signin-email">
          <label for="email">Email:</label>
          <el-input v-model="email" required />
        </div>
        <div class="signin-password">
          <label for="password">Password:</label>
          <el-input v-model="password" show-password required />
        </div>
        <button class="signin-button" type="submit">SIGN IN</button>
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

    .error {
      margin-bottom: 30px;
    }

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
