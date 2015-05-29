var expect = require('expect.js'),
  info = require('../'),
  sinon = require('sinon'),
  options,
  log,
  ci;

describe('A picture-perfect Teamcity context', function () {

  beforeEach(function () {
    options = {
      artifactFileNames: ['package.zip'],
      followUpBuildTypeIds: ['Testin_OtherTestin']
    };
    log = sinon.stub();
    process.env.TEAMCITY_BUILD_PROPERTIES_FILE = 'test/properties/build.properties';
    ci = info(options, log);
  });

  it('provides build-specific information', function () {
    expect(ci.original.build).to.be.ok();
  });

  it('provides the build number', function () {
    expect(ci.build.buildNumber).to.equal(7);
  });

  it('provides the build type id', function () {
    expect(ci.build.buildTypeId).to.be('Testin_Testin');
  });

  it('provides the build id', function () {
    expect(ci.build.buildId).to.equal(25436);
  });

  it('provides the build url', function () {
    expect(ci.build.buildUrl).to.be('http://server.local:9001/viewLog.html?buildId=25436');
  });

  it('provides an artifact url', function () {
    expect(ci.build.artifactUrls[0]).to.be('http://server.local:9001/repository/download/Testin_Testin/7/package.zip');
  });

  it('provides a follow up build url', function () {
    expect(ci.build.followUpBuildTypeUrls[0]).to.be('http://server.local:9001/viewType.html?buildTypeId=Testin_OtherTestin');
  });

  it('provides environment-specific information', function () {
    expect(ci.original.configuration).to.be.ok();
  });

  it('provides the server url', function () {
    expect(ci.server.url).to.be('http://server.local:9001');
  });

  it('provides runner-specific information', function () {
    expect(ci.original.runner).to.be.ok();
  });

});