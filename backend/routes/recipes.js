const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../models/recipe');

const router = express.Router();

// Get all Recipes
router.get('/api/all-recipes', (req, res, next) => {

    Recipe.find()
        .then((recipes) => {
            res.status(200).json({
                message: 'Recipes fecthed succesfully',
                recipes: recipes
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
});

// Get a specific Recipe
router.get('/api/recipe/:id', (req, res, next) => {
    Recipe.findById(req.params.id)
        .then((recipe) => {
            res.status(200).json({
                message: 'Recipe fecthed succesfully',
                recipe: recipe
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
});

// Add a Recipe
router.post('/api/recipe', (req, res, next) => {

    const recipe = new Recipe({
        _id: mongoose.Types.ObjectId(), // not necessary required as MongoDb creates it automatically
        title: req.body.title,
        cuisine: req.body.cuisine,
        chefName: req.body.chefName,
        description: req.body.description,
        specialty: req.body.specialty,
        date: new Date()
    });

    recipe.save()
        .then(() => {
            res.status(201).json({
                message: 'Recipe added succesfully',
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
});

// Edit a Recipe
router.put('/api/recipe/:id', (req, res, next) => {

    const recipe = new Recipe({
        _id: req.body._id, //or req.params.id
        title: req.body.title,
        cuisine: req.body.cuisine,
        description: req.body.description,
        chefName: req.body.chefName,
        specialty: req.body.specialty,
        date: new Date(),
    });
    // console.log(req.body.specialty)
    Recipe.updateOne({ _id: req.params.id }, recipe)
        .then(() => {
            res.status(200).json({
                message: 'Recipe updated succesfully'
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
});

// Delete a Recipe
router.delete('/api/recipe/:id', (req, res, next) => {

    Recipe.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({
                message: 'Recipe deleted succesfully',
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
});

module.exports = router;
