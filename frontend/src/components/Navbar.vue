<template>
  <div class="navbar">
    <router-link to="/" class="logo"><img src="../assets/images/logo.png"></router-link>
    <div class="account-cart">
      <router-link to="/" class="sign">Sign In/Register</router-link>
      <font-awesome-icon class="account" :icon="['fa', 'user']" size="lg" />
      <font-awesome-icon class="cart" :icon="['fa', 'shopping-cart']" size="lg" />
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  color: white;

  .logo {
    margin-left: 40px;
  }
  .account-cart {
    display: flex;
    flex-direction: row;
    gap: 40px;
    margin-right: 100px;

    .sign {
      text-decoration: none;
      color: white;

      &:hover {
        color: $primary;
      }
    }
  }
}
</style>
