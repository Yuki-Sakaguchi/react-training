/**
 * Reducer
 *    Actionが発生した時にそのActionに組み込まれているtypeに応じて
 *    状態をどう変化させるのかを定義したもの
 */
import { TEXT_CHANGE } from '../actions'

const initialState = { textLength: 0, textValue: 'initial value' }

export default (state = initialState, action) => {
  switch (action.type) {
    case TEXT_CHANGE:
      return { textValue: action.textValue, textLength: action.textLength }
    default:
      return state
  }
};
