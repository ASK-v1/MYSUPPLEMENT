const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { User } = require('../models/user')
const { SECRET } = require('../keys')
const jwt = require('jsonwebtoken')
const saltRounds = 10

router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      const user = new User({ firstName, lastName, email, password: hashedPassword })
      await user.save()
      res.status(201).send()
    } else res.status(401).send()
  } catch (error) {
    res.status(401).send()
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const userData = await User.findOne({ email })
    const match = await bcrypt.compare(password, userData.password)
    if (match) {
      const token = jwt.sign(email, SECRET)
      res.send({ token, userData })
    } else res.status(401).send()
  } catch {
    res.status(401).send()
  }
})

router.put('/address/save', async (req, res) => {
  const { userId, addr } = req.body
  await User.updateOne({ _id: userId }, { $push: { address: addr }})
  res.send()
})

router.get('/address/get/:userId', async (req, res) => {
  const { userId } = req.params
  const userData = await User.findById(userId)
  if (!userData) return res.status(404).send()
  res.send({ userData })
})

router.delete('/address/delete/:userId/:addr', async (req, res) => {
  const { userId, addr } = req.params
  await User.updateOne({ _id: userId }, { $pull: { address: { id: addr }}})
  res.send()
})

router.put('/order', async (req, res) => {
  const { userId, order, address } = req.body
  const data = {
    order: order,
    address: address
  }
  await User.updateOne({ _id: userId }, { $push: { orderHistory: [data] }})
  res.send()
})

router.put('/select', async (req, res) => {
  const { userId, selectId, len } = req.body
  const reset = { _id: userId }
  for (let i = 0; i < len; i++) {
    const update = { $set: { [`address.${i}.selected`]: false }}
    await User.updateOne(reset, update)
  }
  const select = { _id: userId, "address.id": selectId }
  const update = { $set: { [`address.$.selected`]: true }}
  await User.updateOne(select, update)
  res.send()
})

module.exports = router