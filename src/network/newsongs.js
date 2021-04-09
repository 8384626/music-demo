import http from './http'

export function getSongsId(id){
  return http.get('/top/song',{type:id})
}