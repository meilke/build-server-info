[![Build Status](https://api.travis-ci.org/meilke/build-server-info.png)](https://travis-ci.org/meilke/build-server-info)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![NPM version](https://badge.fury.io/js/build-server-info.svg)](http://badge.fury.io/js/build-server-info)  
[![Code Climate](https://codeclimate.com/github/meilke/build-server-info/badges/gpa.svg)](https://codeclimate.com/github/meilke/build-server-info)
[![Test Coverage](https://codeclimate.com/github/meilke/build-server-info/badges/coverage.svg)](https://codeclimate.com/github/meilke/build-server-info/coverage)
[![Dependency Status](https://david-dm.org/meilke/build-server-info.svg)](https://david-dm.org/meilke/build-server-info)
[![devDependency Status](https://david-dm.org/meilke/build-server-info/dev-status.svg)](https://david-dm.org/meilke/build-server-info#info=devDependencies)  
[![forthebadge](http://forthebadge.com/images/badges/uses-badges.svg)](http://forthebadge.com)

#build-server-info

Provides you with information from a possible build server context.

```
var options = {
  artifactFileNames: ['package.zip'],
  followUpBuildTypeIds: ['Testin_OtherTestin']
};

// default environment and logging:
// - process.env
// - console.log
var information = require('build-server-info')(options);

// custom environment and logging
var information = require('build-server-info')(options, myEnv, myLog);
```

## Teamcity

Inside Teamcity you get the follwoing information:

```
{
  original: {
    build: {
      'agent.home.dir': 'D:\\Buildserver\\TeamCity\\buildAgent',
      'agent.name': 'agent-01',
      'agent.ownPort': 9090,
      'agent.work.dir': 'D:\\Buildserver\\TeamCity\\buildAgent\\work',
      'build.number': 7,
      'build.vcs.number': '96709885ead1f058e17021bfeb63007ddaac55fa',
      'build.vcs.number.1': '96709885ead1f058e17021bfeb63007ddaac55fa',
      'build.vcs.number.VCS_1': '96709885ead1f058e17021bfeb63007ddaac55fa',
      'java.io.tmpdir': 'D:\\Buildserver\\TeamCity\\buildAgent\\temp\\buildTmp',
      'teamcity.agent.cpuBenchmark': 445,
      'teamcity.agent.dotnet.agent_url': 'http://localhost:9090/RPC2',
      'teamcity.agent.dotnet.build_id': 25436,
      'teamcity.auth.password': 'Vkt0qBA00urueM0xld6rdyhBBUZUJ10W',
      'teamcity.auth.userId': 'TeamCityBuildId=25436',
      'teamcity.build.changedFiles.file': 'D:\\Buildserver\\TeamCity\\buildAgent\\temp\\buildTmp\\changedFiles3766772510270639203.txt',
      // more stuff
    },
    configuration: {
      'build.counter': 7,
      'build.number': 7,
      'build.vcs.number': '96709885ead1f058e17021bfeb63007ddaac55fa',
      'build.vcs.number.1': '96709885ead1f058e17021bfeb63007ddaac55fa',
      'build.vcs.number.VCS_1': '96709885ead1f058e17021bfeb63007ddaac55fa',
      build_number_to_deploy: '-',
    },
    runner: {
      'agent.ownPort': 9090,
      'artefacts.paths': null,
      'dotNetCoverage.dotCover.home.path': 'D:\\Buildserver\\TeamCity\\buildAgent\\tools\\dotCover',
      'script.content': 'grunt mochaTest',
      'teamcity.access.code': 'Vkt0qBA00urueM0xld6rdyhBBUZUJ10W',
      'teamcity.build.checkoutDir': 'D:\\Buildserver\\TeamCity\\buildAgent\\work\\df4ec89e0cbb670f',
      'teamcity.build.id': 25436,
      'teamcity.build.workingDir': 'D:\\Buildserver\\TeamCity\\buildAgent\\work\\df4ec89e0cbb670f\\build',
      'teamcity.checkout.on.agent': true,
      'teamcity.checkout.on.server': false,
      'teamcity.clean.build': false,
      'teamcity.execution.timeout': 0,
      'teamcity.fail.exit.code': true,
      'teamcity.is.personal': false,
      'teamcity.run.type': 'simpleRunner',
      'teamcity.step.mode': 'default',
      'use.custom.script': true
    }
  },
  server: {
    url: 'http://server.local:9001'
  },
  build: {
    buildNumber: 7,
    buildTypeId: 'Testin_Testin',
    buildId: 25436,
    buildUrl: 'http://server.local:9001/viewLog.html?buildId=25436',
    artifactUrls: [ 'http://server.local:9001/repository/download/Testin_Testin/7/package.zip' ],
    followUpBuildTypeUrls: [ 'http://server.local:9001/viewType.html?buildTypeId=Testin_OtherTestin' ]
  }
}
```

## Jenkins

Inside Jenkins you get the follwoing information:

```
{
  server: {
    url: 'http://jenkins.local'
  },
  build: {
    buildNumber: 44,
    buildUrl: 'http://jenkins.local/path/to/build'
  }
}
```