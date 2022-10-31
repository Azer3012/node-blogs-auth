import express from 'express'
import path from 'path'
import mongoose from 'mongoose'

import authRouter from './routes/auth.js'
import blogRouter from './routes/blog.js'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'

dotenv.config()






const app=express()

mongoose.connect(process.env.URL)

const limiter=rateLimit({
    windowMs:15*60*1000,
    max:100
})

app.use(express.json())

app.use(express.urlencoded())

app.use('/public',express.static(path.resolve('public')))

app.use(limiter)

app.use(authRouter)
app.use('/api/v1',blogRouter)










app.get("/",(req,res)=>{
    res.sendFile(path.resolve('index.html'))
})


app.listen(3000,()=>console.log('app listening'))