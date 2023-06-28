const {loggerEvents} = require('./logger');


const errorHandling = (err,req,res,next)=>{
    loggerEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}
    \t${req.headers.origin}`,'errLog.log');

     console.log(err.stack);

    const status = res.statusCode ? res.statusCode : 5000

    res.status(status);
    
    res.json({message:err.message})
}

module.exports={
    errorHandling
}