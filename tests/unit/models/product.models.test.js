const { expect } = require('chai');
const sinon = require('sinon');
const { productModels } = require('../../../src/models');
const { productsMock, singleProductMock, newProductMock } = require("../../Mocks/product.mocks");
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

  it('testa a função createProduct', async () => {
    const stub = sinon.stub(connection, "execute").resolves([{insertId: 69}]);
    const result = await productModels.createProduct(newProductMock);
    expect(result).to.equal(69);
    stub.restore();
  });
});