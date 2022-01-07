<script setup>
import { reactive } from 'vue'
import store from '../store'
import router from '../router'

const uid = () => {
  return Math.floor((1 + Math.random()) * 0x1000).toString(16)
}

const addAddress = reactive({
  dialogFormVisible: false,
  form: {
    id: `${uid() + uid()}-${uid() + uid()}-${uid() + uid()}`,
    addressTitle: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    country: ''
  },
  formLabelWidth: '100px'
})

const saveAddress = async () => {
  const data = {
    userId: store.state.userData._id,
    addr: addAddress.form
  }
  try {
    await store.dispatch('saveAddress', data)
    addAddress.dialogFormVisible = false
    router.go()
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <button class="addresses-button" @click="addAddress.dialogFormVisible = true">ADD NEW</button>

  <el-dialog
    destroy-on-close="true"
    v-model="addAddress.dialogFormVisible"
    width="30%"
    center
    title="ADD NEW"
  >
    <el-form :model="addAddress.form">
      <el-form-item label="Address Title" :label-width="addAddress.formLabelWidth">
      <el-input v-model="addAddress.form.addressTitle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="First Name" :label-width="addAddress.formLabelWidth">
        <el-input v-model="addAddress.form.firstName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Last Name" :label-width="addAddress.formLabelWidth">
        <el-input v-model="addAddress.form.lastName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Phone" :label-width="addAddress.formLabelWidth">
        <el-input v-model="addAddress.form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Address" :label-width="addAddress.formLabelWidth">
        <el-input maxlength="50" type="textarea" v-model="addAddress.form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Country" :label-width="addAddress.formLabelWidth">
        <el-select required v-model="addAddress.form.country">
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
        <el-button @click="addAddress.dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveAddress">Confirm</el-button>
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
