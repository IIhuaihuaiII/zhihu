const mongoose = require('mongoose')
const { Schema,model } = mongoose

const userSchema = new Schema({
    __v:{type:Number,select:false},
    name:{type:String,require:true},
    password:{type:String,require:true,select:false}
})

const User = model('User',userSchema)

module.exports = User
