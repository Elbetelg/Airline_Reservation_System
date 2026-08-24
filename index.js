// Load environment variables from .env file
require('dotenv').config();

// Import the Express and Mongoose framework
const express = require('express');
const mongoose = require('mongoose');   
const cors = require('cors')
const flightRoutes = require('./routes/flights');
const bookingRoutes = require('./routes/bookings');


// Create an instance of an Express application
const app = express();

app.use(cors())

// Middleware: allows the server to understand JSON in request bodies
app.use(express.json());

// Use the flight routes for any requests to /flights
app.use('/api/flights', flightRoutes);

// Use the booking routes for any requests to /bookings
app.use('/api/bookings', bookingRoutes);

// Connect to MongoDB Atlas using the connection string from .env
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    family: 4
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Basic test route - when someone visits the root URL, send a message back
app.get('/', (req, res) => {
    res.send('Airline API is running');
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});