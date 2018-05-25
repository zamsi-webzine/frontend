// 메시지 존재 여부 체크
export const checkoutMsg = state => state.message

// 유저 정보 가져오기
export const getInfo = () => {
  return {
    email: localStorage.getItem('email'),
    nickname: localStorage.getItem('nickname'),
    thumbnail: localStorage.getItem('thumbnail')
  }
}

// 유저 글 목록 가져오기
export const getUserPostList = state => state.posts.results
