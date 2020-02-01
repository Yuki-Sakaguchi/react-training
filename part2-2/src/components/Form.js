import React, { useState } from 'react'

const Form = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState('a new note...')
  const [newLabel, setNewLabel] = useState('label')

  // ノートの追加
  const addNote = (event) => {
    event.preventDefault()

    if (notes.some(item => item.content === newNote)) {
      alert('同じテキストは登録できません。')
      return false
    }

    const noteObject = {
      content: newNote,
      data: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
      label: newLabel
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
    setNewLabel('')
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleLabelChange = (event) => {
    setNewLabel(event.target.value)
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input value={newLabel} onChange={handleLabelChange} />
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default Form