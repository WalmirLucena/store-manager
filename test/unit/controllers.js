const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const ProductService = require('../../services/productService');
const ProductController = require('../../controllers/productController');

describe('3-Testando retorno das funções da pasta Controllers/Product', () => {
  const payloadProduct = {
    name: 'refrigerante',
    quantity: 2
}
  describe('Testando a função getAll', () => {
    const res = {};
    const req = {};

    before(()=>{
      req.body = payloadProduct;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const execute = [
        {
          id: 1,
          name: 'Refrigerante',
          quantity: 3
        },
        {
          id: 2,
          name: 'Hamburguer',
          quantity: 2
        }
      ];

      sinon.stub(ProductService, 'getAll').resolves(execute);

    });

    after(()=> {
      ProductService.getAll.restore();
    });

    it('É chamado com o código 200', async () => {
      await ProductController.getAll(req,res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    
    })



  });
});