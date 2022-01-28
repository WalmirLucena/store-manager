const sinon = require("sinon");
const { expect } = require("chai");
const ProductModel = require('../../models/productModel');
const connection = require("../../models/connection");

describe("Verifica função create para cadastrar produtos", () => {
    const payloadProduct = {
        "name": 'refrigerante',
        "quantity": 2
    }

    before(async () => {
        const execute = [{insertId: 1}];

        sinon.stub(connection, "execute").resolves(execute);
    });

    after(async ()=> {
        connection.execute.restore();
    })


    describe("quando é inserido com sucesso", async () => {
        it("retorna um objeto", async () => {
            const response = await ProductModel.create(payloadProduct);

            expect(response).to.be.a("object");
        })
        it("esse objeto possui o id do novo filme inserido", async ()=> {
            const response = await ProductModel.create(payloadProduct);

            expect(response).to.have.a.property("id");
        })
    })
}
)

describe("Verifica a função getAll de productModel", ()=>{
    describe("quando não existe produto criado", ()=> {
        before(()=> {
            sinon.stub(connection, "execute").resolves([[]]);
        });

        after(()=> {
            connection.execute.restore();
        })
        it("retorna um array", async()=> {
            const response = await ProductModel.getAll();
            
            expect(response).to.be.an("array");
        });
        it("retorna um array vazio", async () => {
            const response = await ProductModel.getAll();
      
            expect(response).to.be.empty;
          });
    })
    describe("quando existe produtos criados", () => {
        before(()=> {
            sinon.stub(connection, "execute").resolves([
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
              ])
              after(()=> {
                connection.execute.restore();
            })
            it("retorna um array", async()=> {
                const response = await ProductModel.getAll();
                
                expect(response).to.be.an("array");
            });
            it("o array possui as propriedades id, name e quantity",async ()=>{
                const [item] = await ProductModel.getAll();

                expect(item).to.include.all.keys(
                "id",
                "name",
                "quantity",
                );
            })
        })
    })
})

describe("Verifica a função getByName de productModel", () => {
    const payloadName = "Refrigerante";
    before(()=> {
        sinon.stub(connection, "execute").resolves([
            {
                "id": 1,
                "name": "Refrigerante",
                "quantity": 3
              },
        ])
    })
    after(()=> {
        connection.execute.restore();
    })
    it("retorna um objeto", async()=> {
        const response = await ProductModel.getByName(payloadName);
        
        expect(response).to.be.an("object");
    });
    it("o objeto possui as chaves id, name e quantity",async ()=>{
        const item = await ProductModel.getAll();

        expect(item).to.include.all.keys(
        "id",
        "name",
        "quantity",
        );
    })

})

describe("Verifica a Função findById de productModel", () => {
    const payloadId = 1;
    before(()=> {
        sinon.stub(connection, "execute").resolves([
            {
                "id": 1,
                "name": "Refrigerante",
                "quantity": 3
              },
        ])
    })
    after(()=> {
        connection.execute.restore();
    })
    it("retorna um objeto", async()=> {
        const response = await ProductModel.findById(payloadId);
        
        expect(response).to.be.an("object");
    });
    it("o objeto possui as chaves id, name e quantity",async ()=>{
        const item = await ProductModel.findById(payloadId);

        expect(item).to.include.all.keys(
        "id",
        "name",
        "quantity",
        );
    })
})

describe("Verifica a função update de productModel", () => {
    const payloadId = 1;
    const payloadName = 'Refrigerante';
    const payloadQuantity = 3;

    before(()=> {
        sinon.stub(connection, "execute").resolves([
            {
                "id": 1,
              },
        ])
    })

    after(()=> {
        connection.execute.restore();
    })

    it("Retorna um objeto", async () => {
        const response = await ProductModel.update(payloadId, payloadName, payloadQuantity);

        expect(response).to.be.an("object");
    })

    it("Retorno tem a chave 'id'", async () => {
        const response = await ProductModel.update(payloadId, payloadName, payloadQuantity);
  
        expect(response).to.be.key('id');
      });
})

describe("Verifica a função remove de productModel", () => {
    const payloadId = 1;

    before(()=> {
        sinon.stub(connection, "execute").resolves([
            {
                "id": 1,
              },
        ])
    })

    after(()=> {
        connection.execute.restore();
    })

    it("Retorna um objeto", async () => {
        const response = await ProductModel.remove(payloadId);

        expect(response).to.be.an("object");
    })

    it("Retorno tem a chave 'id'", async () => {
        const response = await ProductModel.remove(payloadId);
  
        expect(response).to.be.key('id');
      });
})