<template>
  <div class="content">
    <div class="content-list">
      <div class="top">
        <img src="../assets/images/top.png" />
        <h3>Top Rated and Reviewed</h3>
        <p></p>
      </div>
      <div class="authentic">
        <img src="../assets/images/auth.png" />
        <h3>100% Authentic Products</h3>
      </div>
      <div class="fast">
        <img src="../assets/images/ship.png" />
        <h3>Fast Delivery Service</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.content {
  background-color: $secondary-color;
  padding: 100px;

  .content-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 100px;
    font-weight: 600;
    color: $dark;
    font-size: $base-font-m;

    .top,
    .authentic,
    .fast {
      background-color: white;
      padding: 50px;
      border-radius: 20px;
      text-align: center;
    }
  }
}
</style>
