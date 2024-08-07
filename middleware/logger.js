const {v4: uuid} = require('uuid');
const { format } = require('date-fns');
const fs = require('fs');
const fsPromise = require('fs').promises
const path = require('path');


const logHandler = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
            if(!fs.existsSync(path.join(__dirname, '..', 'log'))){
            await fsPromise.mkdir(path.join(__dirname, '..', 'log'))
        }
         await fsPromise.appendFile(path.join(__dirname, '..', 'log', logName), logItem);
     } catch (error){
    console.log(error.message)
    }
}


const logger = async (req, res, next) => {
    logHandler(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(req.method + ' ' + req.url);
    next()
}

module.exports = {
    logger,
    logHandler
}

