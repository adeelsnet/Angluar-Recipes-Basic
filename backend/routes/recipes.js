const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../models/recipe');
const multer = require('multer');

const router = express.Router();

const MIME_TYPES = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
}


const storage = multer.diskStorage({
    destination: (req, file, callBackFunction) => {
        const isValid = MIME_TYPES[file.mimetype];
        let error = new Error('Invalid Image')

        if (isValid) {
            error = null;
        }
        // callBackFunction(null, "backend/images");
        callBackFunction(error, "backend/images");
    },

    filename: (req, file, cbf) => {

        const name = file.originalname.toLowerCase().split(' ').join('-');
        console.log(name);
        const ext = MIME_TYPES[file.mimetype];
        // cbf(null, file.originalname);
        cbf(null, name + '-' + Date.now() + '.' + ext);
    }
})

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
router.post('/api/recipe', multer({ storage: storage }).single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const recipe = new Recipe({
        _id: mongoose.Types.ObjectId(), // not necessary required as MongoDb creates it automatically
        title: req.body.title,
        cuisine: req.body.cuisine,
        chefName: req.body.chefName,
        description: req.body.description,
        specialty: req.body.specialty,
        date: new Date(),
        // image: url + '/images/' + req.file.filename
    });
    if (req.file) {
        recipe.image = url + '/images/' + req.file.filename;

    } else {
        recipe.image = url + '/images/no-image.png-1589171517312.png'
    }

    recipe.save()
        .then((recipe) => {
            res.status(201).json({
                message: 'Recipe added succesfully',
                recipe: recipe
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
});

// Edit a Recipe
router.put('/api/recipe/:id', multer({ storage: storage }).single('image'), (req, res, next) => {

    const recipe = new Recipe({
        _id: req.body._id, //or req.params.id
        title: req.body.title,
        cuisine: req.body.cuisine,
        description: req.body.description,
        chefName: req.body.chefName,
        specialty: req.body.specialty,
        date: new Date(),
    });

    if (req.file) {
        Recipe.find({ _id: req.params.id }).then(() => {
            const url = req.protocol + '://' + req.get('host');
            recipe.image = url + '/images/' + req.file.filename;

            Recipe.updateOne({ _id: req.params.id }, recipe)
                .then((result) => {
                    res.status(200).json({
                        message: 'Recipe updated succesfully',
                        recipe: result
                    });
                })
        });
    } else {
        Recipe.updateOne({ _id: req.params.id }, recipe)
            .then((recipe) => {
                res.status(200).json({
                    message: 'Recipe updated succesfully',
                    recipe: recipe
                });
            })
            .catch((error) => {
                res.status(500).json({
                    error: error
                });
            });
    }

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
