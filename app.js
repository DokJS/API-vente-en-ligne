const express = require('express');
const mongoose = require('mongoose');
const stuffRouter = require('./Router/stuff');
const authRouter = require('./Router/user');
const app = express();
// Fix CORS issues
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Lets to retrieve incoming request's json content 
app.use(express.json());

// DB Connexion
mongoose.connect('mongodb+srv://omarmbengue6919:Superomar221@cluster0.q3mf1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( ()=> console.log('Database connexion successfuly !'))
    .catch( ()=> console.log('Database connexion failed !'))

    // routers
    app.use('/api/stuff',stuffRouter);
    app.use('/api/auth',authRouter);





module.exports = app;