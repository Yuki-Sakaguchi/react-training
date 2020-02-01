import React, { useState, useEffect } from 'react'

import noteService from "./services/notes";
import Filter from './components/Filter'
import Form from './components/Form'

const App = () => {
  const [notes, setNotes] = useState([])
  
  // useEffectで使う処理
  const hook = () => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        console.log('promise fulfilled')
        setNotes(initialNotes) // サーバーからデータが取ってこれたら再レンダリング
      })
  }
  // レンダリングが終わった直後に呼ばれる
  useEffect(hook, []) // 第2引数は呼ばれる頻度。空の配列の場合は初回レンダリングのみ
  console.log('render', notes.length, 'notes')

  return (
    <div>
      <h1>Notes</h1>
      <Filter notes={notes} setNotes={setNotes} />
      <Form notes={notes} setNotes={setNotes} />
    </div>
  )
}

export default App