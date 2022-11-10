import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSantize from 'express-mongo-sanitize'
import authRouter from './routes/auth.js'
import blogRouter from './routes/blog.js'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import errorMiddleware from './routes/middleware/errorMiddleware.js'
import http from 'http'
import https from 'https'
import fs from 'fs'
import cookieParser from 'cookie-parser'

import Stripe from 'stripe'


dotenv.config()






const app=express()

mongoose.connect(process.env.URL)

const limiter=rateLimit({
    windowMs:15*60*1000,
    max:100
})

app.use(express.json())

app.use(express.urlencoded())

app.use(cors())
//for security
app.use(helmet())
app.use(cookieParser())

//for NoSql injections and XSS(Cros site scripting) attacks
app.use(mongoSantize())
app.use(xss())

app.use('/public',express.static(path.resolve('public')))

app.use(limiter)

app.use(authRouter)
app.use('/api/v1',blogRouter)


app.get("/",(req,res)=>{
    res.sendFile(path.resolve('index.html'))
})

//payment stripe usage

app.get('/payment',async(req,res)=>{

    const myDomain='http://localhost:3000/'
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
    const session=await stripe.checkout.sessions.create({
        mode:"payment",
        success_url:myDomain+'success-payment',
        cancel_url:myDomain+'cancel-payment',
        line_items:[
            {
                
                quantity:1,
                price:process.env.STRIPE_PRODUCT_PRICE
                
            }
        ]
    })
    res.redirect(303,session.url)
})


///google oauth

app.get('/google/oauth',(req,res)=>{
    console.log(req.cookies);
    res.send('ok')
})


app.all('*',(req,res)=>{
    res.status(404).send({
        message:"Requested url not found"

    })
})

app.use(errorMiddleware)


const httpServer=http.createServer(app)

//openssl req -x509 -newkey rsa:4096 -nodes -keyout cert/key.pem -out cert/cert.pem -days 365
const httpsServer=https.createServer({
    key:fs.readFileSync('./cert/key.pem'),
    cert:fs.readFileSync('./cert/cert.pem')

},app)


httpServer.listen(8000,()=>console.log('app http listening'))
httpsServer.listen(5000,()=>console.log('app https listening'))