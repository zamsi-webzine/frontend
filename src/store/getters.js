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
export const getAuthorPostList = state => state.postList

// 유저 글 디테일 가져오기
export const getAuthorPostRetrieve = state => state.postDetail

// 유저 글 quill JSON 객체 가져오기
export const getAuthorQuillObject = state => state.postDetail.post

// 유저 글 썸네일 가져오기
export const getAuthorThumbnail = state => state.postDetail.author.thumbnail

// 유저 글 생성 날짜 가져오기
export const getPostCreatedTime = state => {
  const date = new Date(state.postDetail.date_created)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 글 카테고리 가져오기
export const callCategory = state => {
  const categoryObject = {
    'R': 'Re-View',
    'E': 'Enter-View',
    'O': 'Over-View'
  }
  return categoryObject[state.postDetail.category]
}
