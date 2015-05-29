#build-server-info

```
var options = {
  artifactFileNames: ['package.zip'],
  followUpBuildTypeIds: ['Testin_OtherTestin']
};
var information = require('build-server-info')(options, console.log);
```