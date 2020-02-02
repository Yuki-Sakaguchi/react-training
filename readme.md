# Reactでアプリを作るための実践的な勉強メモ
https://fullstackopen.com/en/about/

## Reactでは、状態を直接変更することは禁止されている
予期しない副作用が発生する可能性があるためです。  
状態を変更するには、常に状態を新しいオブジェクトに設定する必要があります。  
前の状態オブジェクトのプロパティを単純にコピーしたい場合は、それらのプロパティを新しいオブジェクトにコピーすることでこれを行う必要があります。  

## フックを使うルール
ループ、条件式、コンポーネント内の関数（別スコープ）などで使ってはいけない(常に同じ順序で実行されなくてはいけない)  
つまり、Reactコンポーネントの関数本体の内部からのみ呼び出す事ができるということ  

### useState
初期値を設定すると配列を返す。  
アプリケーションが持つステータスはこれを使って管理する。  
配列の１つ目の値は値自体。配列の２つ目の値は値を変更するための値。

### useEffect
レンダリング直後に呼ばれる関数。  
ajaxなどでデータを取ってくるときに使う。  
第１引数には実行する処理。第２引数には実行する頻度。  
何も設定をしなければレンダリングごとに毎回呼ばれる。空の配列を渡した場合は初回レンダリング時のみ実行される。

## コンポーネント内のコンポーネントを定義してはいけない
以下はNG

```js
const App = (params) => {
  const Display = () => <div>TITLE</div>
  return (
    <Display />
  )
}
```

## liをループするときはkey属性をつける
map関数のindex（第２引数）は非推奨で、データの持つ一意の値を使う（idなど）

## クラス名はclassNameで指定する
インラインもかけるが、擬似要素では使えない。  

## 推測するな、測定しろ
勘でやるのではなくconsole.logとかでちゃんと確認しながらエラーを解決する方が早い

## expressのミドルウェア
`app.use()` はセットした順番で処理が動く  
ルーティングの前に動かしたい処理は上の方に、何も起きなかった時の処理を一番下に書いておけばいい感じ。 

## クロスドメインからアクセスできるようにするために"CORS"を使う
```
npm i -S cors
```

## Redux
https://qiita.com/micropig3402/items/ca6f14f92d6238a0aade

- Action
- ActionCreator
- Store
- State
- Reducer

からなる状態管理のフレームワーク

### Action
「何をする」を定義したオブジェクト  
typeプロパティを持つこと

### ActionCreator
Actionを作成するメソッド  

### Store
アプリケーションの状態を保持している場所  
アプリケーションに１つだけ存在し、１つのstateを保持している  

### State
Storeに保存されている状態自体のこと  

### Reducer
Stateを変更するためのメソッド  
actionとstateから、新しいstateを作成して返します  
ポイントは、引数のstateを更新することはせず、新しいstateのオブジェクトを作成して返します  
reducerのメソッドは副作用を起こさないpureな関数でなければならず、Aというstateに対して毎回必ずBというstateを返すような関数でなければなりません。

## Reduxの流れ
https://qiita.com/kitagawamac/items/49a1f03445b19cf407b7

1. ユーザーの入力
2. ActionCreatorがActionオブジェクトを作成
3. StoreへActionオブジェクトをdispatchする
4. dispatchされたactionとstateがReducerに渡される
5. Reducerが新しいstateを作成し、Storeに返す
6. StoreのStateが更新される

### ユーザーの入力からアクションを作成する
ActionCreator関数により、UIの状態を元にActionオブジェクトを作成する  
```
{
  type: 'ADD_TODO',
  text: 'add todo context'
}
```

### storeへActionをdispatchする
ActionCreatorで作られたActionオブジェクトをStoreに送る  
Storeのインスタンスにdispatchを実行する事で変更が伝わる
```
dispatch(addTodo(text))
```

### dispatchされたactionとstateをReducerへ渡す
Storeは、Storeを作成する際にStateを変更するためのメソッドであるReducerを一つ登録します。  
Storeはdispatchされると、引数のactionと現在保持しているStateをReducerへ渡し、新しいStateを作成します。  

### Reducerが作成した新しいstateをstoreが保存する
Reducerによって新しいStateが作成されるので、Storeは現在のStateに代わり保持します

## Reduxの第３原則
1. Single source of truth
アプリケーション内でStoreは1つのみとし、Stateは単独のオブジェクトとしてStoreに保持される。

2. State is read-only
Stateを直接変更することはできず、actionをStoreへdispatchすることでしかStateは変更できない。

3. Mutations are written as pure functions
Stateを変更する関数(Reducer)はpureな関数にする。

## Reduxの実装は決まったものがなさそう
原則さえ守っていれば実装はそれぞれでいいみたい。  
逆に言えばよく使うもののわりに各自で実装しないといけないっぽい...  

## Router
```
react-router-dom
```
を使えばいいらしい  
記述自体は簡単だったけど、Reduxと併用するときは注意が必要そう
https://qiita.com/muijp/items/b4ca1773580317e7112e

---

# 勉強すること
今Reactでアプリケーションを作ろうとしたら何がベストプラクティスなのか...  
`create-react-app`なのか`next`なのか...  
[これ](https://ja.reactjs.org/docs/create-a-new-react-app.html)によると

> - React を学習中か、新しいシングルページアプリケーションを作成したい場合、Create React App を利用してください
> - Node.js でサーバサイドでレンダーされたウェブサイトを構築するなら、Next.js を試してください
> - 静的なコンテンツ中心のウェブサイトを構築するなら、Gatsby を試してください
> - コンポーネントライブラリの構築や既存のコードベースへの統合をするなら、その他の柔軟なツールチェインを試してください

- SSRならNext.js
- CSRでよければcreate-react-app

- スタイルはどうするのか（scss）
  - css in js が良いっぽい？（next.jsがそうっぽい）
  - [MATERIAL-UI](https://material-ui.com/)
  - [React Bootstrap](https://react-bootstrap.github.io/)
- Redux
  - propsのバケツリレーをやめるためのツール
- Router
- Firebaseとの連携
  - DB
  - ログイン
  - ホスティング
- ReactNative