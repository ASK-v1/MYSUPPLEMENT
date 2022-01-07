<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Reviews from '@/components/Reviews.vue'
import { ref } from 'vue'

window.scrollTo(0, 0)

const rating = ref(3.7)
const qty = ref(1)
const size = ref(30)
const value = ref('')
const options = ref([
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  }
])

</script>

<template>
  <div class="product">
    <div class="product-navbar">
      <Navbar />
    </div>
    <div class="product-body">
      <div class="product-body-image">
        <img :src="product.image" width="320" height="320" />
      </div>
      <div class="product-body-items">
        <div class="product-body-items-title">
          <h2>{{ product.title }}</h2>
        </div>
        <div class="products-body-items-rating">
          <el-rate
            v-model="rating"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} points"
          ></el-rate>
        </div>
        <div
          class="product-body-items-info"
        >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat dolor repellendus mollitia aut sit accusamus quam voluptate molestias sint natus. Accusamus fugit, dignissimos dicta modi minus harum vel blanditiis totam.</div>
      </div>
    </div>
    <div class="product-bar">
      <div class="product-bar-price">${{ product.price }}</div>
      <div class="product-bar-size">{{ size }} Servings</div>
      <div class="product-bar-flavor">
        <h4>Flavor</h4>
        <el-select v-model="value" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="product-bar-qty">
        <h4>Quantity</h4>
        <el-input-number v-model="qty" :min="1" :max="10" size="large" />
      </div>
      <div class="product-bar-button">
        <h2>ADD TO CART</h2>
      </div>
    </div>
    <div class="product-reviews">
      <Reviews></Reviews>
    </div>
    <div class="product-footer">
      <Footer />
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.product {
  display: flex;
  flex-direction: column;

  &-body {
    margin: 50px 0 150px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;

    &-image {
      margin-left: 300px;
    }

    &-items {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 25px;
      margin: 0 300px 0 300px;
    }
  }

  &-bar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 50px;
    align-items: center;
    padding: 25px;
    padding-bottom: 50px;
    background-color: $primary-color;
    margin-bottom: 150px;

    &-price,
    &-size {
      padding: $base-padding;
      color: $dark;
      margin-top: 25px;
      background-color: rgb(255, 255, 255);
      border-radius: 10px;
      border: 5px solid $dark;
      font-family: "Lilita One", cursive;
      font-size: $base-font-m;
    }

    &-flavor,
    &-qty {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      font-weight: 600;
      gap: 10px;
      font-family: "Lilita One", cursive;
      font-size: $base-font-m;
    }

    &-button {
      color: rgb(255, 255, 255);
      padding: 25px;
      font-size: $base-font-s;
      font-weight: bold;
      background-color: rgb(0, 0, 0);
      text-align: center;
      margin-top: 30px;
      box-shadow: $base-shadow;

      &:hover {
        background-color: $dark;
        transition: all 0.3s ease-in-out 0s;
        cursor: pointer;
      }
    }
  }
}
</style>
