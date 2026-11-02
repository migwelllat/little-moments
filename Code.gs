/**
 * Crizhel's Birthday Quiz — Google Sheets receiver
 *
 * SETUP:
 * 1. Open your Google Sheet.
 * 2. Extensions > Apps Script.
 * 3. Replace the editor contents with this entire file and Save.
 * 4. Project Settings > Time zone > (GMT+08:00) Philippines / Asia/Manila.
 * 5. Deploy > New deployment > Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 6. Deploy, authorize, then copy the Web app URL ending in /exec.
 * 7. Paste that URL into SHEETS_WEB_APP_URL in index.html.
 *
 * Keep the spreadsheet itself private. This script only appends submitted answers.
 */
const SHEET_NAME = "Birthday Quiz Responses";
const TIME_ZONE = "Asia/Manila";

const HEADERS = [
  "Submission Date",
  "Submission Time (Philippines)",
  "What's your favorite flower?",
  "Is my girlfriend pretty?",
  "Is Miguel a yearner?",
  "What's Miguel's reaction when he receives a photo of his girl?",
  "What's babyy's love language?",
  "What's something you've always wanted to experience?",
  "What's one thing you're looking forward to this year?",
  "What day is it today?",
  "Is there anything you'd like to tell Miguel?"
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight("bold")
        .setWrap(true);
      sheet.setColumnWidths(1, HEADERS.length, 190);
      sheet.setColumnWidth(1, 125);
      sheet.setColumnWidth(2, 170);
    }

    // Use the browser's submission timestamp, displayed in Philippines time.
    const submittedAt = payload.submittedAt
      ? new Date(payload.submittedAt)
      : new Date();

    const date = Utilities.formatDate(submittedAt, TIME_ZONE, "yyyy-MM-dd");
    const time = Utilities.formatDate(submittedAt, TIME_ZONE, "hh:mm:ss a");

    const answers = Array.isArray(payload.answers) ? payload.answers : [];
    const answerByIndex = Array.from({ length: 9 }, (_, i) => {
      const item = answers[i];
      if (!item || item.answer === undefined || item.answer === null) return "";
      return String(item.answer);
    });

    // One row per completed quiz: date, time, then every answer in quiz order.
    sheet.appendRow([date, time, ...answerByIndex]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
