<template>
  <div class="footer">
    <div class="social">
      <img src="../assets/images/twitter.png" height="50px">
      <img src="../assets/images/instagram.png" height="50px">
      <img src="../assets/images/facebook.png" height="50px">
      <img src="../assets/images/youtube.png" height="50px">
    </div>
    <div class="text">
      <p>© 2021 MYSUPPLEMENT All rights reserved.</p>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.footer {
  background-image: linear-gradient(66deg, #ff7171 3%, #C850C0 33%, #FFCC70 99%);
  padding: 50px;
  gap: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .social {
    display: inline-flex;
    gap: 30px;
    color: white;

    & > * {
      border: 2px solid white;
      border-radius: 30px;
    }

    & > *:hover {
      cursor: pointer;
    }
  }

  .text {
    color: white;
    text-align: center;
    font-weight: 600;
  }
}
</style>
