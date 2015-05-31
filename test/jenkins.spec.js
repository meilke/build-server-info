var expect = require('expect.js'),
  info = require('../src'),
  sinon = require('sinon'),
  options,
  log,
  all,
  single;

describe('A picture-perfect Jenkins context', function () {

  beforeEach(function () {
    options = {};
    log = { info: sinon.stub() };
    var env = {
      JENKINS_URL: 'http://jenkins.local',
      BUILD_NUMBER: '44',
      BUILD_URL: 'http://jenkins.local/path/to/build'
    };
    all = info(options, env, log);
    single = all[0];
  });

  it('provides only Jenkins build-specific information', function () {
    expect(all.length).to.be(1);
  });

  it('printed the Jenkins URL to the console', function () {
    expect(log.info.calledWith('Running inside Jenkins at http://jenkins.local...')).to.be.ok();
  });

  it('provides the build number', function () {
    expect(single.build.buildNumber).to.equal(44);
  });

  it('provides the build url', function () {
    expect(single.build.buildUrl).to.be('http://jenkins.local/path/to/build');
  });

});