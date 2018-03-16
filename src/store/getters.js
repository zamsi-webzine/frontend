export const getters = {
  // 메시지 존재 여부 체크
  checkoutMsg: state => state.message,
  // 주요 정보 불러오기
  getInfo: state => {
    return {
      email: state.email,
      nickname: state.nickname
    }
  }
}
