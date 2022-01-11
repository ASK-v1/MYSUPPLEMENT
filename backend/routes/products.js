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
  if (!productData) return res.status(404)
  else res.json({ productData })
})

router.delete('/delete/:productId', async (req, res) => {
  const { productId } = req.params
  const product = await Product.deleteOne({ _id: productId })
  if (!product) return res.status(404)
  res.send(product)
})

router.put('/review', async (req, res) => {
  const { productId, reviews } = req.body
  const review = await Product.updateOne({ _id: productId }, { $push: { review: reviews } })
  if (!review) return res.status(404)
  else res.send(review)
})

module.exports = router