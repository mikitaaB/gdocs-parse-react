# gdocs-parse-react

The application finds variables in a pre-prepared document - Google Docs, finds the values of these variables in a table - Google Sheets and uploads the completed document to Word.
In order to upload documents, you need to insert valid links into the input fields and press the "Upload" button or press Enter.

#### Variable Description:

The single variable `{sheet-column-row}` - points to a cell in Google Sheets.

The range of variable `{sheet-column1-row1-column2-row2}` indicates a range of variables, where column1-row1 is the start cell of the range, column2-row2 is the end cell of the range.

### How to setup

1. Install node.js: https://nodejs.org/en/ (LTS)
2. Install all dependencies:
   `yarn`

### How to run

To run the app in **development** mode:

```
yarn dev
```

The app will be available at http://localhost:5173.

To run the app in **production** mode:

```
yarn build
yarn preview
```

The app will be available at http://localhost:4173/gdocs-parse-react.
