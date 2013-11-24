// reusable phantomjs script for running clojurescript.test tests
// see http://github.com/cemerick/clojurescript.test for more info

var p = require('webpage').create();
var fs = require('fs');
var sys = require('system');
for (var i = 1; i < sys.args.length; i++) {
    if (fs.exists(sys.args[i])) {
        if (!p.injectJs(sys.args[i])) throw new Error("Failed to inject " + sys.args[i]);
    } else {
        p.evaluateJavaScript("(function () { " + sys.args[i] + ";" + " })");
    }
}

p.onConsoleMessage = function (x) {
  console.log(x.toString());
};

p.evaluate(function () {
  cemerick.cljs.test.enable_console_print_BANG_();
});

var success = p.evaluate(function () {
  var results = cemerick.cljs.test.run_all_tests();
  console.log(results);
  return cemerick.cljs.test.successful_QMARK_(results);
});

phantom.exit(success ? 0 : 1);

