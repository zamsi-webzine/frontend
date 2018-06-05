// 유저 정보 업데이트
export const updateInfo = (state, response) => {
  const base64 = response.token.split('.')[1]
  const result = JSON.parse(window.atob(base64))

  localStorage.setItem('token', String(response.token))

  localStorage.setItem('pk', result.user_id)
  localStorage.setItem('email', result.email)
  localStorage.setItem('nickname', response.user.nickname)
  localStorage.setItem('thumbnail', response.user.thumbnail)
  localStorage.setItem('orig', result.orig_iat)
  localStorage.setItem('exp', result.exp)
}
// 유저 정보 삭제
export const removeInfo = () => {
  localStorage.removeItem('token')

  localStorage.removeItem('pk')
  localStorage.removeItem('email')
  localStorage.removeItem('nickname')
  localStorage.removeItem('thumbnail')
  localStorage.removeItem('orig')
  localStorage.removeItem('exp')
}

// 유저 글 목록 업데이트
export const updatePostList = (state, payload) => {
  state.postList = payload
}

// 유저 글 목록 삭제
export const clearPostList = state => {
  state.postList = {
    count: '',
    next: '',
    previous: '',
    results: ''
  }
}

// 유저 글 디테일 삭제
export const clearPostDetail = state => {
  state.postDetail = {
    pk: '',
    author: '',
    title: '',
    post: '',
    date_created: '',
    is_published: ''
  }
}

// 유저 글 디테일 업데이트
export const updatePostDetail = (state, payload) => {
  state.postDetail = payload
}

// 서버 메시지 세팅
export const setMessage = (state, message) => {
  state.message = message
}
// 서버 메시지 비움
export const clearMessage = state => {
  state.message = null
}
