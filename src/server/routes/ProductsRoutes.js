const express = require('express');
const router = express.Router();

const products = require('../database/ProductsList');
const products_controller = require('../controllers/ProductsController');

router.get(`/allProducts`,products_controller.paginationResultsMiddleware(products),products_controller.getAllProducts);
router.get(`/allProductsByCategory`,products_controller.getAllProductsByCategory);
router.get('/allProductsByFilter',products_controller.getAllProductsByFilter);
router.get('/allProductsBySort',products_controller.productsSortBy);

module.exports = router;