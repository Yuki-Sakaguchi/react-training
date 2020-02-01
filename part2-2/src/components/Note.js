import React from 'react'

const Note = ({ note }) => {
  return (
    <li>
      <span>{note.label}</span>
      <p>{note.content}</p>
    </li>
  )
}

export default Note