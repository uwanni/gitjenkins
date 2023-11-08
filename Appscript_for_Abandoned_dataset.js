function splitItemsToNewRows() {
  var sourceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); // Replace "SourceSheet" with the name of your source sheet.
  var targetSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Abandoned_last_month(CLEANED)"); // Replace "TargetSheet" with the name you want for the new sheet.


  var sourceData = sourceSheet.getDataRange().getValues();
  var targetData = [];


  // Add the headers to the new sheet.
  var headers = sourceData[0];
  headers.splice(4, 0, "qty"); //4 means the ‘qty’ column will be created on 4th index(as the 5th column)
  targetData.push(headers);


  for (var i = 1; i < sourceData.length; i++) {
    var row = sourceData[i];
    var items = row[3].split(','); //Assuming the items are in the 3rd index (4th column)


    for (var j = 0; j < items.length; j++) {
      var newItem = items[j].trim(); // Remove leading/trailing spaces.
      var qtyMatch = newItem.match(/\(Qty:\s*(\d+)\)/); // Adjusted regular expression to capture the quantity.


      var quantity = qtyMatch ? qtyMatch[1] : ""; // Extract the quantity or use an empty string if not found.


      var newRow = row.slice(0, 3); // Copy the first three columns (id, mobile no, email).
      newRow.push(newItem.replace(/\(Qty:\s*\d+\)/, '').trim()); // Add the item name without quantity.
      newRow.push(quantity); // Add the quantity.
      newRow = newRow.concat(row.slice(4)); // Add all other columns after the "items" column.
      targetData.push(newRow);
    }
  }


  // Set the data (including headers) in the new sheet.
  targetSheet.getRange(1, 1, targetData.length, targetData[0].length).setValues(targetData);
}
