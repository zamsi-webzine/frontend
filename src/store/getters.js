// 메시지 존재 여부 체크
export const checkoutMessage = state => state.message

// 주요 정보 불러오기
export const getInfo = state => {
  return {
    email: state.email,
    nickname: state.nickname
  }
}
