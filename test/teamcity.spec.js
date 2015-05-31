var expect = require('expect.js'),
  info = require('../src'),
  sinon = require('sinon'),
  options,
  log,
  all,
  single;

describe('A picture-perfect Teamcity context', function () {

  beforeEach(function () {
    options = {
      artifactFileNames: ['package.zip'],
      followUpBuildTypeIds: ['Testin_OtherTestin']
    };
    log = { info: sinon.stub() };
    var env = { TEAMCITY_BUILD_PROPERTIES_FILE: 'test/properties/build.properties' };
    all = info(options, env, log);
    single = all[0];
  });

  it('provides only Teamcity build-specific information', function () {
    expect(all.length).to.be(1);
  });

  it('provides build-specific information', function () {
    expect(single.original.build).to.be.ok();
  });

  it('printed the Teamcity URL to the console', function () {
    expect(log.info.calledWith('Running inside Teamcity at http://server.local:9001...')).to.be.ok();
  });

  it('provides the build number', function () {
    expect(single.build.buildNumber).to.equal(7);
  });

  it('provides the build type id', function () {
    expect(single.build.buildTypeId).to.be('Testin_Testin');
  });

  it('provides the build id', function () {
    expect(single.build.buildId).to.equal(25436);
  });

  it('provides the build url', function () {
    expect(single.build.buildUrl).to.be('http://server.local:9001/viewLog.html?buildId=25436');
  });

  it('provides an artifact url', function () {
    expect(single.build.artifactUrls[0]).to.be('http://server.local:9001/repository/download/Testin_Testin/7/package.zip');
  });

  it('provides a follow up build url', function () {
    expect(single.build.followUpBuildTypeUrls[0]).to.be('http://server.local:9001/viewType.html?buildTypeId=Testin_OtherTestin');
  });

  it('provides environment-specific information', function () {
    expect(single.original.configuration).to.be.ok();
  });

  it('provides the server url', function () {
    expect(single.server.url).to.be('http://server.local:9001');
  });

  it('provides runner-specific information', function () {
    expect(single.original.runner).to.be.ok();
  });

});