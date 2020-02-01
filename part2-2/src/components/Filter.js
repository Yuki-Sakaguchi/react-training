import React, { useState } from 'react'
import Note from './Note'

const Filter = ({ notes }) => {
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  // 表示を絞るために事前にフィルターを通す
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const notesFilter = filter === ''
    ? notesToShow
    : notesToShow.filter(note => note.content.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1)

  // フィルターを通したリストを使う
  const rows = () => notesFilter.map(note => 
    <Note
      key={note.id}
      note={note}
    />
  )

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <div>
        <input value={filter} onChange={handleFilterChange}/>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default Filter