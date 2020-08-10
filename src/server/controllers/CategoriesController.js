const categories = require('../database/CategoriesList');

exports.getAllCategories = function(req,res) {
    res.status(200).json(categories)
}