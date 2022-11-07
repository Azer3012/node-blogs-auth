const errorMiddleware=(err,req,res,next)=>{
    const message=err.message || "Ooops! Something went wrong"
    res.status(500).send({
        message
    })
}

export default errorMiddleware;