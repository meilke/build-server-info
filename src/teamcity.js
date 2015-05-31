var log,
  options,
  env,
  info,
  _ = require('lodash');

function detect() {
  return !!env.TEAMCITY_BUILD_PROPERTIES_FILE;
}

function information() {
  return 'Running inside Teamcity at ' + info.server.url + '...';
}

/*jslint stupid: true */
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
  if (object[key]) {
    return object[key];
  }

  return undefined;
}

function fillOriginal() {
  var original = {};

  original.build = getProperties(env.TEAMCITY_BUILD_PROPERTIES_FILE);
  if (original.build) {
    original.configuration = getProperties(get(original.build, 'teamcity.configuration.properties.file'));
    original.runner = getProperties(get(original.build, 'teamcity.runner.properties.file'));
  }

  info.original = original;
}

function gatherBuildSpecific() {
  var build = {};

  build.buildNumber = get(info.original.build, 'build.number');
  build.buildTypeId = get(info.original.build, 'teamcity.buildType.id');
  build.buildId = get(info.original.build, 'teamcity.build.id');
  build.buildUrl = info.server.url + '/viewLog.html?buildId=' + build.buildId;

  build.artifactUrls = _.map(options.artifactFileNames, function (artifactFileName) {
    return info.server.url + '/repository/download/' + build.buildTypeId + '/' + build.buildNumber + '/' + artifactFileName;
  });

  build.followUpBuildTypeUrls = _.map(options.followUpBuildTypeIds, function (followUpBuildTypeId) {
    return info.server.url + '/viewType.html?buildTypeId=' + followUpBuildTypeId;
  });

  info.build = build;
}

function gatherServerSpecific() {
  var server = {};
  server.url = get(info.original.configuration, 'teamcity.serverUrl');
  info.server = server;
}

function gather() {
  info = {};

  fillOriginal();
  gatherServerSpecific();
  gatherBuildSpecific();

  return info;
}

module.exports = function (_options_, _env_, _log_) {
  log = _log_;
  env = _env_;
  options = _options_;

  return {
    detect: detect,
    information: information,
    gather: gather
  };
};