const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

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

app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
})