import React, { useState } from 'react'
import Note from './Note'

import noteService from "../services/notes";

const Filter = ({ notes, setNotes, setErrorMessage }) => {
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  // 表示を絞るために事前にフィルターを通す
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const notesFilter = filter === ''
    ? notesToShow
    : notesToShow.filter(note => note.content.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1)

  // importantを切り替える処理
  // 新しいオブジェクトを作ってpusメソッドで対象idのデータをごそっと置き換える
  // DBを書き換えて返ってきた値でフロントと制御する
  const toggleImportance = id => {
    const note = notes.find(n => n.id === id)
    const changeNote = { ...note, important: !note.important }
    
    noteService
      .update(id, changeNote)
      .then(returnedNote => {
        // 対象のnote以外は元のノートで置き換える（変更なし）
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(`the note ${note.content} was already deleted from server`)
        setTimeout(() => setErrorMessage(null), 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // フィルターを通したリストを使う
  const rows = () => notesFilter.map(note => 
    <Note
      key={note.id}
      note={note}
      toggleImportance={() => toggleImportance(note.id)}
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