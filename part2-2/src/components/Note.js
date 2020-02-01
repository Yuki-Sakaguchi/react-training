import React from 'react'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  const cardStyle = {
    padding: '20px',
    border: '1px solid gray',
    listStyle: 'none',
    margin: '20px auto'
  }

  return (
    <li className="note" style={cardStyle}>
      <span>{note.label}</span>
      <p>{note.content}</p>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note