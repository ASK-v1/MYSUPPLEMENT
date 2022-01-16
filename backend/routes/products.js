const express = require('express')
const router = express.Router()
const { Product } = require('../models/product')

router.post('/add', async (req, res) => {
  try {
    const { brand, name, price, flavor, qty, info, servings, img, form, category } = req.body
    const product = new Product({ brand, name, price, flavor, qty, info, servings, img, form, category })
    await product.save()
    res.status(201).send()
  } catch (error) {
    res.status(404).send()
  }
})

router.get('/get', async (req, res) => {
  const productData = await Product.find()
  if (!productData) return res.status(404).send()
  res.send({ productData })
})

router.delete('/delete/:productId', async (req, res) => {
  const { productId } = req.params
  await Product.deleteOne({ _id: productId })
  res.send()
})

router.put('/review', async (req, res) => {
  const { productId, reviews } = req.body
  await Product.updateOne({ _id: productId }, { $push: { review: reviews }})
  res.send()
})

router.put('/order', async (req, res) => {
  const { order } = req.body
  for (let i = 0; i < order.length; i++) {
    const productId = order[i].product._id
    const updateQty = order[i].product.qty - order[i].qty
    await Product.updateOne({ _id: productId }, { $set: { qty: updateQty }})
  }
  res.send()
})

module.exports = router