const Router = require('koa-router')
const jwt = require('koa-jwt')
const router = new Router({prefix:'/users'})
const { findList, findById, create, update, del, login, checkOwner} = require('../controllers/user')
const { secret } = require('../util/config')

const auth = jwt({ secret })

router.get('/',findList)

router.post('/',create)

router.get('/:id',findById)

router.put('/:id',auth, checkOwner, update)

router.delete('/:id',auth, checkOwner, del)

router.post('/login',login)

module.exports = router