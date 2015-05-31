var log,
  options,
  env,
  info;

function detect() {
  return !!env.JENKINS_URL;
}

function information() {
  return 'Running inside Jenkins at ' + env.JENKINS_URL + '...';
}

function gatherServerSpecific() {
  var server = {};
  server.url = env.JENKINS_URL;
  info.server = server;
}

function gatherBuildSpecific() {
  var build = {};

  build.buildNumber = parseInt(env.BUILD_NUMBER, 10);
  build.buildUrl = env.BUILD_URL;

  info.build = build;
}

function gather() {
  info = {};
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