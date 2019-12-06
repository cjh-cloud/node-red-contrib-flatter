# node-red-contrib-flatter
A Node-RED module for flattening complex JSON objects and reconstructing them

This node uses the NPM package 'flat' to flatten a nested Javascript object in msg.payload,
or unflatten an object with delimited keys.

To install & uninstall 
```
$ cd ~/.node-red  
$ npm install /PATH/node-red-contrib-flatter  
$ npm uninstall node-red-contrib-flatter
$ node-red
```  

Unit Testing  
```
$ npm install --save-dev node-red-node-test-helper mocha node-red  
$ npm test
```  
