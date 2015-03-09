function alertWindow(msg, title, canCancel, accessoryViews) {
  title = title || '';
  accessoryViews = accessoryViews || [];

  var modal = COSAlertWindow.new();
  var icon = NSImage.alloc().initByReferencingFile(
    pluginPath + '/assets/icon.png');

  modal.setMessageText(title);
  modal.setInformativeText(msg);
  modal.setIcon(icon);

  if (canCancel) {
    modal.addButtonWithTitle('Continue');
    modal.addButtonWithTitle('Cancel');
  } else {
    modal.addButtonWithTitle('OK')
  }

  accessoryViews.forEach(function (v) {
    modal.addAccessoryView(v);
  });

  return modal
};

function valueAtIndex(view, index) {
  return view.viewAtIndex(index).stringValue()
};

ui.alert = function (msg, title) {
  var modal = alertWindow(msg, title);

  return modal.runModal();
};

ui.createMenu = function (message, items, selectedItemIndex) {
  selectedItemIndex = selectedItemIndex || 0;

  var accessory = [[NSComboBox alloc] initWithFrame:NSMakeRect(0,0,200,25)];
  [accessory addItemsWithObjectValues:items];
  [accessory selectItemAtIndex:selectedItemIndex];

  var modal = alertWindow(message, '', true, [accessory]);
  var responseCode = modal.runModal();
  var sel = [accessory indexOfSelectedItem];
  return [responseCode == 1000, sel];
};

ui.createTextField = function (message, title, initial) {
  initial = initial || '';

  var accessory = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 250, 150));
  accessory.setFont(NSFont.fontWithName_size('Monaco', 12));
  accessory.enablesReturnKeyAutomatically = false;
  accessory.stringValue = initial;

  var modal = alertWindow(message, title, true, [accessory]);
  var responseCode = modal.runModal();
  return [responseCode == 1000, valueAtIndex(modal, 0)];
};
