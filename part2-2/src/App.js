import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Form from './components/Form'

const App = () => {
  const [notes, setNotes] = useState([])
  
  // useEffectで使う処理
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data) // サーバーからデータが取ってこれたら再レンダリング
      })
  }
  // レンダリングが終わった直後に呼ばれる
  useEffect(hook, []) // 第2引数は呼ばれる頻度。空の配列の場合は初回レンダリングのみ
  console.log('render', notes.length, 'notes')

  return (
    <div>
      <h1>Notes</h1>
      <Filter notes={notes} />
      <Form notes={notes} setNotes={setNotes} />
    </div>
  )
}

export default App