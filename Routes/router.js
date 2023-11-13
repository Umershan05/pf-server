const express = require('express')

const router = new  express.Router()

const UserController =require('../Controllers/userController')
// register api
router.post('/user/register',UserController.register)
// export router
module.exports =router