const express = require('express');
const path = require('path');

// Intantiate express app
const app = express();


app.use('/static', express.static('public'));
//setup view engine
app.set('view engine', 'pug');

// using index routes
const main = require('./routes/index');

// using main and about route
app.use(main)


//setting response status to 404
app.use((req, res, next) => {
   const err =  new Error();
   err.message = 'Page Not Found';
   err.status = 404;
   res.render('page-not-found', {err})
 
})

// Global error handling
app.use((err, req, res, next) => {
    if(err){
        console.log('Global error is called ')
    }

    if(err.status === 404){
        res.status(404).render('page-not-found', {err})
    }else{
        err.message = err.message || 'It Looks like something went wrong on server side'
        res.status(err.status || 500).render('error', {err})
    }


})


app.listen(3000, () => console.log('The application is running on localhost 3000'));

module.exports = app;