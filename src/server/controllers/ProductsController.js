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

exports.allProductsByFilter = function(req,res) {
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