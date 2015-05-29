var log,
  options,
  _ = require('lodash');

module.exports = function (_options_, _log_) {
  log = _log_;
  options = _options_;
  
  var ci = {};
  
  fillOriginal(ci);
  gatherServerSpecific(ci);
  gatherBuildSpecific(ci);
  
  return ci;
};

function readProperties(pathToPropertiesFile) {
  var fileContents = require('fs').readFileSync(pathToPropertiesFile, 'utf-8');
  return require('properties').parse(fileContents);
}

function getProperties(possiblePathToPropertiesFile) {
  if (possiblePathToPropertiesFile && possiblePathToPropertiesFile !== '') {
    return readProperties(possiblePathToPropertiesFile);
  }

  return undefined;
}

function get(object, key) {
  if (key in object) {
    return object[key];
  }

  return undefined;
}

function fillOriginal (ci) {
  var original = {};
  
  original.build = getProperties(process.env.TEAMCITY_BUILD_PROPERTIES_FILE);
  if (original.build) {
    original.configuration = getProperties(get(original.build, 'teamcity.configuration.properties.file'));
    original.runner = getProperties(get(original.build, 'teamcity.runner.properties.file'));
  }
  
  ci.original = original;
}

function gatherBuildSpecific(ci) {
  var build = {};
  
  build.buildNumber = get(ci.original.build, 'build.number');
  build.buildTypeId = get(ci.original.build, 'teamcity.buildType.id');
  build.buildId = get(ci.original.build, 'teamcity.build.id');
  build.buildUrl = ci.server.url + '/viewLog.html?buildId=' + build.buildId;

  build.artifactUrls = _.map(options.artifactFileNames, function (artifactFileName) {
    return ci.server.url + '/repository/download/' + build.buildTypeId + '/' + build.buildNumber + '/' + artifactFileName;
  });

  build.followUpBuildTypeUrls = _.map(options.followUpBuildTypeIds, function (followUpBuildTypeId) {
    return ci.server.url + '/viewType.html?buildTypeId=' + followUpBuildTypeId;
  });

  ci.build = build;
}

function gatherServerSpecific(ci) {
  var server = {};
  server.url = get(ci.original.configuration, 'teamcity.serverUrl');
  ci.server = server;
}