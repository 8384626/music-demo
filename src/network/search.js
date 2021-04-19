import http from './http'

// 搜索歌曲
export function getSearch(keywords){
  return http.get('/search',{keywords,limit:50})
}