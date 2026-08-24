# Airline Reservation System

A full-stack MERN application for browsing flights, booking seats, and managing bookings — built to practice real-world full-stack development: REST API design, database modelling, React state management, and deployment.

**Live demo:** https://airline-reservation-elbetel.netlify.app
**Backend API:** https://airline-reservation-system-6z75.onrender.com

> Note: the backend is hosted on Render's free tier, which spins down after periods of inactivity. The first request after idle time may take 30–60 seconds to respond while it wakes up.

## Features

- Browse available flights with filtering by destination and sorting by price
- Book a flight through a multi-step form with a visual seat picker (row/seat selection)
- View and cancel existing bookings
- Multi-page navigation (Home, Book a Flight, My Bookings) via React Router
- Responsive, custom-designed UI — no component libraries, built with plain CSS

## Tech Stack

**Frontend:** React (Vite), React Router, plain CSS
**Backend:** Node.js, Express
**Database:** MongoDB Atlas, Mongoose
**Deployment:** Render (backend), Netlify (frontend)

## Architecture

```
Airline_sys/
├── index.js              # Express entry point
├── models/
│   ├── flight.js         # Flight schema
│   └── booking.js        # Booking schema (references Flight)
├── routes/
│   ├── flights.js        # GET, POST, DELETE /api/flights
│   └── bookings.js       # GET, POST, DELETE /api/bookings
└── client/                # React frontend
    └── src/
        ├── components/    # FlightList, BookingForm, BookingList, SeatPicker, Navbar
        └── pages/         # Home, Book, Bookings
```

The frontend and backend are deployed separately (Netlify and Render), communicating over a REST API with CORS enabled.

## Running Locally

**Backend:**
```bash
npm install
# create a .env file with your own MongoDB connection string:
# MONGO_URI=your_connection_string_here
node index.js
```

**Frontend:**
```bash
cd client
npm install
# create a .env file:
# VITE_API_URL=http://localhost:3000
npm run dev
```

## What I'd Build Next

- Server-side seat availability tracking (seats are currently a client-side visual only)
- Round-trip / multi-city booking logic (the UI toggle exists, not yet wired to booking data)
- User accounts and booking history per user

## Author

Elbetel Getu Mustefa — [GitHub](https://github.com/elbetelg) · [LinkedIn](https://linkedin.com/in/elbetelgetu)
