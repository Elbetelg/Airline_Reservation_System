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
        <div>
            <h2>My Bookings</h2>
            {bookings.map(booking => (
                <div key={booking._id}>
                    <p>Flight: {booking.flightId.flightNumber}</p>
                    <p>Passenger: {booking.passengerName} | Email: {booking.passengerEmail} | Phone: {booking.passengerPhone}</p>
                    <p>Seat: {booking.seatNumber} | BookingDate: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                    <button onClick={() => handleDelete(booking._id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default BookingList