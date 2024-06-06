const express = require('express')
const route = express.Router();
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contatoController = require('./src/controllers/contatoController')
const {loginRequired} = require('./src/middlewares/middleware')

route.get('/', homeController.index)


route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

route.get('/contatos/index', loginRequired ,contatoController.index)
route.get('/contatos/register', loginRequired, contatoController.register)
route.post('/contatos/register/add', loginRequired, contatoController.add)
route.get('/contatos/edit/:id', loginRequired, contatoController.edit)
route.get('/contatos/delete/:id', loginRequired, contatoController.delete)
route.post('/contatos/edit/edit/:id', loginRequired, contatoController.editEdit)


module.exports = route;