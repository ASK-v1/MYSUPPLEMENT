<script lang="ts" setup>
import { ref } from 'vue'
const checkList = ref([])
</script>

<template>
  <div class="filters">
    <div class="filters-brands">
      <div class="filters-title">
        <h2>BRANDS</h2>
      </div>
      <el-checkbox-group class="filters-brands-group" v-model="checkList">
        <el-checkbox label="Animal" />
        <el-checkbox label="BSN" />
        <el-checkbox label="Cellucor" />
        <el-checkbox label="Dymatize" />
        <el-checkbox label="GHOST" />
        <el-checkbox label="JYM Supplement Science" />
        <el-checkbox label="MuscleTech" />
        <el-checkbox label="Optimum Nutrition" />
      </el-checkbox-group>
    </div>
    <div class="filters-price">
      <div class="filters-title">
        <h2>PRICE</h2>
      </div>
      <el-checkbox-group class="filters-price-group" v-model="checkList">
        <el-checkbox label="Less than $25" />
        <el-checkbox label="$25-50$" />
        <el-checkbox label="$50-100$" />
        <el-checkbox label="$100-150$" />
        <el-checkbox label="$150-200$" />
      </el-checkbox-group>
    </div>
    <div class="filters-form">
      <div class="filters-title">
        <h2>FORM</h2>
      </div>
      <el-checkbox-group class="filters-form-group" v-model="checkList">
        <el-checkbox label="Tablet" />
        <el-checkbox label="Softgel" />
        <el-checkbox label="Powder" />
        <el-checkbox label="Liquid" />
      </el-checkbox-group>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.filters {
  height: auto;
  left: 0;
  width: 200px;

  &-title {
    margin: 0px 0 25px 0;
    background-color: black;
    color: rgb(255, 255, 255);
    font-family: "Lilita One", cursive;
    font-size: $base-font-s;
    padding: $base-padding;
  }

  &-brands,
  &-price,
  &-form {
    display: flex;
    flex-direction: column;

    &-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin: 0 0 50px 5px;
    }
  }
}
</style>
