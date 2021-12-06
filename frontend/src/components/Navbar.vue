<template>
  <div class="nav">
    <router-link to="/" class="logo"><h1>LOGO</h1></router-link>
    <router-link to="/" class="login"><h1>Login</h1></router-link>
  </div>
</template>

<style lang="scss">
.nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  .logo, .login {
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-weight: 500;
    font-size: 20px;
    text-decoration: none;

    &:hover {
      color: gray;
    }
  }
}
</style>
