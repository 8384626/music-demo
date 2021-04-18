import http from './http'

// 获取歌手列表
export function getSingerList(dataObj){
  return http.get('/artist/list',dataObj)
}

// 获取歌手描述
export function getSingerDesc(id){
  return http.get('/artist/desc',{id})
}

// 获取热门五十首歌曲
export function getSingerHot50(id){
  return http.get('/artist/top/song',{id})
}

// 获取歌手专辑
export function getSingerAlbum(id,limit=5){
  return http.get('/artist/album',{id,limit})
}

// 获取专辑
export function getAlbum(id){
  return http.get('/album',{id})
}

// 获取歌手MV
export function getSingerMv(id){
  return http.get('/artist/mv',{id})
}