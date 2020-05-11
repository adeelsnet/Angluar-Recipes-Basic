const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: { type: String, required: true },
    cuisine: { type: String, required: true },
    description: { type: String, required: true },
    specialty: { type: String, default: 'N/A' },
    chefName: { type: String, required: true },
    date: Date,
    image: String
});

module.exports = mongoose.model('Recipe', RecipeSchema);
