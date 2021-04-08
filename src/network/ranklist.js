import http from './http'
import { formatDate } from "../common/tool";

// 获取所有榜单
export function getAllMusicList(){
  return http.get('/toplist')
}
// 获取歌单名字
export function getMusicName(id){
  return http.get('/playlist/detail',id)
}
// 获取歌单详细信息
export function getMusicDetail(data){
  return http.get('/song/detail',{ids:data})
}

export class musicDetail{
  constructor(songs){
      this.id=songs[0].id;
      this.name=songs[0].name;
      this.album=songs[0].al.name;
      this.song=songs[0].ar[0].name;
      this.pic=songs[0].al.picUrl;
      this.time=formatDate(new Date(songs[0].dt),'mm:ss')
  }
}