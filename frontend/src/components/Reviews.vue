<script lang="ts" setup>
import { ref, reactive } from 'vue'

const value = ref(4.2)
const state = reactive({
  dialogFormVisible: false,
  form: {
    nickname: '',
    reviewTitle: '',
    review: ''
  },
  formLabelWidth: '100px'
})
</script>

<template>
  <div class="reviews">
    <div class="reviews-title">
      <h1>RATINGS & REVIEWS</h1>
    </div>
    <div class="reviews-ratings">
      <div class="reviews-ratings-score">
        <div class="reviews-ratings-score-title">{{ value }}</div>
        <div class="reviews-ratings-score-star">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} points"
          ></el-rate>
        </div>
        <div class="reviews-ratings-score-number">3 Reviews</div>
      </div>
      <div @click="state.dialogFormVisible = true" class="reviews-ratings-button">
        <h3>WRITE A REVIEW</h3>
      </div>
    </div>
    <div class="reviews-write">
      <el-dialog
        destroy-on-close="true"
        v-model="state.dialogFormVisible"
        width="30%"
        center
        title="WRITE A REVIEW"
      >
        <el-form :model="state.form">
          <el-form-item label="Nickname" :label-width="state.formLabelWidth">
            <el-input v-model="state.form.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Review title" :label-width="state.formLabelWidth">
            <el-input v-model="state.form.reviewTitle" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Review" :label-width="state.formLabelWidth">
            <el-input
              v-model="state.form.review"
              type="textarea"
              maxlength="100"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item :label-width="state.formLabelWidth">
            <el-rate v-model="value" text-color="#ff9900" score-template="{value} points"></el-rate>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="state.dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="state.dialogFormVisible = false">Confirm</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div class="reviews-field">
      <div class="reviews-field-left">
        <div class="reviews-field-left-nickname">
          <h3>AHMET</h3>
        </div>
        <div class="reviews-field-left-rating">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} points"
          ></el-rate>
        </div>
        <div class="reviews-field-left-date">
          <h5>27.11.2021</h5>
        </div>
      </div>
      <div class="reviews-field-right">
        <div class="reviews-field-right-rt">My experience</div>
        <div
          class="reviews-field-right-r"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit itaque animi fugit eveniet! Officiis ducimus sint</div>
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
    margin-bottom: 50px;
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
      margin: 50px 0 200px 0;

      &:hover {
        background-color: $dark;
        transition: all 0.3s ease-in-out 0s;
        cursor: pointer;
      }
    }
  }
  &-field {
    border-bottom: 1px solid $secondary-color;
    border-top: 1px solid $secondary-color;
    padding: $base-padding;
    display: flex;
    flex-direction: row;
    gap: 100px;
    align-items: center;
    justify-content: center;
    margin: 0 10% 200px 10%;

    &-left,
    &-right {
      display: flex;
      flex-direction: column;
      gap: 10px;

      &-rt {
        font-weight: 600;
      }
    }
  }
}
</style>
