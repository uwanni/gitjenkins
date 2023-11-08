function splitItemsToNewRows() {
  var sourceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("orders - 2023-10-30T082435.344.csv"); 
// Replace "orders - 2023-10-30T082435.344.csv" with the name of your source sheet.
  var targetSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("TargetSheet"); // Replace "TargetSheet" with the name you want for the new sheet.


  var sourceData = sourceSheet.getDataRange().getValues();
  var targetData = [];


  // Add the headers to the new sheet.
  var headers = sourceData[0];
  headers.splice(4, 0, "qty"); //4 means the ‘qty’ column will be created on 4th index(as the 5th column)
  headers.splice(35, 0, "vendor_acc"); //35 means the ‘vendor_acc’ column will be created on 35th index(as the 36th column)


  targetData.push(headers);


  for (var i = 1; i < sourceData.length; i++) {
    var row = sourceData[i];
    var items = row[3].split(', '); //Assuming the items are in the 3rd index (4th column)


    for (var j = 0; j < items.length; j++) {
      var newItem = items[j].trim(); // Remove leading/trailing spaces.
      var qtyMatch = newItem.match(/\(Qty:\s*(\d+)\)/); // Adjusted regular expression to capture the quantity.


      var quantity = qtyMatch ? qtyMatch[1] : ""; // Extract the quantity or use an empty string if not found.


      var vendorInfo = row[33].split(' * '); //Assuming the vendors are in the 33rd index (34th column)
      var vendor = vendorInfo[0].trim();
      var account = vendorInfo[1] ? vendorInfo[1].trim() : ""; // Extract the "account" or use an empty string if not found.


      var newRow = row.slice(0, 3); // Copy the first three columns (id, borrower, email).
      newRow.push(newItem.replace(/\(Qty:\s*\d+\)/, '').trim()); // Add the item name without quantity.
      newRow.push(quantity); // Add the quantity.
      newRow = newRow.concat(row.slice(4, 33)); // Add all other columns after the "items" column and before "vendor."
      newRow.push(vendor); // Add the vendor.
      newRow.push(account); // Add the account.
      newRow = newRow.concat(row.slice(34)); // Add all other columns after "account."
      targetData.push(newRow);
    }
  }


  // Set the data (including headers) in the new sheet.
  targetSheet.getRange(1, 1, targetData.length, targetData[0].length).setValues(targetData);
}
