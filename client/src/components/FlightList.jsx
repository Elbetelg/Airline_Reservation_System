import { useState, useEffect } from 'react'

function FlightList() {
  const [flights, setFlights] = useState([])
  const [destinationFilter, setDestinationFilter] = useState('')
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/flights`)
      .then(res => res.json())
      .then(data => setFlights(data))
  }, [])

  // Get a unique list of destinations from the flights we already have,
  // so the dropdown options always match real data — no hardcoding
  const destinations = [...new Set(flights.map(f => f.destination))]

  // Apply filter first, then sort — order matters here
  let visibleFlights = destinationFilter
    ? flights.filter(f => f.destination === destinationFilter)
    : flights

  if (sortBy === 'priceLowHigh') {
    visibleFlights = [...visibleFlights].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'priceHighLow') {
    visibleFlights = [...visibleFlights].sort((a, b) => b.price - a.price)
  }

  return (
    <div>
      <h2>Available Flights</h2>

      <div className="filter-bar">
        <select value={destinationFilter} onChange={(e) => setDestinationFilter(e.target.value)}>
          <option value="">All destinations</option>
          {destinations.map(dest => (
            <option key={dest} value={dest}>{dest}</option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Sort by</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
      </div>

      <div className="flight-grid">
        {visibleFlights.map(flight => (
          <div className="flight-card" key={flight._id}>
            <div className="flight-card-main">
              <div className="flight-route">
                <span className="flight-number">{flight.flightNumber}</span>
                <span className="flight-cities">{flight.origin} → {flight.destination}</span>
              </div>
              <p className="flight-time">
                Departs {new Date(flight.departureTime).toLocaleString('en-IE', { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
              <p className="flight-seats">{flight.availableSeats} seats left</p>
            </div>
            <div className="flight-card-stub">
              <span className="flight-price">€{flight.price}</span>
            </div>
          </div>
        ))}
      </div>

      {visibleFlights.length === 0 && <p className="no-results">No flights match that destination.</p>}
    </div>
  )
}

export default FlightList