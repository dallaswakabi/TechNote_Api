const {format} = require('date-fns'); 
const {v4:uuid} = require('uuid');
const fs = require('fs')
const path = require('path')
const fspromises = require('fs').promises;

const loggerEvents = async(message,filename)=>{
    const dateTime = `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`;
    const logerItem = `${dateTime}\t${uuid()}\t${message}` ; 

    try {
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fspromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fspromises.appendFile(path.join(__dirname,'..','logs',filename),logerItem)
    } catch (error) {
        console.log(error.message);
    }
}

const logger = (req,res,next)=>{
    loggerEvents(`${req.method}\t${req.url}\t${req.headers.origin}`,'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports ={
    loggerEvents,
    logger
}