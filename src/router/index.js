import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const DiscoverMusic=() =>import('views/discover/DiscoverMusic')
const Personal=() =>import('views/discover/ChildrenRoute/Personal')
const Category=() =>import('views/discover/ChildrenRoute/MusicList')
const RankList=() =>import('views/discover/ChildrenRoute/RankList')

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
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
