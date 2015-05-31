var _ = require('lodash');

module.exports = function (options, env, log) {
  var logUsed = log || console;
  var buildServers = [
    require('./teamcity.js')(options, env || process.env, logUsed),
    require('./jenkins.js')(options, env || process.env, logUsed)
  ];
  var detectedBuildServers = _.filter(buildServers, detect);
  var buildInformation = _.map(detectedBuildServers, gather);
  printInformation(logUsed, detectedBuildServers);
  return buildInformation;
};

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