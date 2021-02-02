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
        <tr>
          <td>Good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>All</td>
          <td>{good + neutral + bad}</td>
        </tr>
        <tr>
          <td>Average</td>
          <td>{(good * 1 + bad * -1) / (good + neutral + bad)}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{(good / (good + neutral + bad) * 100)} %</td>
        </tr>
       </tbody>
      </table>
  </div>
  )
}

const StatisticsLine = (props) => {
  return (
    <div>{props.text} {props.value}</div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
