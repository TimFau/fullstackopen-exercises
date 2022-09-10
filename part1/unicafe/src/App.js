import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick} >{props.text}</button>

const StatisticsLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  let totalNumber = props.good - props.bad
  let totalSubmissions = props.good + props.neutral + props.bad
  return (
    <>
      <h1>statistics</h1>
      {totalSubmissions > 0 ?
      <table className="statistics-container">
        <tbody>
          <StatisticsLine text="good" value={props.good}/>
          <StatisticsLine text="neutral" value={props.neutral}/>
          <StatisticsLine text="bad" value={props.bad}/>
          <StatisticsLine text="all" value={totalSubmissions}/>
          <StatisticsLine text="average" value={totalNumber / totalSubmissions}/>
          <StatisticsLine text="positive" value={(props.good / totalSubmissions) * 100 + ' %'}/>
        </tbody>
      </table>
      : 'No feedback given' }
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div className="buttons-container">
        <Button text="good" handleClick={() => setGood(good + 1)} />
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" handleClick={() => setBad(bad + 1)} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App