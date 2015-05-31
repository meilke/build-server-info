var _ = require('lodash');

function detect(buildServer) {
  return buildServer.detect();
}

function gather(buildServer) {
  return buildServer.gather();
}

function printInformation(log, buildServers) {
  log.info();
  log.info('--------------');
  _.map(buildServers, function (buildServer) {
    log.info(buildServer.information());
  });
  log.info('--------------');
  log.info();
}

module.exports = function (options, env, log) {
  var environment = require('./environment.js')(options, env || process.env, log || console);

  var buildServers = [
    require('./teamcity.js')(environment),
    require('./jenkins.js')(environment)
  ];
  var detectedBuildServers = _.filter(buildServers, detect);
  var buildInformation = _.map(detectedBuildServers, gather);
  printInformation(environment.log, detectedBuildServers);
  return buildInformation;
};