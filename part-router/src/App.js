import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// BrowserRouterコンポーネント内で囲ったRouteコンポーネントに
// ページごとのコンポーネントを指定する
// リンクはLinkコンポーネントで指定できる

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/friends">Friends</Link></li>
        </ul>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route exact path="/friends" component={Friends} />
        <Route path="/friends/:id" component={Friend} />
      </div>
    </BrowserRouter>
  )
}

// http://localhost:3000/ 
// URLが "/" なので[exact]属性をつける
// こうしないと前方一致なので、全てのページで表示されてしまう
const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <p>welcome!</p>
    </div>
  )
}

// http://localhost:3000/about
const About = () => {
  return (
    <div>
      <h2>About</h2>
      <p>フレンズに投票するページです</p>
    </div>
  )
}

// http://localhost:3000/friends
const Friends = () => {
  return (
    <div>
      <h2>Friends</h2>
      <ul>
        {FRIEND_LIST.map(friend => 
          <li key={friend.id}>
            <Link to={`/friends/${friend.id}`}>{friend.nameJa}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

const Friend = (props) => {
  // match.params.idの中に、<Friends>内で<Friend>にアクセスするときのpathの
  // /friends/:idの[:id]の部分の文字列が入っています
  const { id } = props.match.params
  const friend = friendById(id)

  if (typeof friend === 'undefined') {
    return <div>not find</div>
  }

  return (
    <div>
      <h2>{friend.nameJa}</h2>
      <div>{friend.family}</div>
    </div>
  )
}

const FRIEND_LIST = [
  {
    id: 'serval',
    nameJa: 'サーバル',
    nameEn: 'Serval Cat',
    family: 'ネコ目ネコ科ネコ属'
  },
  {
    id: 'raccoon',
    nameJa: 'アライグマ',
    nameEn: 'Common raccoon',
    family: 'ネコ目アライグマ科アライグマ属'
  },
  {
    id: 'fennec',
    nameJa: 'フェネック',
    nameEn: 'Fennec',
    family: 'ネコ目イヌ科キツネ属'
  }
]

// idと一致する友達リストを取得する関数
const friendById = id => FRIEND_LIST.find(friend => friend.id === id)

export default App