const ratelimit = require('express-rate-limit')
const {loggerEvents} = require('./logger')

const loginLimiter = ratelimit({
    windowMs:60*1000,
    max:5,
    message:{
        message:'To Many login attempts from this IP, please try again after 60s'
    },
    handler:(req,res,next,options)=>{
        loggerEvents(`Too many Request:${options.message.message}\t${req.method}\t${req.url}\t
        ${req.headers.origin}`,'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders:true,
    legacyHeaders:true
})

module.exports = loginLimiter