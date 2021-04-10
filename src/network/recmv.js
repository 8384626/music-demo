import http from './http'

export function getFirstMv(num=10){
  return http.get('/mv/first',{limit:num})
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

export function getTopMv(num=10){
  return http.get('/top/mv',{limit:num})
}


// 根据分类获取mv
const initData={
  area:'全部',
  type:'全部',
  order:'最新'
}
export function getCategoryAllMv(data=initData,limit){
  console.log(data,limit);
  return http.get('/mv/all',{...data,limit})
}