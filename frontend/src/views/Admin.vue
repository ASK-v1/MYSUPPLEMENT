<script lang="ts" setup>
import { ref, reactive } from 'vue'

const state = reactive({
  dialogFormVisible: false,
  form: {
    Brand: '',
    Name: '',
    Price: '',
    Flavor: '',
    Qty: '',
    Info: ''
  },
  formLabelWidth: '100px'
})

const order = ref(false)
const products = ref(true)

const switchOrder = () => {
  order.value = true
  products.value = false
}
const switchProducts = () => {
  products.value = true
  order.value = false
}

</script>

<template>
  <div class="admin">
    <div class="admin-title">
      <h1>ADMIN</h1>
    </div>
    <div class="admin-buttons">
      <button v-if="products" class="products-active">PRODUCTS</button>
      <button v-if="!products" @click="switchProducts">PRODUCTS</button>
      <button v-if="order" class="order-active">ORDER LIST</button>
      <button v-if="!order" @click="switchOrder">ORDER LIST</button>
      <button>LOGOUT</button>
    </div>
    <div class="order-products">
      <div v-if="order" class="order">
        <el-empty description="You don't have any orders yet!"></el-empty>
      </div>
      <div v-if="products" class="products">
        <el-empty description="You don't have any product yet!"></el-empty>
        <button class="addresses-button" @click="state.dialogFormVisible = true">ADD NEW</button>
        <el-dialog
          destroy-on-close="true"
          v-model="state.dialogFormVisible"
          width="30%"
          center
          title="ADD NEW"
        >
          <el-form :model="state.form">
            <el-form-item label="Brand" :label-width="state.formLabelWidth">
              <el-input v-model="state.form.Brand" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Name" :label-width="state.formLabelWidth">
              <el-input v-model="state.form.Name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Price" :label-width="state.formLabelWidth">
              <el-input v-model="state.form.Price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Flavor" :label-width="state.formLabelWidth">
              <el-input v-model="state.form.Flavor" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Qty" :label-width="state.formLabelWidth">
              <el-input v-model="state.form.Qty" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Info" :label-width="state.formLabelWidth">
              <el-input v-model="state.form.Info" type="textarea" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Photo" :label-width="state.formLabelWidth">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="1">
                <el-button size="small" type="success">Click to upload</el-button>
              </el-upload>
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
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/style/index.scss";

.admin {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 calc(50% - 500px) 0;
  background-image: linear-gradient(
    66deg,
    #ff7171 3%,
    #c850c0 33%,
    #ffcc70 99%
  );

  .admin-title {
    background-color: rgb(0, 0, 0);
    color: white;
    font-family: "Lilita One", cursive;
    font-size: $base-font-m;
    padding: $base-padding;
    margin-bottom: 50px;
  }

  .admin-buttons {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 20px;

    button {
      color: black;
      text-decoration: none;
      font-size: $base-font-s;
      padding: $base-padding;
      border-radius: 5px;
      border: none;
      font-weight: bold;
      width: 200px;

      &:hover {
        background-color: rgba(0, 0, 0);
        color: white;
        cursor: pointer;
        transition: all 0.3s ease-in-out 0s;
      }
    }
    .products-active,
    .order-active {
      color: white;
      background-color: black;
    }
  }
  .order-products {
    .order,
    .products {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 60px;
      width: 600px;
      background-color: white;
      margin-top: 60px;
      gap: 60px;
      border-radius: $base-radius;
      font-size: $base-font-m;
    }
  }
}
</style>
