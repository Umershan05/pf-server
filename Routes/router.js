const express = require('express')

const router = new  express.Router()

const UserController =require('../Controllers/userController')
const projectController=require('../Controllers/projectController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
// register api
router.post('/user/register',UserController.register)
// login api 
router.post('/user/login',UserController.login)
// addprojects
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addprojects)
// getuserproject
router.get('/user/all-projects',jwtMiddleware,projectController.alluserProjects)
// getallproject
router.get('/projects/all',jwtMiddleware,projectController.getallProjects)
// homeprojects

router.get('/projects/home-projects',projectController.getHomeProjects)
// edit project
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProjectController)
// delete project
router.delete('/projects/remove/:id',jwtMiddleware,projectController.deleteProjectController)
// editUser
router.put('user/edit',jwtMiddleware,multerConfig.single('profileImage'),UserController.editUser)
// export router
module.exports =router