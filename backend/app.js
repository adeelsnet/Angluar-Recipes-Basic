const express = require('express');
const app = express();
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipes');
const path = require('path');

mongoose.connect('mongodb+srv://adeel:passwordpassword@ngblog-k3fev.mongodb.net/recipe?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.log(error);
    });

app.use('/images', express.static(path.join('backend/images')));

app.use(express.json()); //It must be use to parse incoming data request to JSON that will be as --body--
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use(recipeRoutes);
module.exports = app;
