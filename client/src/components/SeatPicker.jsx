import { useMemo } from 'react'

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F']
const SEATS_PER_ROW = 6 // 3 + aisle + 3, like a real narrow-body layout

function SeatPicker({ flightId, selectedSeat, onSelect }) {
  // Regenerate "taken" seats only when the flight changes — not on every render,
  // otherwise seats would randomly shuffle every time you click one
  const takenSeats = useMemo(() => {
    const taken = new Set()
    const allSeats = ROWS.flatMap(row =>
      Array.from({ length: SEATS_PER_ROW }, (_, i) => `${row}${i + 1}`)
    )
    // Randomly mark ~25% of seats as taken, for a realistic-looking map
    allSeats.forEach(seat => {
      if (Math.random() < 0.25) taken.add(seat)
    })
    return taken
  }, [flightId])

  if (!flightId) return null // don't show a seat map until a flight is picked

  return (
    <div className="seat-picker">
      <p className="seat-picker-label">Select your seat</p>
      <div className="seat-map">
        {ROWS.map(row => (
          <div className="seat-row" key={row}>
            {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
              const seatId = `${row}${i + 1}`
              const isTaken = takenSeats.has(seatId)
              const isSelected = selectedSeat === seatId

              return (
                <button
                  key={seatId}
                  type="button"
                  disabled={isTaken}
                  className={`seat ${isTaken ? 'taken' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelect(seatId)}
                >
                  {seatId}
                </button>
              )
            })}
          </div>
        ))}
      </div>
      <div className="seat-legend">
        <span><span className="legend-dot available"></span> Available</span>
        <span><span className="legend-dot selected"></span> Selected</span>
        <span><span className="legend-dot taken"></span> Taken</span>
      </div>
    </div>
  )
}

export default SeatPicker