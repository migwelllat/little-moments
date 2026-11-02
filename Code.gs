/**
 * CRIZHEL'S BIRTHDAY QUIZ — LIVE EVENT LOGGER
 *
 * Each answer attempt is appended immediately as a new row.
 * The same Session ID groups events belonging to one visitor's quiz.
 *
 * Deploy as Web app:
 * Execute as: Me
 * Who has access: Anyone
 */
const EVENT_SHEET_NAME = "Live Quiz Activity";
const TIME_ZONE = "Asia/Manila";

const EVENT_HEADERS = [
  "Date (Philippines)",
  "Time (Philippines)",
  "Session ID",
  "Sequence",
  "Event",
  "Question Number",
  "Question",
  "Selected Answer",
  "Correct?",
  "All Answers / Extra Data"
];

function doPost(e) {
  try {
    const event = JSON.parse(e.postData.contents || "{}");
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(EVENT_SHEET_NAME);

    if (!sheet) sheet = ss.insertSheet(EVENT_SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(EVENT_HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, EVENT_HEADERS.length)
        .setFontWeight("bold")
        .setWrap(true);
      sheet.setColumnWidths(1, EVENT_HEADERS.length, 190);
      sheet.setColumnWidth(1, 125);
      sheet.setColumnWidth(2, 170);
      sheet.setColumnWidth(7, 380);
      sheet.setColumnWidth(10, 420);
    }

    const when = event.submittedAt ? new Date(event.submittedAt) : new Date();
    const date = Utilities.formatDate(when, TIME_ZONE, "yyyy-MM-dd");
    const time = Utilities.formatDate(when, TIME_ZONE, "hh:mm:ss.SSS a");

    const extra = event.allAnswers ? JSON.stringify(event.allAnswers) : "";

    sheet.appendRow([
      date,
      time,
      event.sessionId || "",
      event.sequence || "",
      event.eventType || "unknown",
      event.questionNumber || "",
      event.question || "",
      event.answer || "",
      event.correct === "" || event.correct === undefined ? "" : event.correct,
      extra
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
