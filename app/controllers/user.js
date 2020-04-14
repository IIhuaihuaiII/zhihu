const jsonwebtoken = require('jsonwebtoken')
const User = require('../model/user')
const { secret } = require('../util/config')

class UserCtl {
    async findList(ctx){
        ctx.body = await User.find()
    }
    async findById(ctx){
        const user = await User.findById(ctx.params.id)
        if(!user){ ctx.throw(404,'用户不存在')}
        ctx.body = user
    }
    async create(ctx){
        ctx.verifyParams({
            name:{type:'string', require:true},
            password:{type:'string', require:true}
        })
        let { name } = ctx.request.body
        let repeatedUser = await User.findOne({ name })
        if(repeatedUser){ ctx.throw(409,'用户已存在，请重新输入')}
        const user = await new User(ctx.request.body).save()
        console.log(user)
        ctx.body = user
    }
    async checkOwner(ctx,next){
        console.log(ctx.params.id)
        console.log(ctx.state.user._id)
        if(ctx.params.id !== ctx.state.user._id){ ctx.throw(403,'没有权限')}
        await next()
    }
    async update(ctx){
        ctx.verifyParams({
            name:{type:'string', require:false},
            password:{type:'string', require:false}
        })
        const user = await User.findByIdAndUpdate(ctx.params.id,ctx.request.body)
        if(!user){ ctx.throw(404,'用户不存在')}
        ctx.body = ctx.request.body
    }
    async del(ctx){
        const user = await User.findByIdAndRemove(ctx.params.id)
        if(!user){ ctx.throw(404,'用户不存在')}
        ctx.body = '该用户已删除'
    }
    async login(ctx){
        ctx.verifyParams({
            name:{type:'string', require:true},
            password:{type:'string', require:true}
        })
        const user = await User.findOne(ctx.request.body)
        if(!user){ ctx.throw(401,'用户名或密码不正确')}
        const { _id, name } = user
        const token = jsonwebtoken.sign({_id, name },secret, { expiresIn:'1d'})
        ctx.body = {token}
    }
}

module.exports = new UserCtl()