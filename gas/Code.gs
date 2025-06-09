let SPRSHEET = null;
let ZIPCODE_SHEET = null;
let PARAM_SHEET = null;

const NO_DETAIL_TXT_RANGE = "B2";
const ZIPCODE_COLUMN = "C";
const PREFECTURE_COLUMN = "G";
const CITY_COLUMN = "H";
const DETAIL_COLUMN = "I";


function myFunction() {
}

function assignSPRSHEET() {
    if (SPRSHEET) return;
    SPRSHEET = SpreadsheetApp.getActiveSpreadsheet();
}

function assignZipcodeSheet() {
    if (ZIPCODE_SHEET) return;

    assignSPRSHEET();
    ZIPCODE_SHEET = SPRSHEET.getSheetByName("zipcode");
}

function assignParamSheet() {
    if (PARAM_SHEET) return;

    assignSPRSHEET();
    PARAM_SHEET = SPRSHEET.getSheetByName("params");
}

function getRandomRowNum() {
    assignZipcodeSheet();

    const lastRow = ZIPCODE_SHEET.getLastRow();
    return Math.floor(Math.random() * lastRow) + 1;
}

function doGet() {
    const randomRow = getRandomRowNum();

    assignZipcodeSheet();
    assignParamSheet();

    const zipcode = ZIPCODE_SHEET.getRange(`${ZIPCODE_COLUMN}${randomRow}`).getValue();
    const prefecture = ZIPCODE_SHEET.getRange(`${PREFECTURE_COLUMN}${randomRow}`).getValue();
    const city = ZIPCODE_SHEET.getRange(`${CITY_COLUMN}${randomRow}`).getValue();
    const detail = ZIPCODE_SHEET.getRange(`${DETAIL_COLUMN}${randomRow}`).getValue();

    const noDetailTxt = PARAM_SHEET.getRange(NO_DETAIL_TXT_RANGE).getValue();
    if (detail === noDetailTxt) {
        detail = "";
    }

    json = JSON.stringify({
        zipcode: zipcode,
        prefecture: prefecture,
        city: city,
        detail: detail
    });
    return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
