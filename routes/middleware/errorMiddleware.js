import e from "express";

const errorMiddleware=(err,req,res,next)=>{
    const message=err.message
    if(process.env.NODE_ENV==="development"){
        res.status(500).send({
            message
        })
    }
    else{
        res.status(500).send({
            message:"Something went wrong"
        })
    }
    
}

export default errorMiddleware;