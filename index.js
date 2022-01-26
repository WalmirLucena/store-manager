require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/productController');

const { validName,
   validQuantity } = require('./controllers/middlewares/validProduct');
const { error } = require('./controllers/middlewares/error');

const app = express();
app.use(bodyParser.json());

app.post('/products', validName, validQuantity, ProductController.create);
app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.findById);
app.put('/products/:id', validName, validQuantity, ProductController.update);
app.delete('/products/:id', ProductController.remove);

app.use(error);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
