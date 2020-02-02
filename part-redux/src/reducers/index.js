/**
 * Reducer
 *    reducerを一つにまとめる
 */

import { combineReducers } from 'redux'
import text from './text'

export default combineReducers({ text })

//複数のreducerを持った場合
//combineReducers({text, foo, baz});