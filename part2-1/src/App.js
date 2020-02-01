import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')
  const [newLabel, setNewLabel] = useState('label')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')

  // 表示を絞るために事前にフィルターを通す
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const notesFilter = filter === ''
    ? notesToShow
    : notesToShow.filter(note => note.content.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1)

  // フィルターを通したリストを使う
  const rows = () => notesFilter.map(note => 
    <Note
      key={note.id}
      note={note}
    />
  )

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <input value={filter} onChange={handleFilterChange}/>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input value={newLabel} onChange={handleLabelChange} />
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App