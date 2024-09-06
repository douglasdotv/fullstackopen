import { useState } from 'react'

const Statistics = ({ goodCount, neutralCount, badCount }) => {
  const total = goodCount + neutralCount + badCount
  const averageScore = total ? (goodCount - badCount) / total : 0
  const positiveFeedbackPercentage = total ? (goodCount / total) * 100 : 0

  return (
    <div>
      <p>Good: {goodCount}</p>
      <p>Neutral: {neutralCount}</p>
      <p>Bad: {badCount}</p>
      <p>All: {total}</p>
      <p>Average score: {averageScore}</p>
      <p>Positive feedback percentage: {positiveFeedbackPercentage}%</p>
    </div>
  )
}

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
      <Statistics
        goodCount={goodCount}
        neutralCount={neutralCount}
        setBadCount={badCount}
      />
    </div>
  )
}

export default App
