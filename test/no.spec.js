var expect = require('expect.js'),
  info = require('../src'),
  sinon = require('sinon'),
  log,
  ci;

describe('A context without a build server', function () {

  beforeEach(function () {
    log = { info: sinon.stub() };
    ci = info({}, {}, log);
  });

  it('provides no build server information', function () {
    expect(ci).to.be.empty();
  });

});