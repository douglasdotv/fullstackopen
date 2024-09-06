import { useState } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => (
  <p>
    {text}: {value}
  </p>
)

const Statistics = ({ goodCount, neutralCount, badCount }) => {
  const total = goodCount + neutralCount + badCount
  const averageScore = total ? (goodCount - badCount) / total : 0
  const positiveFeedbackPercentage = total ? (goodCount / total) * 100 : 0

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text="Good" value={goodCount} />
      <StatisticLine text="Neutral" value={neutralCount} />
      <StatisticLine text="Bad" value={badCount} />
      <StatisticLine text="All" value={total} />
      <StatisticLine text="Average score" value={averageScore} />
      <StatisticLine
        text="Positive feedback percentage"
        value={`${positiveFeedbackPercentage} %`}
      />
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
      <Button text="Good" onClick={handleGoodClick} />
      <Button text="Neutral" onClick={handleNeutralClick} />
      <Button text="Bad" onClick={handleBadClick} />

      <h2>Statistics</h2>
      <Statistics
        goodCount={goodCount}
        neutralCount={neutralCount}
        badCount={badCount}
      />
    </div>
  )
}

export default App
