var _ = {};

#import 'library/tim.js'
#import 'library/json.js'
#import 'library/db.js'
#import 'library/functional.js'
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

var ui = {
  alert: function (msg, title) {
    title = title || '';
    var app = [NSApplication sharedApplication];
    [app displayDialog:msg withTitle:title];
  },
  createMenu: function (message, items, selectedItemIndex) {
    selectedItemIndex = selectedItemIndex || 0;

    var accessory = [[NSComboBox alloc] initWithFrame:NSMakeRect(0,0,200,25)];
    [accessory addItemsWithObjectValues:items];
    [accessory selectItemAtIndex:selectedItemIndex];

    var alert = [[NSAlert alloc] init];
    [alert setMessageText:message];
    [alert addButtonWithTitle:'OK'];
    [alert addButtonWithTitle:'Cancel'];
    [alert setAccessoryView:accessory];

    var responseCode = [alert runModal];
    var sel = [accessory indexOfSelectedItem];

    return [responseCode, sel];
  }
};
