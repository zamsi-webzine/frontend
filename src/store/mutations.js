// 유저 정보 업데이트
export const updateInfo = (state, response) => {
  const base64 = response.token.split('.')[1]
  const result = JSON.parse(window.atob(base64))

  localStorage.setItem('token', response.token)

  localStorage.setItem('pk', result.user_id)
  localStorage.setItem('email', result.email)
  localStorage.setItem('nickname', response.user.nickname)
  localStorage.setItem('orig', result.orig_iat)
  localStorage.setItem('exp', result.exp)

  state.pk = result.user_id
  state.email = result.email
  state.nickname = response.user.nickname
  state.orig = result.orig_iat
  state.exp = result.exp
}
// 유저 정보 삭제
export const removeInfo = state => {
  localStorage.removeItem('token')

  localStorage.removeItem('pk')
  localStorage.removeItem('email')
  localStorage.removeItem('nickname')
  localStorage.removeItem('orig')
  localStorage.removeItem('exp')

  state.pk = localStorage.getItem('pk')
  state.email = localStorage.getItem('email')
  state.nickname = localStorage.getItem('nickname')
  state.orig = localStorage.getItem('orig')
  state.exp = localStorage.getItem('exp')
}

// 서버 메시지 세팅
export const setMessage = (state, message) => {
  state.message = message
}
// 서버 메시지 비움
export const clearMessage = state => {
  state.message = null
}
