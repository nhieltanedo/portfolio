const express = require('express');
const path = require('path');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler')
const corsOption = require('./config/corsOption')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express();
const PORT = 5000;

//middleware
app.use(logger)
app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))





app.use('/', express.static(path.join(__dirname, './public')))
app.use('/', require('./routes/root'));


app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if(req.accepts('json')){
        res.json({error: 'Resources Not Found!'})
    } else {
        res.type('txt').send('Resources Not Found');
    }
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
})