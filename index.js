const express = require('express');
const app = express();

const BASE_URL = '/api'
// //adding middleware
// app.use(express.json());

const productsRouter =  require('./src/server/routes/ProductsRoutes');
app.use(`${BASE_URL}/product`,productsRouter);


// app.get('/',(req,res) => {
//     if(!req.body.name) {
//         res.status(400).send("names is requiered");
//         return ; 
//     }

//     res.send("hello world!!");
// });


//port for prduction env. we cant rely the port will be available
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port} ...`))