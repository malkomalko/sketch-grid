_.db = {};

_.db.get = function (key) {
  key = appName + key;
  var defaults = NSUserDefaults.standardUserDefaults();
  return defaults.objectForKey(key);
};

_.db.set = function (key, val) {
  key = appName + key;
  var defaults = NSUserDefaults.standardUserDefaults();
  defaults.setObject_forKey(val, key);
  defaults.synchronize();
};

_.db.del = function (key) {
  key = appName + key;
  var defaults = NSUserDefaults.standardUserDefaults();
  defaults.removeObjectForKey(key);
  defaults.synchronize();
};
