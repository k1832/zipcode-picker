const ZIPCODE_COLUMN = "C";
const PREFECTURE_COLUMN = "G";
const CITY_COLUMN = "H";
const DETAIL_COLUMN = "I";

function myFunction() {
}

function getRandomRowNum(ZIPCODE_SHEET) {
    const lastRow = ZIPCODE_SHEET.getLastRow();
    return Math.floor(Math.random() * lastRow) + 1;
}

function doGet() {
    const SPRSHEET = SpreadsheetApp.getActiveSpreadsheet();
    const ZIPCODE_SHEET = SPRSHEET.getSheetByName("zipcode");
    const NO_DETAIL_SUBSTR = "以下に掲載";

    const randomRow = getRandomRowNum(ZIPCODE_SHEET);

    const values = ZIPCODE_SHEET.getRange(`${ZIPCODE_COLUMN}${randomRow}:${DETAIL_COLUMN}${randomRow}`).getValues();
    const val_len = values[0].length;

    const zipcode = values[0][0];
    const prefecture = values[0][val_len - 3];
    const city = values[0][val_len - 2];
    let detail = values[0][val_len - 1];
    if (detail.includes(NO_DETAIL_SUBSTR)) {
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
