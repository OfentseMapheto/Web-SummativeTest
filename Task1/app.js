const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:abcd/registrations', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema for the record
const recordSchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ['mr', 'ms', 'mrs', 'dr', 'sir'],
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// Create a model for the record
const Record = mongoose.model('Record', recordSchema);
const app = express();
app.use(express.json());

// Add a new record to the database
app.post('/add', async (req, res) => {
  try {
    const record = new Record(req.body);
    await record.save();
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
});

// View all records in the database
app.get('/view', async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Delete a record by ID
app.delete('/delete/:id', async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Add a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

const port = abcd;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

