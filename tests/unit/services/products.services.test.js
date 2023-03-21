const { expect } = require('chai');
const sinon = require('sinon');
const { productServices } = require('../../../src/services');
const { productModels } = require("../../../src/models");
const { products, singleProduct } = require("../models/product.models.mocks");

describe('testa a camada services da rota products', () => {
  it('retorna todos os produtos', async () => {
    sinon.stub(productModels, 'getAll').resolves(products);

    const result = await productServices.getAll();

    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(products);
  });

  it('retorna um produto pelo id', async () => {
    sinon.stub(productModels, "getProductById").resolves(singleProduct);

    const result = await productServices.getProductById(1);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(singleProduct);
  });

  it("retorna um erro se o id nao for um numero", async () => {
    sinon.stub(productModels, "getProductById").resolves(singleProduct);

    const result = await productServices.getProductById('a');

    expect(result.type).to.be.equal('INVALID_VALUE');
    expect(result.message).to.deep.equal('"id" must be a number');
  });

  it("retorna um erro se o produto nao for encontrado", async () => {
    sinon.stub(productModels, "getProductById").resolves(null);

    const result = await productServices.getProductById(1);

    expect(result.type).to.be.equal('NOT_FOUND');
    expect(result.message).to.deep.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});