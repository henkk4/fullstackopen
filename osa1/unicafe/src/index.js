import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback!</h1>
      <Button function={() => setGood(good + 1)} name="Good" />
      <Button function={() => setNeutral(neutral + 1)} name="Neutral" />
      <Button function={() => setBad(bad + 1)} name="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.function}>
      {props.name}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good + bad + neutral === 0) {
    return (
      <div>
        <h2>Statistics:</h2>
        <p>No Feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Statistics:</h2>
      <table>
       <tbody>
         <StatisticsLine text="Good" value={good} />
         <StatisticsLine text="Neutral" value={neutral} />
         <StatisticsLine text="Bad" value={bad} />
         <StatisticsLine text="All" value={good + neutral + bad} />
         <StatisticsLine text="Average" value={(good * 1 + bad * -1) / (good + neutral + bad)} />
         <StatisticsLine text="Positive" value={(good / (good + neutral + bad) * 100) + " %"} />
       </tbody>
      </table>
  </div>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text} </td>
      <td>{props.value}</td>
    </tr>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
