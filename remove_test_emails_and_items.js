function filterEmailsAndItems() {
  var sourceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("orders - 2023-10-30T082435.344.csv");
  var targetSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("FilteredSheet"); // Create a new sheet to store the filtered data.


  var sourceData = sourceSheet.getDataRange().getValues();
  var targetData = [];


  var emailFilterVals = ["test", "ilabtest", "incubate", "cloudofgoods", "aloka"];
  var itemFilterVals = ["Test item"]


  for (var i = 0; i < sourceData.length; i++) {
    var row = sourceData[i];
    var emailValue = row[2]; // Assuming the "email" column is in the 3rd column.
    var itemValue = row[3]; // Assuming the "items" column is in the 3rd column.
    // Check if any of the emailFilterVals are present in the email
    var emailFilter = false;
    for (var j = 0; j < emailFilterVals.length; j++) {
      if (emailValue.indexOf(emailFilterVals[j]) !== -1) {
        emailFilter = true;
        break;
      }
    }
    // Check if any of the itemFilterVals are present in the items
    var itemFilter = false;
    for (var j = 0; j < itemFilterVals.length; j++) {
      if (itemValue.indexOf(itemFilterVals[j]) !== -1) {
        itemFilter = true;
        break;
      }
    }
    if (!emailFilter || !itemFilter) {
      targetData.push(row); // Add the row to the filtered data if it doesn't contain any of the filtered emails or items.
    }
  }
  // Set the data in the new sheet (excluding the rows to be filtered).
  targetSheet.getRange(1, 1, targetData.length, targetData[0].length).setValues(targetData);
}
