<template>
  <div class="navbar">
    <router-link to="/" class="logo"><img src="../assets/images/logo.png"></router-link>
    <div class="search">
      <el-autocomplete
        class="search-input"
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="Search for Product"
        :trigger-on-focus="false"
        @select="handleSelect"
        size="medium"
      />
      <div class="search-icon">
        <router-link to="/" class="search-buttton" ><font-awesome-icon :icon="['fa', 'search']" size="lg" /></router-link>
      </div>
    </div>
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

  .search {
    display: inline-flex;
    justify-content:flex-end;
    align-items: center;

    .search-input {
      width: 500px;
    }
    .search-icon {
      position: absolute;
      display: flex;
      color: $primary;
      padding: 10px;

      & > :hover {
        color: $secondary;
      }
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
        color: $primary;
      }
    }
  }
}
</style>
