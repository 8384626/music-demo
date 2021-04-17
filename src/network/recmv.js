import http from './http'

export function getFirstMv(num=10){
  return http.get('/mv/first',{limit:num})
}

export function getTopMv(num=10){
  return http.get('/top/mv',{limit:num})
}

export function getCategoryAllMv(data=initData,limit){
  return http.get('/mv/all',{...data,limit})
}

// 获取单个Mv的详细数据
export function getMvDetail(id){
  return http.get('/mv/detail',{mvid:id})
}

// 获取Mv的URL地址
export function getMvUrl(id){
  return http.get('/mv/url',{id})
}

// 获取MV的评论信息
export function getMvComment(id,limit){
  return http.get('/comment/mv',{id,limit})
}

// 获取相似mv
export function getSimiMv(id){
  return http.get('/simi/mv',{mvid:id})
}


export class MV{
  constructor(id,cover,name,artist,count){
      this.id=id;
      this.cover=cover;
      this.name=name;
      this.artist=artist;
      this.count=count;
  }
}

// 根据分类获取mv
const initData={
  area:'全部',
  type:'全部',
  order:'最新'
}