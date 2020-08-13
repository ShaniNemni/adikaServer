const moment = require('moment');
const products = require('../database/ProductsList');
const FilterType = require('../common/ FilterType')
const SortBy = require('../common/SortBy');
const limitValue = 12;

function getProductsCount(list) {
    const listToCheck = list ? list : products;
    return listToCheck.length;
}

function paginationResults(page,model,res) {
    if(!page) {
        res.status(400).send("page query is missing");
        return;
    }

    if(!model) {
        res.status(200).send([]);
    }

    const startIndex = (page - 1) * limitValue;
    const endIndex = page * limitValue;    
    const results = model.slice(startIndex,endIndex);

    return results;

}

exports.getAllProducts = function(req,res) {
    console.log("allProducts ");
    res.status(200).json({
        data:res.paginatedResults,
        productsCount:getProductsCount()
    })
}

exports.getAllProductsByCategory = function(req,res){
    const categoryID = parseInt(req.query.categoryID);
    const page = parseInt(req.query.page);
    const results = products.filter(product => product.categoryID === categoryID);
    const pagResult = paginationResults(page,results,res);
    res.json({data:pagResult,productsCount:getProductsCount()});
}

exports.getAllProductsByFilter = function(req,res) {
    const filterType = req.query.filterType;
    const filterCondition = req.query.filterCondition;
    const page = parseInt(req.query.page);
    let results = products;

    if(FilterType.COLOR === filterType) {
        results = results.filter((product) => {
            const productsColor = product.colors.includes(filterCondition);
            return productsColor;
        })
    }

    if(FilterType.brand === filterType) {
        const brandName = filterCondition.toLowerCase();
        results = results.filter(product => product.brand.toLowerCase() === brandName);
    }

    if(FilterType.SIZE === filterType) {
        results = results.filter((product) => {
            const productsSizes = product.sizes.includes(filterCondition);
            return productsSizes;
        })
    }

    if(FilterType.PRICE === filterType) {
            const conditionString = filterCondition.split("-");
            const minPrice = conditionString[0];
            const maxPrice = conditionString[1];
            results = results.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }
    
    const pagResult = paginationResults(page,results,res);
    const productsCount = getProductsCount(results);
    res.json({data:pagResult,productsCount});
}

exports.productsSortBy = function (req,res) {
    //sortID
    const sortByID = parseInt(req.query.sortBy);
    const page = parseInt(req.query.page);
    let results = [];
    switch(sortByID) {
        case 1: 
            results = products.sort((a,b) => (a.countSeller < b.countSeller) ? 1 : -1);
            break;
        case 2:
            results = products.sort((a,b) => (a.name > b.name) ? 1 : -1);
            break;
        case 3:
            results = products.sort((a,b) => (a.name < b.name) ? 1 : -1);
            break;
        case 4:
            results = products.sort((a,b) => (a.price > b.price) ? 1 : -1);
            break;
        case 5:
            results = products.sort((a,b) => (a.price < b.price) ? 1 : -1);
            break;    
    }

    const pagResult = paginationResults(page,results,res);
    const productsCount = getProductsCount(results);
    res.json({data:pagResult,productsCount});

}

//middleware , this is why we need to return req,res,next. for the next function
exports.paginationResultsMiddleware = function(model){
        return(req,res,next) => {
            const page = parseInt(req.query.page);
            const results = paginationResults(page,model,res);
            
            res.paginatedResults = results;
    
            //call the next function
            next();
        
        }
}