var path = require('path');

var args = process.argv;
var root = require(path.resolve(args[2]));

root.cemerick.cljs.node.runner.apply(null, args.slice(3))
