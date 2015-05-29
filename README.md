[![Build Status](https://api.travis-ci.org/meilke/build-server-info.png)](https://travis-ci.org/meilke/build-server-info)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![NPM version](https://badge.fury.io/js/build-server-info.svg)](http://badge.fury.io/js/build-server-info)  
[![Code Climate](https://codeclimate.com/github/meilke/build-server-info/badges/gpa.svg)](https://codeclimate.com/github/meilke/build-server-info)
[![Test Coverage](https://codeclimate.com/github/meilke/build-server-info/badges/coverage.svg)](https://codeclimate.com/github/meilke/build-server-info/coverage)
[![Dependency Status](https://david-dm.org/meilke/build-server-info.svg)](https://david-dm.org/meilke/build-server-info)
[![devDependency Status](https://david-dm.org/meilke/build-server-info/dev-status.svg)](https://david-dm.org/meilke/build-server-info#info=devDependencies)  
[![forthebadge](http://forthebadge.com/images/badges/uses-badges.svg)](http://forthebadge.com)

#build-server-info

```
var options = {
  artifactFileNames: ['package.zip'],
  followUpBuildTypeIds: ['Testin_OtherTestin']
};
var information = require('build-server-info')(options, console.log);
```