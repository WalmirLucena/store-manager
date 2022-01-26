const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/productController');

const { validName,
   validQuantity } = require('./controllers/middlewares/validProduct');
const { error } = require('./controllers/middlewares/error');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/products', validName, validQuantity, ProductController.create);

app.use(error);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
