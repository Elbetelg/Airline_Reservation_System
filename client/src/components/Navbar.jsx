import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/book">Book a Flight</Link>
      <Link to="/bookings">My Bookings</Link>
    </nav>
  )
}

export default Navbar