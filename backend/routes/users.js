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
      res.json(user).status(201).send()
    }
    else res.status(401).send()
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
      const token = jwt.sign({ email }, SECRET)
      res.json({ token, userData })
    }
    else res.status(401).send()
  } catch {
    res.status(401).send()
  }
})

router.put('/address/save', async (req, res) => {
  const { userId, addr  } = req.body
  const save = await User.updateOne({ _id: userId }, { $push: { address: addr } })
  if (!save) return res.status(404)
  else res.send(save)
})

router.get('/address/get/:userId', async (req, res) => {
  const { userId } = req.params
  const userData = await User.findById(userId)
  if (!userData) return res.status(404)
  else res.json({ userData })
})

router.delete('/address/delete/:userId/:addr', async (req, res) => {
  const { userId, addr } = req.params
  const addressDelete = await User.updateOne({ _id: userId }, { $pull: { address: { id: addr} } })
  if (!addressDelete) return res.status(404)
  else res.send(addressDelete)
})

module.exports = router