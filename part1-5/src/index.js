import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const random = (min, max) => Math.floor(Math.random() * (max - min) + min)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [point, setPoint] = useState(new Array(anecdotes.length).fill(0))

  const handleClick = () => {
    let r;
    do {
      r = random(0, props.anecdotes.length)
    } while (r === selected)
    setSelected(r)
  }

  const vote = () => {
    const copy = [...point]
    copy[selected] += 1
    setPoint(copy)
  }

  return (
    <div>
      <p>{ selected + 1 } ) { props.anecdotes[selected] }</p>
      <button onClick={ () => vote() }>vote</button>
      <button onClick={ () => handleClick() }>next anecdote</button>
      <p>{ point.join(' ') }</p>
    </div>
  )
}

ReactDOM.render(<App anecdotes={ anecdotes }/>, document.getElementById('root'));