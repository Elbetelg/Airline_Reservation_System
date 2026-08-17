import { useState, useEffect } from 'react'
function FlightList() {
  const [flights, setFlights] = useState([])

  useEffect(() => {
    fetch('/api/flights')
      .then(res => res.json())
      .then(data => setFlights(data))
  }, [])

  return (
    <div>
      <h2>Available Flights</h2>
      {flights.map(flight => (
        <div key={flight._id}>
          <p>{flight.flightNumber} — {flight.origin} to {flight.destination}</p>
          <p>Departure: {new Date(flight.departureTime).toLocaleString('en-IE', { dateStyle: 'medium', timeStyle: 'short' })}</p>
          <p>Seats: {flight.availableSeats} | Price: €{flight.price}</p>
        </div>
      ))}
    </div>
  )
}

export default FlightList