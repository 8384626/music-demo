import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const DiscoverMusic=() =>import('views/discover/DiscoverMusic')
const Personal=() =>import('views/discover/ChildrenRoute/Personal')
const Category=() =>import('views/discover/ChildrenRoute/MusicList')
const RankList=() =>import('views/discover/ChildrenRoute/RankList')
const Songer=() =>import('views/discover/ChildrenRoute/Singer')
const NewSongs=()=>import('views/discover/ChildrenRoute/NewSongs')
const RecMv=()=>import('views/discover/ChildrenRoute/RecMv')

const MusicDetailList=() =>import('views/musicdetaillist/musicDetailList')

const NewMv=() =>import('views/newmv/NewMv')

const routes = [
  {
    path:'',
    redirect:'/discover'
  },
  {
    path:'/discover',
    component:DiscoverMusic,
    children:[
      {
        path:'/',
        redirect:'/discover/personal'
      },
      {
        path:'/discover/personal',
        component:Personal
      },
      {
        path:'/discover/category',
        component:Category
      },
      {
        path:'/discover/ranklist',
        component:RankList
      },
      {
        path:'/discover/singer',
        component:Songer
      },
      {
        path:'/discover/newsongs',
        component:NewSongs
      },
      {
        path:'/discover/recmv',
        component:RecMv
      }
    ]
  },
  {
    path:'/newmv',
    component:NewMv
  },
  {
    path:'/muscidetaillist/:id/:time',
    component:MusicDetailList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
