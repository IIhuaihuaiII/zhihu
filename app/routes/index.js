// const fs = require('fs')

// module.exports = (app)=>{
//     fs.readdirSync(__dirname).forEach(file => {
//         if(file === 'index'){ return }
//         let route = require(`./${file}`)
//         console.log(route)
//         app.use(route.routes()).use(route.allowedMethods())
//     })
// }
const homeRouter = require('./home')
const userRouter = require('./user')

module.exports = (app) => {
    app.use(homeRouter.routes())
    app.use(userRouter.routes()).use(userRouter.allowedMethods())
}