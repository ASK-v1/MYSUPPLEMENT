<script setup>
import { ref, reactive } from 'vue'
import store from '../store'
import router from '../router'

(store.state.userData.email === 'admin@gmail.com') ? router.push('/admin') : router.push('/')

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

const addProduct = reactive({
  dialogFormVisible: false,
  form: {
    brand: '',
    name: '',
    price: '',
    flavor: '',
    qty: '',
    servings: '',
    info: '',
    img: '',
    form: '',
    category: ''
  },
  formLabelWidth: '100px'
})

const productAdd = async () => {
  try {
    await store.dispatch('addProduct', addProduct.form)
    addProduct.dialogFormVisible = false
  } catch (error) {
    console.log(error)
  }
}

const deleteProduct = async (param) => {
  try {
    await store.dispatch('deleteProduct', param._id)
  } catch (error) {
    console.log(error)
  }
}

const logout = async () => {
  try {
    await store.dispatch('logoutUser')
    router.push('/')
  } catch (error) {
    console.log(error)
  }
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
      <button @click="logout">LOGOUT</button>
    </div>
    <div class="order-products">
      <div v-if="order" class="order">
        <h1>order list </h1>
      </div>
      <div v-if="products" class="products">
        <button class="products-button" @click="addProduct.dialogFormVisible = true">ADD NEW</button>
        <el-dialog
          v-model="addProduct.dialogFormVisible"
          width="30%"
          center
          title="ADD NEW"
        >
          <el-form :model="addProduct.form">
            <el-form-item label="Brand" :label-width="addProduct.formLabelWidth">
              <el-input v-model="addProduct.form.brand" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Name" :label-width="addProduct.formLabelWidth">
              <el-input v-model="addProduct.form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Price" :label-width="addProduct.formLabelWidth">
              <el-input v-model="addProduct.form.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Flavor" :label-width="addProduct.formLabelWidth">
              <el-input v-model="addProduct.form.flavor" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Qty" :label-width="addProduct.formLabelWidth">
              <el-input v-model="addProduct.form.qty" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Category" :label-width="addProduct.formLabelWidth">
              <el-input v-model="addProduct.form.category" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Form" :label-width="addProduct.formLabelWidth">
              <el-input v-model="addProduct.form.form" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Servings" :label-width="addProduct.formLabelWidth">
              <el-input v-model="addProduct.form.servings" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Info" :label-width="addProduct.formLabelWidth">
              <el-input v-model="addProduct.form.info" type="textarea" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Image Url" :label-width="addProduct.formLabelWidth">
              <el-input v-model="addProduct.form.img" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="addProduct.dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="productAdd">Confirm</el-button>
            </span>
          </template>
        </el-dialog>
        <div v-for="product in store.getters.products" :key="product" class="products-items">
          <div class="products-items-qty">{{ product.qty }}</div>
          <div class="products-items-img"><img :src="product.img" width="100"></div>
          <div class="products-items-name-brand">
            <div class="products-items-brand">{{ product.brand }}</div>
            <div class="products-items-name">{{ product.name }}</div>
          </div>
          <div class="products-items-price">${{ product.price }}</div>
          <font-awesome-icon
            @click="deleteProduct(product)"
            class="products-items-delete"
            :icon="['fa', 'trash-alt']"
            color="#5000b5"
          />
        </div>
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
  padding: 50px 0 calc(50% - 200px) 0;
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
      padding: 60px;
      width: 600px;
      background-color: white;
      margin-top: 60px;
      gap: 60px;
      border-radius: $base-radius;
      font-size: $base-font-m;

      &-button {
        background-color: $primary-color;
        color: white;
        border: none;
        width: 280px;
        height: 50px;
        font-size: $base-font-m;
        font-weight: 600;
        box-shadow: $base-shadow;
        align-self: center;

        &:hover {
          background-color: $primary-color-dark;
          transition: all 0.3s ease-in-out 0s;
          cursor: pointer;
        }
      }

      &-items {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border: 1px solid $dark;
        padding: $base-padding;
        border-radius: $base-radius;

        &-name-brand {
          display: flex;
          flex-direction: column;
          text-align: center;
          gap: 10px;
        }

        &-qty {
          display: flex;
          background-color: black;
          color: white;
          padding: 10px;
          font-weight: 600;
          border-radius: 30px;
        }

        &-name {
          font-size: 16px;
          text-align: center;
        }

        &-price,
        &-brand {
          font-weight: 600;
        }

        &-delete {
          font-size: 25px;
          cursor: pointer;

          &:hover {
            color: $primary-color-dark;
          }
        }
      }
    }
  }
}
</style>
