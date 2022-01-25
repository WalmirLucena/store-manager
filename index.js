const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/productController');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/products', ProductController.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
