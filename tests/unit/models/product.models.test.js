const { expect } = require('chai');
const sinon = require('sinon');
const { productModels } = require('../../../src/models');
const { productsMock, singleProductMock } = require("../product.models.mocks");
const connection = require('../../../src/models/connection');

describe('Teste a camada model de produtos', () => {
  it('testa a função getAll de produtos', async () => {
    const stub = sinon.stub(connection, 'execute').resolves([productsMock]);
    const result = await productModels.getAll();
    expect(result).to.be.deep.equal(productsMock);
    stub.restore();
  })

  it('testa a função getProductById de produtos', async () => {
    const stub = sinon.stub(connection, "execute").resolves([singleProductMock]);
    const result = await productModels.getProductById(1);
    expect(result).to.be.deep.equal(singleProductMock);
    stub.restore();
  });
});