import React from 'react'

// stateとactionをComponentに結びつけるためにconnect関数をimport
import { connect } from 'react-redux'
import { textChange } from '../actions';

const App = (props) => {
  console.log(props);
  return (
    <div>
      <div>文字数： {props.textLength}</div>
      <textarea onChange={ e => props.textChange(e.target.value, e.target.value.length) }></textarea>
    </div>
  )
}

// mapStateToPropsはstateからComponentに必要な情報を抜き出して、propsとしてマッピングする機能を持つ関数です。
// 引数にはstateを取って、どういうオブジェクトをpropsとして対応させるのかといったことを返します。
const mapStateToProps = state => {
  return {
    textValue: state.text.textValue,
    textLength: state.text.textLength
  }
}

// あるactionが発生した時にreducerにtypeに応じた状態遷移を実行させるための関数がdispatchになります。

const mapDispatchToProps = dispatch => {
  return {
    textChange (textValue, textLength) {
      dispatch(textChange(textValue, textLength))
    }
  }
}

// Componentの名前であるAppを引数にとり、mapStateToPropsとmapDispatchToPropsに結びつけます。
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
