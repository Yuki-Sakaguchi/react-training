import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>
  }

  const sum = () => good + neutral + bad
  const average = () => (good + neutral + bad) / 3
  const positive = () => good / (good + neutral + bad) * 100
  
  return (
    <div>
      <h1>statistics</h1>
      <Statistic text='good' value={ good } />
      <Statistic text='neutral' value={ neutral } />
      <Statistic text='bad' value={ bad } />
      <Statistic text='all' value={ sum() } />
      <Statistic text='average' value={ average() } />
      <Statistic text='positive' value={ positive()+'%' } />
    </div>
  )
}

const Statistic = ({ text, value }) => <p>{ text } { value }</p>

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={ () => setGood(good + 1) }>good</button>
      <button onClick={ () => setNeutral(neutral + 1) }>neutral</button>
      <button onClick={ () => setBad(bad + 1) }>bag</button>
      <Statistics good={ good } neutral={ neutral } bad={ bad } />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
