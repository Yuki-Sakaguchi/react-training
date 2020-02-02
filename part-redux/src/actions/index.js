/**
 * Action
 *    今から「stateをこのように変化させます」という情報を持っているオブジェクト
 *    typeに紐づく値を持っているのが特徴
 *    typeはユニークであること！
 */
export const TEXT_CHANGE = 'TEXT_CHANGE'

// ActionCreator関数
export const textChange = (textValue, textLength) => {
  return {
    type: TEXT_CHANGE,
    textValue,
    textLength
  }
}