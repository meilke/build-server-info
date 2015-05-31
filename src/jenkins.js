var environment,
  info;

function detect() {
  return !!environment.env.JENKINS_URL;
}

function information() {
  return 'Running inside Jenkins at ' + environment.env.JENKINS_URL + '...';
}

function gatherServerSpecific() {
  var server = {};
  server.url = environment.env.JENKINS_URL;
  info.server = server;
}

function gatherBuildSpecific() {
  var build = {};

  build.buildNumber = parseInt(environment.env.BUILD_NUMBER, 10);
  build.buildUrl = environment.env.BUILD_URL;

  info.build = build;
}

function gather() {
  info = {};
  gatherServerSpecific();
  gatherBuildSpecific();
  return info;
}

module.exports = function (_environment_) {
  environment = _environment_;
  return {
    detect: detect,
    information: information,
    gather: gather
  };
};