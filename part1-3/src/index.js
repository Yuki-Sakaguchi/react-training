import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// 普通に書いたらこんな感じ
// const App = () => {
//   const [ left, setLeft ] = useState(0)
//   const [ right, setRight ] = useState(0)
//   return (
//     <div>
//       <div>
//         { left }
//         <button onClick={ () => setLeft(left + 1) }>left</button>
//         <button onClick={ () => setRight(right + 1) }>right</button>
//         { right }
//       </div>
//     </div>
//   )
// }


// Reactでは、状態を直接変更することは禁止されています。
// 予期しない副作用が発生する可能性があるためです。
// 状態を変更するには、常に状態を新しいオブジェクトに設定する必要があります。
// 前の状態オブジェクトのプロパティを単純にコピーしたい場合は、それらのプロパティを新しいオブジェクトにコピーすることでこれを行う必要があります。

// ステータスをオブジェクトにして再描画の関数を一つにまとめる
// const App = (props) => {
//   const [clicks, setClicks] = useState({
//     left: 0,
//     right: 0
//   })

//   const handleLeftClick = () => {
//     const newClicks = {
//       left: clicks.left + 1,
//       right: clicks.right
//     }
//     setClicks(newClicks)
//   }

//   const handleRightClick = () => {
//     const newClicks = {
//       left: clicks.left,
//       right: clicks.right + 1
//     }
//     setClicks(newClicks)
//   }

//   return (
//     <div>
//       <div>
//         { clicks.left }
//         <button onClick={ handleLeftClick }>left</button>
//         <button onClick={ handleRightClick }>right</button>
//         { clicks.right }
//       </div>
//     </div>
//   )
// }

// const App = (props) => {
//   const [clicks, setClicks] = useState({
//     left: 0,
//     right: 0
//   })

//   const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 })
//   const handleRightClick = () => setClicks({ ...clicks, right: clicks.right + 1 })

//   return (
//     <div>
//       <div>
//         { clicks.left }
//         <button onClick={ handleLeftClick }>left</button>
//         <button onClick={ handleRightClick }>right</button>
//         { clicks.right }
//       </div>
//     </div>
//   )
// }

// const App = () => {
//   const [ left, setLeft ] = useState(0)
//   const [ right, setRight ] = useState(0)
//   const [ allClicks, setAll ] = useState([])

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     setLeft(left + 1)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     setRight(right + 1)
//   }

//   return (
//     <div>
//       <div>
//         { left }
//         <button onClick={ handleLeftClick }>left</button>
//         <button onClick={ handleRightClick }>right</button>
//         { right }
//         <p>{ allClicks.join(' ') }</p>
//       </div>
//     </div>
//   )
// }

// 条件付きレンダリング
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: { props.allClicks.join(' ') }
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={ onClick }>{ text }</button>

const App = (props) => {
  const [ left, setLeft ] = useState(0)
  const [ right, setRight ] = useState(0)
  const [ allClicks, setAll ] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }
  
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      { left }
      <Button onClick={ handleLeftClick } text="LEFT" />
      <Button onClick={ handleRightClick } text="RIGHT" />
      { right }
      <History allClicks={ allClicks }/>
    </div>
  )
}


// フックを使うルール
//    - ループ、条件式、コンポーネント内の関数（別スコープ）などで使ってはいけない
//    - ↑ 常に同じ順序で実行されなくてはいけない
//    - つまり、Reactコンポーネントの関数本体の内部からのみ呼び出す事ができるということ


// コンポーネント内のコンポーネントを定義してはいけない
// 以下はNG
// const App = (params) => {
//   const Display = () => <div>TITLE</div>
//   return (
//     <Display />
//   )
// }
 
ReactDOM.render(<App />, document.getElementById('root'))
