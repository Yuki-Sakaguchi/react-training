import React from 'react'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'
  return (
    <li>
      <span>{note.label}</span>
      <p>{note.content}</p>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note