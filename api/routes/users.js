const router = require('express').Router()
const Student = require('../models/user')
const { isLoggedIn, isSameUser } = require('../middleware/auth')
const { validate } = require('../middleware/user')

const excludeKeys = '-__v -password'

router.get('/', isLoggedIn, async (req, res, next) => {
  const status = 200
  const response = await Student.find(req.query).select(excludeKeys)
  res.json({ status, response })
})

router.get('/:userId', isLoggedIn, async (req, res, next) => {
  const status = 200
  const response = await Student.findById(req.params.studentId).select(excludeKeys)
  res.json({ status, response })
})

router.put('/:userId', isLoggedIn, isSameUser, validate, async (req, res, next) => {
  const status = 200
  const query = { _id: req.params.studentId }
  const options = { new: true }
  const response = await Student.findOneAndUpdate(query, req.body, options).select(excludeKeys)

  res.json({ status, response })
})

router.delete('/:userId', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200

  const query = { _id: req.params.userId }
  const response = await User.findOneAndDelete(query, req.body).select(excludeKeys)

  res.json({ status, response })
})

router.delete('/:userId/assignments/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200

  const query = { _id: req.params.userId }
  const student = await User.findOne(query)
  const assignment = sudtent.assignments.id(req.params.assignmentId)

  assignment.remove()
  await student.save()
  
  res.json({ status, response: assignment })
})

module.exports = router
