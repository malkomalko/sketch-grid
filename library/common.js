var _ = {};
var ui = {};

#import 'library/tim.js'
#import 'library/json.js'
#import 'library/db.js'
#import 'library/functional.js'
#import 'library/ui.js'
#import 'library/classes.js'

var noop = function () {};

_.logMethods = function (obj, methodName) {
  var mocha = obj.mocha ? obj.mocha() : obj.class().mocha();
  log(mocha.name() + ' ' + methodName);

  var methods = _.map(mocha[methodName](), function (method) {
    if (method.selector) {
      return method.selector();
    } else {
      return method.name();
    }
  }).sort();
  log(methods.join(", "));
};

var console = {
  dir: function (obj) {
    if (!obj.mocha && !obj.class) return log(obj);

    log(obj.treeAsDictionary());
    _.logMethods(obj, 'classMethodsWithAncestors');
    _.logMethods(obj, 'instanceMethodsWithAncestors');
    _.logMethods(obj, 'propertiesWithAncestors');
    _.logMethods(obj, 'protocolsWithAncestors');
  },
  log: function (msg) {
    log(msg);
  }
};
