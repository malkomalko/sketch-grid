ui.alert = function (msg, title) {
  title = title || '';
  var app = [NSApplication sharedApplication];
  [app displayDialog:msg withTitle:title];
};

ui.createMenu = function (message, items, selectedItemIndex) {
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
};
