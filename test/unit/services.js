const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const ProductService = require('../../services/productService');
const ProductModel = require('../../models/productModel');

describe('3 - Testando retorno das funções da pasta Services/Product', () => {
  describe('Verifica a função create', () => {
    const payloadProduct = {
        "name": 'refrigerante',
        "quantity": 2
    }

    before(async () => {
        const execute = {
            "id": 1,
            "name": 'refrigerante',
            "quantity": 2
        }

        sinon.stub(ProductModel, "create").resolves(execute);
    });

    after(async ()=> {
        ProductModel.create.restore();
    })
    it("verifica se retorna um objeto", async()=> {
        const response = await ProductService.create(payloadProduct);

        expect(response).to.be.a('object');
    })
    it("o objeto possui as chaves id, name e quantity",async ()=>{
        const item = await ProductService.create(payloadProduct);

        expect(item).to.include.all.keys(
        "id",
        "name",
        "quantity",
        );
    })

  });

  describe("Verifica a função getAll de productService", ()=>{
    describe("quando existe produtos criados", () => {
        before(async()=> {
            const execute = [
                {
                  "id": 1,
                  "name": "Refrigerante",
                  "quantity": 3
                },
                {
                  "id": 2,
                  "name": "Hamburguer",
                  "quantity": 2
                }
              ];
            sinon.stub(ProductModel, "getAll").resolves(execute);
        });

            after(async ()=> {
                ProductModel.getAll.restore();
            })

            it("retorna um array", async()=> {
                const response = await ProductService.getAll();
                
                expect(response).to.be.an("array");
            });
            it("o array possui as propriedades id, name e quantity", async ()=>{
                const [item] = await ProductService.getAll();

                expect(item).to.include.all.keys(
                "id",
                "name",
                "quantity",
                );
            })
        
        })
    })
    describe("Verifica a função getByName de productService", () => {
        const payloadName = "Refrigerante";
        before(async()=> {
            sinon.stub(ProductModel, "getByName").resolves([{
                    "id": 1,
                    "name": "Refrigerante",
                    "quantity": 3
                  }]);
        })
        after(async()=> {
            ProductModel.getByName.restore();
        })
        it("retorna um array", async()=> {
            const response = await ProductService.getByName(payloadName);
            
            expect(response).to.be.an("array");
        });
        it("o array de objetos possui as chaves id, name e quantity",async ()=>{
            const [item] = await ProductService.getByName(payloadName);
    
            expect(item).to.include.all.keys(
            "id",
            "name",
            "quantity",
            );
        })
    
    })
    describe("Verifica a Função findById de productService", () => {
        const payloadId = 1;
        before(async()=> {
            sinon.stub(ProductModel, "findById").resolves([
                {
                    "id": 1,
                    "name": "Refrigerante",
                    "quantity": 3
                  },
            ])
        })
        after(async()=> {
            ProductModel.findById.restore();
        })
        it("retorna um objeto", async()=> {
            const response = await ProductService.findById(payloadId);
            
            expect(response).to.be.an("object");
        });
        it("o objeto possui as chaves id, name e quantity",async ()=>{
            const item = await ProductService.findById(payloadId);
    
            expect(item).to.include.all.keys(
            "id",
            "name",
            "quantity",
            );
        })
    })
    describe("Verifica a função update de productService", () => {
        const payloadId = 1;
        const payloadName = 'Refrigerante';
        const payloadQuantity = 3;
    
        before(async()=> {
            sinon.stub(ProductModel, "update").resolves({"id": 1,})
        })
    
        after(async()=> {
            ProductModel.update.restore();
        })
    
        it("Retorna um objeto", async () => {
            const response = await ProductService.update(payloadId, payloadName, payloadQuantity);
    
            expect(response).to.be.an("object");
        })
    
        it("Retorno tem a chave 'id'", async () => {
            const response = await ProductService.update(payloadId, payloadName, payloadQuantity);
      
            expect(response).to.be.key('id');
          });
    })

    describe("Verifica a função remove de productService", () => {
        const payloadId = 1;
    
        before(async()=> {
            sinon.stub(ProductModel, "remove").resolves({
                    "id": 1,
                  })
        })
    
        after(async()=> {
            ProductModel.remove.restore();
        })
    
        it("Retorna um objeto", async () => {
            const response = await ProductService.remove(payloadId);
    
            expect(response).to.be.an("object");
        })
    
        it("Retorno tem a chave 'id'", async () => {
            const response = await ProductService.remove(payloadId);
      
            expect(response).to.be.key('id');
          });
    })
    
});