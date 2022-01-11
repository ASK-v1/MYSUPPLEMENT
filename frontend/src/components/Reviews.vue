<script setup>
import { reactive, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import store from '../store'
import router from '../router'

const date = new Date()
const route = useRoute()

const review = reactive({
  dialogFormVisible: false,
  form: {
    nickname: '',
    title: '',
    review: '',
    date: date.toLocaleDateString(),
    rating: ''
  },
  formLabelWidth: '100px'
})

const addReview = async () => {
  const data = {
    productId: route.params.productId,
    reviews: review.form
  }
  try {
    await store.dispatch('addReview', data)
    router.go()
    review.dialogFormVisible = false
  } catch (error) {
    console.log(error)
  }
}

const reviews = computed(() => {
  return store.getters.products.filter((review) => review._id === route.params.productId)[0].review
})

const sum = ref(0)
reviews.value.forEach((review) => { sum.value += review.rating })
sum.value = (sum.value /= reviews.value.length).toFixed(1)
</script>

<template>
  <div class="reviews">
    <div class="reviews-title">
      <h1>RATINGS & REVIEWS</h1>
    </div>
    <div class="reviews-ratings">
      <div class="reviews-ratings-score">
        <div v-if="!isNaN(sum)" class="reviews-ratings-score-title">{{ sum }}</div>
        <div v-else class="reviews-ratings-score-title">0</div>
        <div class="reviews-ratings-score-star">
          <el-rate
            v-if="!isNaN(sum)"
            v-model="sum"
            disabled
            show-score
            text-color="#ff9900"
          ></el-rate>
        </div>
        <div class="reviews-ratings-score-number">{{ reviews.length }} Reviews</div>
      </div>
      <div @click="review.dialogFormVisible = true" class="reviews-ratings-button">
        <h3>WRITE A REVIEW</h3>
      </div>
    </div>
    <div class="reviews-write">
      <el-dialog
        destroy-on-close="true"
        v-model="review.dialogFormVisible"
        width="30%"
        center
        title="WRITE A REVIEW"
      >
        <el-form :model="review.form">
          <el-form-item label="Nickname" :label-width="review.formLabelWidth">
            <el-input v-model="review.form.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Review title" :label-width="review.formLabelWidth">
            <el-input v-model="review.form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Review" :label-width="review.formLabelWidth">
            <el-input
              v-model="review.form.review"
              type="textarea"
              maxlength="100"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item :label-width="review.formLabelWidth">
            <el-rate v-model="review.form.rating" text-color="#ff9900"></el-rate>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="review.dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="addReview">Confirm</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div v-for="review in reviews" :key="review" class="reviews-field">
      <div class="reviews-field-left">
        <div class="reviews-field-left-nickname">
          <h3>{{ review.nickname }}</h3>
        </div>
        <div class="reviews-field-left-rating">
          <el-rate
            v-model="review.rating"
            disabled
            show-score
            text-color="#ff9900"
          ></el-rate>
        </div>
        <div class="reviews-field-left-date">
          <h5>{{ review.date }}</h5>
        </div>
      </div>
      <div class="reviews-field-right">
        <div class="reviews-field-right-title">{{ review.title }}</div>
        <div class="reviews-field-right-review">{{ review.review }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.reviews {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-title {
    background-color: rgb(0, 0, 0);
    color: white;
    font-family: "Lilita One", cursive;
    font-size: $base-font-m;
    padding: $base-padding;
    margin-bottom: 100px;
  }

  &-ratings {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 200px;

    &-score {
      display: flex;
      flex-direction: column;
      gap: 20px;

      &-title {
        font-size: $base-font-xxxl;
        font-weight: 600;
      }

      &-number {
        font-weight: 600;
      }
    }
    &-button {
      color: rgb(255, 255, 255);
      padding: $base-padding;
      font-size: $base-font-s;
      font-weight: bold;
      background-color: rgb(0, 0, 0);
      text-align: center;
      box-shadow: $base-shadow;
      width: 200px;
      margin: 50px 0 100px 0;

      &:hover {
        background-color: $dark;
        transition: all 0.3s ease-in-out 0s;
        cursor: pointer;
      }
    }
  }
  &-field {
    border-bottom: 1px solid $secondary-color;
    padding: $base-padding;
    display: flex;
    flex-direction: row;
    gap: 100px;
    align-items: center;

    &-left,
    &-right {
      display: flex;
      flex-direction: column;
      gap: 10px;

      &-title {
        font-weight: 600;
      }

      &-review {
        inline-size: 800px;
      }
    }
  }
}
</style>
