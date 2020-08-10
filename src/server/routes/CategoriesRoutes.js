const express = require('express');
const router = express.Router();

const categories_controller = require('../controllers/CategoriesController');

router.get(`/allCategories`,categories_controller.getAllCategories);

module.exports = router;