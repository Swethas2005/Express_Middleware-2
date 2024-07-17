const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Setup the logger
app.use(morgan(':method :status :res[content-length] - :response-time ms :date[clf] HTTP/:http-version :url', { stream: accessLogStream }));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

app.get('/get-users', (req, res) => {
  res.status(200).send('List of users');
});

app.post('/add-user', (req, res) => {
  res.status(201).send('User added successfully');
});

app.put('/user/:id', (req, res) => {
  const { id } = req.params;
  res.status(201).send(`User with ID ${id} updated successfully`);
});

app.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  res.send(`User with ID ${id} deleted successfully`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
