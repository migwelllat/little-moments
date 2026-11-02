CRIZHEL'S BIRTHDAY QUIZ

GOOGLE SHEETS DATA
Each completed quiz adds ONE new row containing:
- Submission date (YYYY-MM-DD)
- Submission time (Philippines time, Asia/Manila)
- Her answer to every quiz question, in order
- Open-ended responses exactly as she submitted them (including blank optional answers)

The sheet has one column per question, so you can easily read all her answers side by side.

SETUP
1. Create a Google Sheet.
2. Extensions > Apps Script. Paste the included Code.gs and save.
3. In Apps Script, open Project Settings and set Time zone to Asia/Manila.
4. Deploy > New deployment > Web app.
5. Execute as: Me. Who has access: Anyone.
6. Deploy and authorize. Copy the Web app URL ending in /exec.
7. In index.html, replace PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE with that URL.
8. Host index.html online (GitHub Pages or Netlify).
9. Submit a test quiz yourself and check the sheet.

KEEP THE GOOGLE SHEET PRIVATE. The website submits answers to the Apps Script endpoint; it does not show or expose the spreadsheet to the visitor.

MUSIC
The website expects birthday-song.mp3 beside index.html. Music starts after she taps the opening button, because browsers require a user gesture.
