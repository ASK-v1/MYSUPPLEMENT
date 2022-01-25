<script setup>
import { ref, reactive, onMounted } from 'vue'
import store from '../store'
import router from '../router'

const order = ref(false)
const products = ref(true)

onMounted(() => {
  (async () => {
    try {
      await store.dispatch('getAddress', store.getters.user._id)
    } catch (error) {
      console.log(error)
    }
  })()
})

const switchOrderAddress = () => {
  order.value = !order.value
  products.value = !products.value
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

const logout = () => {
  store.dispatch('logoutUser')
  router.push('/')
}
</script>

<template>
  <div class="admin">
    <div class="admin-title">
      <h1>ADMIN</h1>
    </div>
    <div class="admin-buttons">
      <button v-if="products" class="products-active">PRODUCTS</button>
      <button v-if="!products" @click="switchOrderAddress">PRODUCTS</button>
      <button v-if="order" class="order-active">ORDER LIST</button>
      <button v-if="!order" @click="switchOrderAddress">ORDER LIST</button>
      <button @click="logout">LOGOUT</button>
    </div>
    <div class="order-products">
      <div v-if="order" class="order">
        <h3 v-if="!store.getters.user">You don't have any orders yet!</h3>
        <div v-for="items in store.getters.user.orderHistory.reverse()" :key="items" class="order-items">
          <div class="order-date">
            <h3>{{ items.date }}</h3>
          </div>
          <div v-for="order in items.order" :key="order">
            <div class="order-items-upper">
              <img class="order-items-upper-image" :src="order.img" width="100" height="100" />
              <div class="order-items-upper-mid">
                <div class="order-items-upper-mid-brand">
                  <h4>{{ order.brand }}</h4>
                </div>
                <div class="order-items-upper-mid-name">{{ order.name }}</div>
              </div>
              <div class="order-items-upper-qty">
                <h5>{{ order.qty }}</h5>
              </div>
            </div>
          </div>
          <div class="order-items-overview">
            <div class="order-items-overview-item">
              <h3>OVERVIEW</h3>
              <h4>{{ items.order.length }} ITEMS</h4>
            </div>
            <div class="order-items-overview-subtotal">
              <h5>SUBTOTAL</h5>
              <h5>${{ parseFloat(items.order[0].totalPrice).toFixed(2) }}</h5>
            </div>
            <div class="order-items-overview-delivery">
              <h5>DELIVERY COST</h5>
              <h5>$20</h5>
            </div>
            <div class="order-items-overview-ordertotal">
              <h3>ORDER TOTAL</h3>
              <h4>${{ (parseFloat(items.order[0].totalPrice) + 20).toFixed(2) }}</h4>
            </div>
          </div>
          <div class="order-items-address">
            <div class="order-items-address-title">{{ items.address.addressTitle }}</div>
            <div class="order-items-address-name">
              <h3>First Name:</h3>
              <h4>{{ items.address.firstName }}</h4>
            </div>
            <div class="order-items-address-name">
              <h3>Last Name:</h3>
              <h4>{{ items.address.lastName.toUpperCase() }}</h4>
            </div>
            <div class="order-items-address-phone">
              <h3>Phone:</h3>
              <h4>{{ items.address.phone }}</h4>
            </div>
            <div class="order-items-address-address">
              <h3>Address:</h3>
              <h4>{{ items.address.address }}</h4>
            </div>
            <div class="order-items-address-country">
              <h3>Country:</h3>
              <h4>{{ items.address.country }}</h4>
            </div>
          </div>
        </div>
      </div>
      <div v-if="products" class="products">
        <button class="products-button" @click="addProduct.dialogFormVisible = true">ADD NEW</button>
        <el-dialog v-model="addProduct.dialogFormVisible" width="30%" center title="ADD NEW">
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
          <div class="products-items-img">
            <img :src="product.img" width="100" />
          </div>
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
    .order {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 60px;
      width: 800px;
      background-color: white;
      margin-top: 60px;
      gap: 30px;
      border-radius: $base-radius;

      &-date {
        background-color: $dark;
        padding: 5px;
        margin-bottom: 5px;
        border-top-right-radius: $base-radius;
        border-top-left-radius: $base-radius;
        color: rgb(255, 255, 255);
        font-weight: bolder;
        font-family: "Lilita One", cursive;
      }

      &-items {
        display: flex;
        flex-direction: column;
        border: 1px solid $dark;
        gap: 40px;
        border-radius: $base-radius;
        inline-size: 500px;
        text-align: center;

        &-address {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: $base-padding;

          &-title {
            display: flex;
            color: $primary-color;
            font-family: "Lilita One", cursive;
            font-size: $base-font-m;
            padding: 7px;
            margin-bottom: 10px;
            align-self: center;
          }

          &-name,
          &-phone,
          &-country,
          &-address {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
            color: $dark;
            font-size: $base-font-s;

            h3 {
              color: black;
            }
          }
        }

        &-upper {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin: 0 10px 0 10px;

          &-mid {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;

            &-brand {
              color: rgb(0, 0, 0);
              font-family: "Lilita One", cursive;
              font-size: $base-font-s;
            }
          }

          &-qty {
            background-color: black;
            color: white;
            padding: 7px;
            height: 27px;
            width: 27px;
            font-weight: 600;
            border-radius: 27px;
            font-size: $base-font-l;
            margin-top: 10px;
          }
        }

        &-overview {
          padding: $base-padding;
          background-color: $primary-color;
          color: white;
          font-weight: bolder;
          display: flex;
          flex-direction: column;
          gap: 15px;

          & > * {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 60px;
          }
        }
      }
    }

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
