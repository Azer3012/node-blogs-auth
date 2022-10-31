import mongoose from "mongoose";
import crypto from 'crypto'

const UserSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    image:String

})

const SALT='aue'

UserSchema.pre('save',function(next){
    this.password=crypto.pbkdf2Sync(this.password,SALT,100000,64,"sha512").toString('hex')

    next()
})

const UserModel=mongoose.model('users',UserSchema)

export default UserModel;