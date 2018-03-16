export default {
  // 유저 정보 업데이트
  updateInfo (state, {response}) {
    localStorage.setItem('token', response.token)

    const base64 = state.token.split('.')[1]
    const result = JSON.parse(window.atob(base64))

    localStorage.setItem('email', result.email)
    localStorage.setItem('nickname', response.user.nickname)
    localStorage.setItem('pk', result.user_id)
    localStorage.setItem('exp', result.exp)
    localStorage.setItem('orig', result.orig_iat)
  },
  // 유저 정보 삭제
  removeInfo () {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('nickname')
    localStorage.removeItem('pk')
    localStorage.removeItem('exp')
    localStorage.removeItem('orig')
  },
  // 서버 메시지 세팅
  setMessage (state, {message}) {
    state.message = message
  },
  // 서버 메시지 비움
  clearMessage (state) {
    state.message = null
  }
}
