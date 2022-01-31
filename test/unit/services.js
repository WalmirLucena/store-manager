const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const ProductService = require('../../services/productService');
const ProductModel = require('../../models/productModel');
const SalesService = require('../../services/salesService');
const SalesModel = require('../../models/salesModel');

describe('3 - Testando retorno das funções da pasta Services/Product', () => {
  describe('Verifica a função create', () => {
    const payloadProduct = {
        name: 'refrigerante',
        quantity: 2
    }

    before(async () => {
        const execute = {
            id: 1,
            name: 'refrigerante',
            quantity: 2
        }

        sinon.stub(ProductModel, 'create').resolves(execute);
    });

    after(async ()=> {
        ProductModel.create.restore();
    })
    it('verifica se retorna um objeto', async()=> {
        const response = await ProductService.create(payloadProduct);

        expect(response).to.be.a('object');
    })
    it('o objeto possui as chaves id, name e quantity',async ()=>{
        const item = await ProductService.create(payloadProduct);

        expect(item).to.include.all.keys(
        'id',
        'name',
        'quantity',
        );
    })

  });

  describe('Verifica a função getAll de productService', ()=>{
    describe('quando existe produtos criados', () => {
        before(async()=> {
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
            sinon.stub(ProductModel, 'getAll').resolves(execute);
        });

            after(async ()=> {
                ProductModel.getAll.restore();
            })

            it('retorna um array', async()=> {
                const response = await ProductService.getAll();
                
                expect(response).to.be.an('array');
            });
            it('o array possui as propriedades id, name e quantity', async ()=>{
                const [item] = await ProductService.getAll();

                expect(item).to.include.all.keys(
                'id',
                'name',
                'quantity',
                );
            })
        
        })
    })
    describe('Verifica a função getByName de productService', () => {
        const payloadName = 'Refrigerante';
        before(async()=> {
            sinon.stub(ProductModel, 'getByName').resolves([{
                    id: 1,
                    name: 'Refrigerante',
                    quantity: 3
                  }]);
        })
        after(async()=> {
            ProductModel.getByName.restore();
        })
        it('retorna um array', async()=> {
            const response = await ProductService.getByName(payloadName);
            
            expect(response).to.be.an('array');
        });
        it('o array de objetos possui as chaves id, name e quantity',async ()=>{
            const [item] = await ProductService.getByName(payloadName);
    
            expect(item).to.include.all.keys(
            'id',
            'name',
            'quantity',
            );
        })
    
    })
    describe('Verifica a Função findById de productService', () => {
        const payloadId = 1;
        before(async()=> {
            sinon.stub(ProductModel, 'findById').resolves([
                {
                    id: 1,
                    name: 'Refrigerante',
                    quantity: 3
                  },
            ])
        })
        after(async()=> {
            ProductModel.findById.restore();
        })
        it('retorna um objeto', async()=> {
            const response = await ProductService.findById(payloadId);
            
            expect(response).to.be.an('object');
        });
        it('o objeto possui as chaves id, name e quantity',async ()=>{
            const item = await ProductService.findById(payloadId);
    
            expect(item).to.include.all.keys(
            'id',
            'name',
            'quantity',
            );
        })
    })
    describe('Verifica a função update de productService', () => {
        const payloadId = 1;
        const payloadName = 'Refrigerante';
        const payloadQuantity = 3;
    
        before(async()=> {
            sinon.stub(ProductModel, 'update').resolves({id: 1,})
        })
    
        after(async()=> {
            ProductModel.update.restore();
        })
    
        it('Retorna um objeto', async () => {
            const response = await ProductService.update(payloadId, payloadName, payloadQuantity);
    
            expect(response).to.be.an('object');
        })
    
        it('Retorno tem a chave id', async () => {
            const response = await ProductService.update(payloadId, payloadName, payloadQuantity);
      
            expect(response).to.be.key('id');
          });
    })

    describe('Verifica a função remove de productService', () => {
        const payloadId = 1;
    
        before(async()=> {
            sinon.stub(ProductModel, 'remove').resolves({
                    id: 1,
                  })
        })
    
        after(async()=> {
            ProductModel.remove.restore();
        })
    
        it('Retorna um objeto', async () => {
            const response = await ProductService.remove(payloadId);
    
            expect(response).to.be.an('object');
        })
    
        it('Retorno tem a chave id', async () => {
            const response = await ProductService.remove(payloadId);
      
            expect(response).to.be.key('id');
          });
    })
    
});

// SALES

describe('2- Verifica retorno da pasta SalesService' , () => {
    describe('Verifica função create para cadastrar vendas', () => {
        const payloadSale = [
            {
              productId: 1,
              quantity: 2,
            }
          ]
    
        before( async () => {   
            sinon.stub(SalesModel, 'createSales').resolves({id: 1});
            sinon.stub(SalesModel, 'createSalesProduct').resolves({id: 1})
        });
    
        after(async ()=> {
            SalesModel.createSales.restore();
            SalesModel.createSalesProduct.restore();
        })

        it('retorna um objeto', async () => {
            const response = await SalesService.create(payloadSale);

            expect(response).to.be.a('object');
        })
        it('esse objeto possui o id da Venda inserida', async ()=> {
            const response = await SalesService.create(payloadSale);

            expect(response).to.have.a.key('id');
        })
    

    
    describe('Verifica a função getAll de salesModel', ()=>{
        describe('quando não existe produto criado', ()=> {
            before(async()=> {
                sinon.stub(SalesModel, 'getAll').resolves([]);
            });
    
            after(async()=> {
                SalesModel.getAll.restore();
            })
            it('retorna um array', async()=> {
                const response = await SalesService.getAll();
                
                expect(response).to.be.an('array');
            });
            it('retorna um array vazio', async () => {
                const response = await SalesService.getAll();
          
                expect(response).to.be.empty;
              });
        })
        it('quando existe produtos criados', () => {
            before(async()=> {
                const execute = [{
                    saleId: 1,
                    date: '2008-10-29T14:56:59.000Z',
                    product_id: 1,
                    quantity: 2,
                  }];
                sinon.stub(SalesModel, 'getAll').resolves(execute)
                  after(()=> {
                    SalesModel.getAll.restore();
                })
                it('retorna um array', async()=> {
                    const response = await SalesService.getAll();
                    
                    expect(response).to.be.an('array');
                });
                it('o array possui as propriedades saleId, date, product_id e quantity',async ()=>{
                    const [item] = await SalesService.getAll();
    
                    expect(item).to.include.all.keys(
                        'saleId',
                        'date',
                        'product_id',
                        'quantity'
                    );
                })
            })
        })
    })
        
     describe('Verifica a Função findById de salesModel', () => {
        const payloadId = 1;
        before(()=> {
            sinon.stub(SalesModel, 'findById').resolves(  [
                { 
                  date: '2021-09-09T04:54:29.000Z',
                  product_id: 1,
                  quantity: 2
                },
                {
                  date: '2021-09-09T04:54:54.000Z',
                  product_id: 2,
                  quantity: 2
                }
              ])
        })
        after(()=> {
            SalesModel.findById.restore();
        })
        it('retorna um objeto', async()=> {
            const [response] = await SalesService.findById(payloadId);
            
            expect(response).to.be.an('object');
        });
        it('o objeto possui as chaves date, product_id e quantity',async ()=>{
            const [item] = await SalesService.findById(payloadId);
    
            expect(item).to.include.all.keys(
            'date',
            'product_id',
            'quantity',
            );
        })
    })
    
    describe('Verifica a função update de salesModel', () => {
        const payloadUpdate = {
            id: 1,
            productId: 2, 
            quantity: 3,
        }
    
        before(()=> {
            sinon.stub(SalesModel, 'update').resolves({
                    id: 1,
                  })
        })
    
        after(()=> {
            SalesModel.update.restore();
        })
    
        it('Retorna um objeto', async () => {
            const response = await SalesService.update(payloadUpdate);
    
            expect(response).to.be.an('object');
        })
    
        it('Retorno tem a chave id', async () => {
            const response = await SalesService.update(payloadUpdate);
      
            expect(response).to.be.key('id');
          });
    })
    
})})
