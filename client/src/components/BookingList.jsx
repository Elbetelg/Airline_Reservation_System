import {useState, useEffect} from 'react'
function BookingList() {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        fetch('/api/bookings')
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [])

    const handleDelete = async (id) => {
        const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
        if (res.ok) {
            setBookings(bookings.filter(booking => booking._id !== id))
        } else {
            console.error('Failed to delete booking')
        }
    }

    return (
        <div className="booking-grid">
            <h2>My Bookings</h2>
            {bookings.map(booking => (
                <div className="booking-card" key={booking._id}>
                   <div>
                     <p><strong>{booking.flightId?.flightNumber}</strong> — {booking.flightId?.origin} to {booking.flightId?.destination}</p>
                     <p>{booking.passengerName} · {booking.passengerEmail} · {booking.passengerPhone}</p>
                     <p>Seat {booking.seatNumber} · Booked {new Date(booking.bookingDate).toLocaleDateString()}</p>
                   </div>
                   <button onClick={() => handleDelete(booking._id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default BookingList