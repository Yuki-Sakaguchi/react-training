import React, { useState } from 'react'
import noteService from '../services/notes';

const Form = ({ notes, setNotes, setErrorMessage }) => {
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
      id: notes.length + 1,
      content: newNote,
      data: new Date().toISOString(),
      important: Math.random() > 0.5,
      label: newLabel
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
        setNewLabel('')
      })
      .catch(error => {
        setErrorMessage(`登録に失敗しました`)
        setTimeout(() => setErrorMessage(null), 5000)
        noteService
          .getAll()
          .then(initialNotes => {
            console.log('promise fulfilled')
            setNotes(initialNotes) // サーバーからデータが取ってこれたら再レンダリング
          })
          .catch(error => {
            setErrorMessage(`取得できませんでした。`)
            setTimeout(() => setErrorMessage(null), 5000)
            setNotes([])
          })
      })
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