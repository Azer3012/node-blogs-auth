import express from 'express'
import User from '../models/user.js'
import multer from 'multer'
import crypto from 'crypto'

import Session from '../models/session.js '
const router=express.Router()


const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true)
    }
    else{
        cb(new Error('invalide mimetype'))
    }
    }
    
    const storage=multer.diskStorage(
        {
            destination:(req,file,cb)=>{
                cb(null,'public/uploads/')
            },
            filename:(req,file,cb)=>{
    
                cb(null,file.originalname)
            }
        }
    )
    
    const upload=multer({storage,fileFilter})


router.post('/register',upload.single('image'),async (req,res)=>{
    

    const {path} =req.file
    const {firstName,lastName,email,password}=req.body

    const newUser= new User({
        firstName,lastName,email,password,image:path
    })
    await newUser.save()
    res.status(200).send('ok')
})

const SALT='aue'

router.post('/login',async(req,res)=>{
    const {email,password}=req.body

    const hashedPassword=crypto.pbkdf2Sync(password,SALT,100000,64,"sha512").toString('hex')

    const user=await User.findOne({email,password:hashedPassword})

    const accessToken=crypto.randomBytes(32).toString('base64')

    const session=new Session({
        user:user._id,
        accessToken,
        expiresAt: Date.now() + 1000*60*60*24
    })

    await session.save()

   if(user){
    res.send({accessToken})
   }
   else{
    res.status(401).send({
        message:"Email or password is not correct"
    })
   }

    
})

export default router;