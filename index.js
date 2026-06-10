// Import the Express framework
const express = require('express');

// Create an instance of an Express application
const app = express();

// Middleware: allows the server to understand JSON in request bodies
app.use(express.json());

// Basic test route - when someone visits the root URL, send a message back
app.get('/', (req, res) => {
    res.send('Airline API is running');
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});