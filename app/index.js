const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const paramter = require('koa-parameter')
const error = require('koa-json-error')
const mongoose = require('mongoose')
const routing = require('./routes')
const { connectStr } = require('./util/config')
const app = new Koa()

mongoose.connect(connectStr,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log('mongodb connected')
})
mongoose.connection.on('error',console.error)
mongoose.set('useFindAndModify', false)

app.use(error({
    postFormat:(e,{stack,...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack,...rest}
}))
app.use(bodyparser())
app.use(paramter(app))
routing(app)

app.listen(3000,()=>{
    console.log('server listen at port:3000')
})