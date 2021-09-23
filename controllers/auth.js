const authRouter = require('express').Router()
const userService = require('../services/user')
const loginService = require('../services/login')
const tokenGenerator = require('../utils/tokenGenerator')
const mailService = require('../services/sendgrid')

authRouter.post('/register', async (req, res, next) => {
  const body = req.body
  try {
    const serviceResponse = await userService.create(body.username, body.password, body.mail,  next)
    if(serviceResponse instanceof Error ) {
      throw serviceResponse
    }
    const token = tokenGenerator(serviceResponse)
    await mailService.sendRegisterMail(serviceResponse.mail)
    res.status(200).json({ username: serviceResponse.username, token: token })
  }
  catch (error) {
    next(error)
  }
})

authRouter.post('/login', async (req, res, next) => {
  const body = req.body
  try {
    const serviceResponse = await loginService.login(body.username,body.password, body.rememberMe)
    if(serviceResponse instanceof Error ) {
      throw serviceResponse
    }
    res.status(200).json(serviceResponse)
  }
  catch(error) {
    next(error)
  }
})

module.exports = authRouter