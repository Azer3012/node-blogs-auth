const express= require('express') 
const path  =require('path') 
const mongoose  =require( 'mongoose')
const cors  =require('cors') 
const helmet  =require('helmet') 
const xss  =require('xss-clean') 
const mongoSantize  =require('express-mongo-sanitize') 
const authRouter  =require('./routes/auth.js') 
const blogRouter  =require('./routes/blog.js') 
const userRouter  =require('./routes/users.js') 
const dotenv  =require('dotenv') 
const rateLimit  =require('express-rate-limit') 
const errorMiddleware  =require('./routes/middleware/errorMiddleware.js') 
const http  =require('http') 
const https  =require( 'https')
const fs  =require('fs') 
const cookieParser  =require('cookie-parser') 
const passport  =require('passport') 
const Stripe  =require('stripe') 


dotenv.config()






const app=express()

mongoose.connect(process.env.URL)

const limiter=rateLimit({
    windowMs:15*60*1000,
    max:100
})

app.use(express.json())
app.use(cookieParser())

app.use(express.urlencoded())

app.use(cors({
    origin:process.env.CLIENT_URL,

    // origin:process.env.MOBILE_URL,
    credentials:true
}))

// console.log(process.env.MOBILE_URL);

// app.use((req, res, next) => {
//     const allowedOrigins = [process.env.CLIENT_URL,process.env.MOBILE_URL];
//     const origin = req.headers.origin;
//     console.log(origin);
//     if (allowedOrigins.includes(origin)) {
//          res.setHeader('Access-Control-Allow-Origin', origin);
//          console.log(origin);
//     }
//     //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
//     res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.header('Access-Control-Allow-Credentials', true);
//     return next();
//   });
//for security
app.use(helmet())


//for NoSql injections and XSS(Cros site scripting) attacks
app.use(mongoSantize())
// app.use(xss())

app.use(passport.initialize())

require('./utils/passport.js')



app.use('/public',express.static(path.resolve('public')))

app.use(limiter)

app.use('/api/v1',authRouter)
app.use('/api/v1',blogRouter)
app.use('/api/v1',userRouter)


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
// httpsServer.listen(5000,()=>console.log('app https listening'))