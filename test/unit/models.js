const sinon = require('sinon');
const { expect } = require('chai');
const ProductModel = require('../../models/productModel');
const SalesModel = require('../../models/salesModel');
const connection = require('../../models/connection');

describe('1 -Verifica retorno da pasta ProductsModel' , () => {
    describe('Verifica função create para cadastrar produtos', () => {
        const payloadProduct = {
            name: 'refrigerante',
            quantity: 2
        }
    
        before(async () => {
            const execute = [{insertId: 1}];
    
            sinon.stub(connection, 'execute').resolves(execute);
        });
    
        after(async ()=> {
            connection.execute.restore();
        })
    
    
        describe('quando é inserido com sucesso', async () => {
            it('retorna um objeto', async () => {
                const response = await ProductModel.create(payloadProduct);
    
                expect(response).to.be.a('object');
            })
            it('esse objeto possui o id do novo filme inserido', async ()=> {
                const response = await ProductModel.create(payloadProduct);
    
                expect(response).to.have.a.property('id');
            })
        })
    }
    )
    
    describe('Verifica a função getAll de productModel', ()=>{
        describe('quando não existe produto criado', ()=> {
            before(async()=> {
                sinon.stub(connection, 'execute').resolves([[]]);
            });
    
            after(async()=> {
                connection.execute.restore();
            })
            it('retorna um array', async()=> {
                const response = await ProductModel.getAll();
                
                expect(response).to.be.an('array');
            });
            it('retorna um array vazio', async () => {
                const response = await ProductModel.getAll();
          
                expect(response).to.be.empty;
              });
        })
        describe('quando existe produtos criados', () => {
            before(async()=> {
                const execute = [[
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
                  ]];
                sinon.stub(connection, 'execute').resolves(execute);
            });
                after(async()=> {
                    connection.execute.restore();
                })
                it('retorna um array', async()=> {
                    const response = await ProductModel.getAll();
                    
                    expect(response).to.be.an('array');
                });
                it('o array com objetos possui as propriedades id, name e quantity',async ()=>{
                    const [item] = await ProductModel.getAll();
    
                    expect(item).to.include.all.keys(
                    'id',
                    'name',
                    'quantity',
                    );
                })
        })
    })
    
    describe('Verifica a função getByName de productModel', () => {
        const payloadName = 'Refrigerante';
        before(async()=> {
            sinon.stub(connection, 'execute').resolves([[
                {
                    id: 1,
                    name: 'Refrigerante',
                    quantity: 3
                  },
            ]])
        })
        after(async()=> {
            connection.execute.restore();
        })
        it('retorna um objeto', async()=> {
            const [response] = await ProductModel.getByName(payloadName);
            
            expect(response).to.be.an('object');
        });
        it('o objeto possui as chaves id, name e quantity',async ()=>{
            const [item] = await ProductModel.getByName(payloadName);
    
            expect(item).to.include.all.keys(
            'id',
            'name',
            'quantity',
            );
        })
    
    })
    
    describe('Verifica a Função findById de productModel', () => {
        const payloadId = 1;
        before(async()=> {
            sinon.stub(connection, 'execute').resolves([[
                {
                    id: 1,
                    name: 'Refrigerante',
                    quantity: 3
                  },
            ]])
        })
        after(async()=> {
            connection.execute.restore();
        })
        it('retorna um objeto', async()=> {
            const [response] = await ProductModel.findById(payloadId);
            
            expect(response).to.be.an('object');
        });
        it('o objeto possui as chaves id, name e quantity',async ()=>{
            const [item] = await ProductModel.findById(payloadId);
    
            expect(item).to.include.all.keys(
            'id',
            'name',
            'quantity',
            );
        })
    })
    
    describe('Verifica a função update de productModel', () => {
        const payloadId = 1;
        const payloadName = 'Refrigerante';
        const payloadQuantity = 3;
    
        before(async()=> {
            sinon.stub(connection, 'execute').resolves([
                {
                    id: 1,
                  },
            ])
        })
    
        after(async()=> {
            connection.execute.restore();
        })
    
        it('Retorna um objeto', async () => {
            const response = await ProductModel.update(payloadId, payloadName, payloadQuantity);
    
            expect(response).to.be.an('object');
        })
    
        it('Retorno tem a chave id', async () => {
            const response = await ProductModel.update(payloadId, payloadName, payloadQuantity);
      
            expect(response).to.be.key('id');
          });
    })
    
    describe('Verifica a função remove de productModel', () => {
        const payloadId = 1;
    
        before(async()=> {
            sinon.stub(connection, 'execute').resolves([
                {
                    id: 1,
                  },
            ])
        })
    
        after(async()=> {
            connection.execute.restore();
        })
    
        it('Retorna um objeto', async () => {
            const response = await ProductModel.remove(payloadId);
    
            expect(response).to.be.an('object');
        })
    
        it('Retorno tem a chave id', async () => {
            const response = await ProductModel.remove(payloadId);
      
            expect(response).to.be.key('id');
          });
    })
})


//SALES 


describe('2- Verifica retorno da pasta SalesModel' , () => {
    describe('Verifica função createSales para cadastrar vendas', () => {
        const payloadDate = '2008-10-29T14:56:59.000Z';
    
        before( async () => {
            const execute = [{insertId: 1}];
    
            sinon.stub(connection, 'execute').resolves(execute);
        });
    
        after(async ()=> {
            connection.execute.restore();
        })
    
    
        describe('quando é inserido a data com sucesso', async () => {
            it('retorna um objeto', async () => {
                const response = await SalesModel.createSales(payloadDate);
    
                expect(response).to.be.a('object');
            })
            it('esse objeto possui o id da Venda inserida', async ()=> {
                const response = await SalesModel.createSales(payloadDate);
    
                expect(response).to.have.a.key('id');
            })
        })
    })

    describe('Verifica a função CreateSalesProduct', ()=>{
        const payloadId = 1;
        const payloadProductID = 1;
        const payloadQuantity = 2;
        before( async () => {
            const execute = [{insertId: 1}];
    
            sinon.stub(connection, 'execute').resolves(execute);
        });
    
        after(async ()=> {
            connection.execute.restore();
        })

        it('retorna um objeto', async () => {
            const response = await SalesModel.createSalesProduct(payloadId, payloadProductID, payloadQuantity);

            expect(response).to.be.a('object');
        })
        it('esse objeto possui o id da Venda inserida', async ()=> {
            const response = await SalesModel.createSalesProduct(payloadId, payloadProductID, payloadQuantity);

            expect(response).to.have.a.key('id');
        })
    })
    
    describe('Verifica a função getAll de salesModel', ()=>{
        describe('quando não existe produto criado', ()=> {
            before(async()=> {
                sinon.stub(connection, 'execute').resolves([[]]);
            });
    
            after(async()=> {
                connection.execute.restore();
            })
            it('retorna um array', async()=> {
                const response = await SalesModel.getAll();
                
                expect(response).to.be.an('array');
            });
            it('retorna um array vazio', async () => {
                const response = await SalesModel.getAll();
          
                expect(response).to.be.empty;
              });
        })
        it('quando existe produtos criados', () => {
            before(async()=> {
                const execute = [[{
                    saleId: 1,
                    date: '2008-10-29T14:56:59.000Z',
                    product_id: 1,
                    quantity: 2,
                  }]];
                sinon.stub(connection, 'execute').resolves(execute)
                  after(()=> {
                    connection.execute.restore();
                })
                it('retorna um array', async()=> {
                    const response = await SalesModel.getAll();
                    
                    expect(response).to.be.an('array');
                });
                it('o array possui as propriedades saleId, date, product_id e quantity',async ()=>{
                    const [item] = await SalesModel.getAll();
    
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
            sinon.stub(connection, 'execute').resolves(  [[
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
              ]])
        })
        after(()=> {
            connection.execute.restore();
        })
        it('retorna um objeto', async()=> {
            const [response] = await SalesModel.findById(payloadId);
            
            expect(response).to.be.an('object');
        });
        it('o objeto possui as chaves date, product_id e quantity',async ()=>{
            const [item] = await SalesModel.findById(payloadId);
    
            expect(item).to.include.all.keys(
            'date',
            'product_id',
            'quantity',
            );
        })
    })
    
    describe('Verifica a função update de salesModel', () => {
        const payloadId = 1;
        const payloadProductID = 1;
        const payloadQuantity = 2;
    
        before(()=> {
            sinon.stub(connection, 'execute').resolves([
                {
                    id: 1,
                  },
            ])
        })
    
        after(()=> {
            connection.execute.restore();
        })
    
        it('Retorna um objeto', async () => {
            const response = await SalesModel.update(payloadId, payloadProductID, payloadQuantity);
    
            expect(response).to.be.an('object');
        })
    
        it('Retorno tem a chave id', async () => {
            const response = await SalesModel.update(payloadId, payloadProductID, payloadQuantity);
      
            expect(response).to.be.key('id');
          });
    })

    describe('Verifica a função remove de SalesModel', () => {
        const payloadId = 1;
    
        before(async()=> {
            sinon.stub(connection, 'execute').resolves([
                {
                    id: 1,
                  },
            ])
        })
    
        after(async()=> {
            connection.execute.restore();
        })
    
        it('Retorna um objeto', async () => {
            const response = await SalesModel.remove(payloadId);
    
            expect(response).to.be.an('object');
        })
    
        it('Retorno tem a chave id', async () => {
            const response = await SalesModel.remove(payloadId);
      
            expect(response).to.be.key('id');
          });
    })
    
})
