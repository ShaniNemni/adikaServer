const products = [
    {id:1,name:'user1',categoryID:1},
    {id:1,name:'user1',categoryID:2},
    {id:2,name:'user2',categoryID:3},
    {id:3,name:'user3',categoryID:1},
    {id:4,name:'user4',categoryID:2},
    {id:5,name:'user5',categoryID:3},
    {id:6,name:'user6',categoryID:1},
    {id:7,name:'user7',categoryID:2},
    {id:8,name:'user8',categoryID:3},
    {id:9,name:'user9',categoryID:1},
    {id:10,name:'user10',categoryID:2},
    {id:11,name:'user11',categoryID:3},
    {id:12,name:'user12',categoryID:1},
    {id:13,name:'user13',categoryID:2},
    {id:14,name:'user14',categoryID:3}
    ];

var express = require('express');
var router = express.Router();

let products_controller = require('../controllers/ProductsController');

router.get(`/allProducts`,products_controller.paginationResultsMiddleware(products),products_controller.getAllProducts);
router.get(`/allProductsByCategory`,products_controller.getAllProductsByCategory);


module.exports = router;