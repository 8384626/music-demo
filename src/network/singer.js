import http from './http'

// 获取歌手列表
export function getSingerList(dataObj){
  return http.get('/artist/list',dataObj)
}

// 获取歌手描述
export function getSingerDesc(id){
  return http.get('/artist/desc',{id})
}