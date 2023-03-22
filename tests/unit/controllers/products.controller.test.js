const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsMock, singleProductMock, newProductMock } = require('../product.models.mocks');

const { productsControllers } = require("../../../src/controllers/");
const { productServices } = require("../../../src/services/");

describe('testa a camada controller da rota products', () => {
  it('listar todos os produtos', async () => {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productServices, "getAll")
      .resolves({ type: null, message: productsMock });
    
    await productsControllers.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect (res.json).to.have.been.calledWith(productsMock);
  });

  it('listar um produto pelo id', async () => {
    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productServices, "getProductById")
      .resolves({ type: null, message: singleProductMock });
    
    await productsControllers.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect (res.json).to.have.been.calledWith(singleProductMock);
  });

  it('retorna um erro se o id nao for um numero', async () => {
    const req = { params: { id: 'a' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productServices, "getProductById")
      .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });
    
    await productsControllers.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect (res.json).to.have.been.calledWith({ message: '"id" must be a number' });
  });

  it('retorna um erro se o produto nao for encontrado', async () => {
    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productServices, "getProductById")
      .resolves({ type: 'NOT_FOUND', message: 'Product not found' });
    
    await productsControllers.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect (res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('cria um produto', async () => {
    const req = { body: { name: "Produto da sua escolha" } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productServices, "createProduct")
      .resolves({ type: null, message: newProductMock });
    
    await productsControllers.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductMock);
  });

   afterEach(function () {
     sinon.restore();
   });
});

