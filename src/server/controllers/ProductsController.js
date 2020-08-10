const products = require('../database/ProductsList');
const FilterType = require('../common/ FilterType');
const limitValue = 12;

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
    res.status(200).json(res.paginatedResults)
}

exports.getAllProductsByCategory = function(req,res){
    const categoryID = parseInt(req.query.categoryID);
    const page = parseInt(req.query.page);
    const results = products.filter(product => product.categoryID === categoryID);
    const pagResult = paginationResults(page,results,res);
    res.json(pagResult);
}

exports.getAllProductsByFilter = function(req,res) {
    const filterType = req.query.filterType;
    const filterCondition = req.query.filterCondition;
    const page = parseInt(req.query.page);

    let results = [];

    switch(filterType) {
        case FilterType.COLOR:
            results = products.filter((product) => {
                const productsColor = product.colors.includes(filterCondition);
                return productsColor;
            })
            break;
        case FilterType.BRAND:
            const brandName = filterCondition.toLowerCase();
            results = products.filter(product => product.brand.toLowerCase() === brandName);
            break;
        case FilterType.SIZE:
            results = products.filter((product) => {
                const productsSizes = product.sizes.includes(filterCondition);
                return productsSizes;
            })
            break;
        case FilterType.PRICE:
            const conditionString = filterCondition.split("-");
            const minPrice = conditionString[0];
            const maxPrice = conditionString[1];
            results = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
            break;
    }
    
    const pagResult = paginationResults(page,results,res);
    res.json(pagResult);
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