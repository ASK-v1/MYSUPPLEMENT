const express = require('express')
const router = express.Router()
const { Product } = require('../models/product')

router.post('/add', async (req, res) => {
  const { brand, name, price, flavor, qty, info, servings, img, form, category } = req.body
  const product = new Product({ brand, name, price, flavor, qty, info, servings, img, form, category })
  await product.save()
  res.send()
})

router.get('/get', async (req, res) => {
  const productData = await Product.find()
  if (!productData) return res.status(404).send()
  res.send({ productData })
})

router.get('/get/:category', async (req, res) => {
  const { category } = req.params
  const productData = await Product.find({ category: category })
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
    if (order[i].total - order[i].qty < 0) return res.status(404).send()
  }
  for (let i = 0; i < order.length; i++) {
    const productId = order[i].id
    const updateQty = order[i].total - order[i].qty
    await Product.updateOne({ _id: productId }, { $set: { qty: updateQty }})
  }
  res.send()
})

module.exports = router