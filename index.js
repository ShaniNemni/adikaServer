const express = require('express');
const app = express();

const BASE_URL = '/api'

const productsRouter =  require('./src/server/routes/ProductsRoutes');
const categoriesRouter = require('./src/server/routes/CategoriesRoutes');

app.use(`${BASE_URL}/product`,productsRouter);
app.use(`${BASE_URL}/category`,categoriesRouter);

//port for prduction env. we cant rely the port will be available
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port} ...`))