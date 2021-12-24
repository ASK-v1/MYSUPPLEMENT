<script lang="ts" setup>
import { reactive } from 'vue'

const state = reactive({
  dialogFormVisible: false,
  form: {
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    country: ''
  },
  formLabelWidth: '100px'
})

</script>

<template>
  <button class="addresses-button" @click="state.dialogFormVisible = true">ADD NEW</button>

  <el-dialog
    destroy-on-close="true"
    v-model="state.dialogFormVisible"
    width="30%"
    center
    title="ADD NEW"
  >
    <el-form :model="state.form">
      <el-form-item label="First Name" :label-width="state.formLabelWidth">
        <el-input v-model="state.form.firstName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Last Name" :label-width="state.formLabelWidth">
        <el-input v-model="state.form.lastName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Phone" :label-width="state.formLabelWidth">
        <el-input v-model="state.form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Address" :label-width="state.formLabelWidth">
        <el-input v-model="state.form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Country" :label-width="state.formLabelWidth">
        <el-select v-model="state.form.country">
          <el-option label="Austria" value="Austria"></el-option>
          <el-option label="Belgium" value="Belgium"></el-option>
          <el-option label="Canada" value="Canada"></el-option>
          <el-option label="Denmark" value="Denmark"></el-option>
          <el-option label="Finland" value="Finland"></el-option>
          <el-option label="France" value="France"></el-option>
          <el-option label="Germany" value="Germany"></el-option>
          <el-option label="Greece" value="Greece"></el-option>
          <el-option label="Ireland" value="Ireland"></el-option>
          <el-option label="Italy" value="Italy"></el-option>
          <el-option label="Netherlands" value="Netherlands"></el-option>
          <el-option label="Norway" value="Norway"></el-option>
          <el-option label="Russian Federation" value="Russian Federation"></el-option>
          <el-option label="Sweden" value="Sweden"></el-option>
          <el-option label="Switzerland" value="Switzerland"></el-option>
          <el-option label="Turkey" value="Turkey"></el-option>
          <el-option label="United States" value="United States"></el-option>
          <el-option label="United Kingdom" value="United Kingdom"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="state.dialogFormVisible = false">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.addresses-button {
  background-color: $primary-color;
  color: white;
  border: none;
  width: 280px;
  height: 50px;
  font-size: $base-font-m;
  font-weight: 600;
  box-shadow: $base-shadow;

  &:hover {
    background-color: $primary-color-dark;
    transition: all 0.3s ease-in-out 0s;
    cursor: pointer;
  }
}
</style>
