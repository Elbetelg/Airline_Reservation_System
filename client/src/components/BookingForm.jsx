import { useState, useEffect } from 'react'
import SeatPicker from './SeatPicker'

function BookingForm() {
  const [flights, setFlights] = useState([])       // for the dropdown
  const [formData, setFormData] = useState({
    flightId: '',
    passengerName: '',
    passengerEmail: '',
    passengerPhone: '',
    seatNumber: ''
  })
  const [message, setMessage] = useState('')        // success/error feedback

  // Fetch flights once, on mount, to populate the dropdown
  useEffect(() => {
    fetch('/api/flights')
      .then(res => res.json())
      .then(data => setFlights(data))
  }, [])

   const [tripType, setTripType] = useState('oneway')

  // Updates formData whenever any input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Sends the form data to the backend as a new booking
  const handleSubmit = async (e) => {
    e.preventDefault() // stops the page from refreshing on submit

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      setMessage('Booking created!')
      setFormData({ flightId: '', passengerName: '', passengerEmail: '', passengerPhone: '', seatNumber: '' })
    } else {
      setMessage('Something went wrong — check the fields and try again.')
    }
  }

  return (
    <div>
      <h2>Book a Flight</h2>
        <div className="trip-toggle">
          <button type="button" className={tripType === 'return' ? 'active' : ''} onClick={() => setTripType('return')}>Return</button>
          <button type="button" className={tripType === 'oneway' ? 'active' : ''} onClick={() => setTripType('oneway')}>One way</button>
          <button type="button" className={tripType === 'multicity' ? 'active' : ''} onClick={() => setTripType('multicity')}>Multi-city</button>
        </div>
      <form onSubmit={handleSubmit}>
        <select name="flightId" value={formData.flightId} onChange={handleChange} required>
          <option value="">Select a flight</option>
          {flights.map(flight => (
            <option key={flight._id} value={flight._id}>
              {flight.flightNumber} — {flight.origin} to {flight.destination}
            </option>
          ))}
        </select>

        <input name="passengerName" placeholder="Full name" value={formData.passengerName} onChange={handleChange} required />
        <input name="passengerEmail" type="email" placeholder="Email" value={formData.passengerEmail} onChange={handleChange} required />
        <input name="passengerPhone" placeholder="Phone" value={formData.passengerPhone} onChange={handleChange} required />
        <SeatPicker
          flightId={formData.flightId}
          selectedSeat={formData.seatNumber}
          onSelect={(seat) => setFormData({ ...formData, seatNumber: seat })}
        />
        <button type="submit">Book Now</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default BookingForm