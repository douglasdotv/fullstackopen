import { useState } from 'react'

const App = () => {
  const [goodCount, setGoodCount] = useState(0)
  const [neutralCount, setNeutralCount] = useState(0)
  const [badCount, setBadCount] = useState(0)

  const handleGoodClick = () => setGoodCount((prevGood) => prevGood + 1)
  const handleNeutralClick = () =>
    setNeutralCount((prevNeutral) => prevNeutral + 1)
  const handleBadClick = () => setBadCount((prevBad) => prevBad + 1)

  return (
    <div>
      <h2>Feedback</h2>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>

      <h2>Statistics</h2>
      <p>Good: {goodCount}</p>
      <p>Neutral: {neutralCount}</p>
      <p>Bad: {badCount}</p>
    </div>
  )
}

export default App
