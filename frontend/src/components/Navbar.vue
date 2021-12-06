<template>
  <div class="nav">
    <router-link to="/" class="logo"><h1>LOGO</h1></router-link>
  </div>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 50px;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $dark;
    font-weight: 500;
    font-size: 20px;
    text-decoration: none;

    &:hover {
      color: $secondary;
    }
  }
}
</style>
