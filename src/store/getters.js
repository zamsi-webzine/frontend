// 메시지 존재 여부 체크
export const checkoutMsg = state => state.message

// 유저 정보 가져오기
export const getInfo = state => {
  return {
    email: localStorage.getItem('email'),
    nickname: state.nickname
  }
}
