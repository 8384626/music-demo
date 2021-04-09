import http from './http'

export function getSingerList(dataObj){
  return http.get('/artist/list',dataObj)
}