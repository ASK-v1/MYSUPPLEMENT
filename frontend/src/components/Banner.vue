<template>
  <div class="banner">
    <div class="banner-left">
      <div class="titles">
        <h1>BEST CHOICE</h1>
        <h1>DISCOVER MORE</h1>
      </div>
      <div class="shop-now">
        <router-link to="/" class="shop-now-button">SHOP NOW</router-link>
      </div>
    </div>
    <div class="banner-right">
      <img src="../assets/images/ghost-2.png" width="400">
      <img src="../assets/images/ghost-1.png" width="400">
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

  .banner {
    display: flex;
    justify-content: space-evenly;
    background-color: $secondary-color;
    height: 600px;
    background: url(../assets/images/back.png);

    &:hover {
      .banner-right {
        img {
         width: 500px;
         transition: all 0.5s ease-in-out 0s;
        }
      }
      .banner-left {
        margin-left: 100px;
        transition: all 0.5s ease-in-out 0s;
      }
    }

    .banner-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 50px;
      text-align: center;

      .titles {
        display: flex;
        align-items: center;
        flex-direction: column;
        color: white;
        gap: 20px;
        padding: $base-padding;
        font-family: 'Lilita One', cursive;

        & > * {
          background-color: black;
          padding: $base-padding;
          font-size: $base-font-xxxl;
        }
      }

      .shop-now {
        display: flex;
        justify-content: center;
        background-color: $primary-color;
        color: white;
        font-weight: 600;

        .shop-now-button {
          color: white;
          text-decoration: none;
          padding: 20px;
          font-size: $base-font-m;
          box-shadow: $base-shadow;

          &:hover {
            background-color: $primary-color-dark;
            transition: all 0.3s ease-in-out 0s;
          }
        }
      }
    }
    .banner-right {
      display: inline-flex;
      align-items: center;
    }
  }
</style>
