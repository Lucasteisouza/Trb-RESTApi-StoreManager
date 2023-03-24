const { expect } = require('chai');
const sinon = require('sinon');
const { salesModels } = require('../../../src/models');
const { newSaleMock, newSaleRequestMock } = require("../../Mocks/sales.mocks");
const connection = require('../../../src/models/connection');

describe('testa a camada model da rota sales', async () => {
  it('testa a função createSale', async () => {
    const stub = sinon.stub(connection, "execute");
    stub.onCall(0).resolves([{ insertId: newSaleMock.id }]);
    stub.onCall(1).resolves(newSaleMock.itemsSold[0]);
    stub.onCall(2).resolves(newSaleMock.itemsSold[1]);
    const result = await salesModels.createSale(newSaleRequestMock);
    expect(result).to.be.deep.equal(newSaleMock);
    stub.restore();
  });
});