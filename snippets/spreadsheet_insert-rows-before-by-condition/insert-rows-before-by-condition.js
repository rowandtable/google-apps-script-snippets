/**
 * @file Insert empty rows before by a condition
 * {@link https://stackoverflow.com/a/54731582/1393023}
 */

/* exported userActionInsertRowsBefore */

function userActionInsertRowsBefore() {
  /** @type {conditionCallback} */
  var cb = function(row, i, values) {
    // Returns true if it's not the first row, it contains an asterks
    // and there is no an empty row before
    return values[i - 1] && /\*/.test(row[0]) && values[i - 1].join('') !== '';
  };
  var sheet = SpreadsheetApp.getActiveSheet();
  insertRowBeforeByCondition_(sheet, cb);
}

/**
 * Insert row before by a condition
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @param {conditionCallback} Decides insert or skip the row
 * @returns {GoogleApps Script.Spreadsheet.Sheet}
 */

function insertRowBeforeByCondition_(sheet, condition) {
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  for (var i = values.length - 1; i >= 0; i--) {
    if (condition(values[i], i, values)) sheet.insertRowBefore(i + 1);
  }
  return sheet;
}

/**
 * This callback is displayed as a global member.
 * @callback conditionCallback
 * @param {object[]} row Row data
 * @param {number} index Index of the row
 * @param {object[][]} values Sheet values
 * @returns {boolean}
 */
