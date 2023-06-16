const express = require('express');

const app = express();

app.set('view engine', 'ejs');

// Set up the middleware to parse request bodies
app.use(express.urlencoded({ extended: false }));

// Create an array to store records
const records = [];

// Route for the root URL
app.get('/', (req, res) => {
  res.render('form');
});

// Route to handle adding a new record
app.post('/add', (req, res) => {
  const { title, firstName, lastName } = req.body;
  const newRecord = { title, firstName, lastName };
  records.push(newRecord);
  res.redirect('/view');
});

// Route to view all records
app.get('/view', (req, res) => {
  res.render('view', { records });
});

// Route to filter records by title
app.get('/view/:title', (req, res) => {
  const { title } = req.params;
  const filteredRecords = records.filter(record => record.title === title);
  if (filteredRecords.length === 0) {
    res.send('Nothing found.');
  } else {
    res.send(filteredRecords);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
