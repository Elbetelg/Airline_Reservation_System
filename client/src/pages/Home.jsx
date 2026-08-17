import FlightList from '../components/FlightList'

function Home() {
  return (
    <div className="page">
    <h1>Airline Reservation System</h1>
    <p>Search and browse available flights, then book your seat.</p>
    <FlightList />
    </div>
  )
}

export default Home