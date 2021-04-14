import http from './http'
import {formatDate} from '../common/tool'
// 获取歌单详细动态
export function getMusicDetail(id){
  return http.get('/playlist/detail/dynamic',id)
}

// 获取歌单详情
export function getMusicDetailList(idData){
  return http.get('/playlist/detail',{id:idData})
}

// 获取歌曲详情
export function getSongDetail(idData){
  return http.get('/song/detail',{ids:idData})
}

// 获取留言的列表
export function getCommentList(id,limit=20){
  return http.get('/comment/playlist',{id,limit})
}
// 添加评论
export function addComment(cookie,id,content,time){
  return http.get('/comment',{cookie,t:1,tpye:2,id,content,time})
}
// 获取收藏列表
export function getCollect(id,limit){
  return http.get('/playlist/subscribers',{id,limit})
}
export function getLyric(id){
  return http.get('/lyric',{id})
}
// 获取相关评论
export function getMusciComment(id,limit){
  return http.get('/comment/music',{id,limit})
}
// 获取歌曲的URL
export function getSongURL(id){
  return http.get('/song/url',{id})
}

// 整理歌曲相关信息
export class songDetail{
  constructor(songs){
      this.id=songs[0].id;
      this.name=songs[0].name;
      this.album=songs[0].al.name;
      this.song=songs[0].ar[0].name;
      this.pic=songs[0].al.picUrl;
      this.time=formatDate(new Date(songs[0].dt),'mm:ss')
  }
}
// 整理歌单详情相关信息
export class baseInfo{
  constructor(playlist){
      this.img=playlist.coverImgUrl;
      this.title=playlist.description;
      this.name=playlist.name;
      this.shareCount=playlist.shareCount;
      this.subscribedCount=playlist.subscribedCount;
      this.playCount=playlist.playCount;
      this.trackCount=playlist.trackCount;
      this.tags=playlist.tags[0];
  }
}