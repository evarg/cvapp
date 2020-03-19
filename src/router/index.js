import Vue from 'vue'
import Router from 'vue-router'
import Categories from '@/components/Categories'
import Corona from '@/components/Corona'
import Mapa from '@/components/Mapa'
import AddCategory from '@/components/AddCategory'
import EditCategory from '@/components/EditCategory'
import Articles from '@/components/Articles'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'mapa',
            component: Mapa
        },         
        {
            path: '/mapa',
            name: 'mapa',
            component: Mapa
        },         
        {
            path: '/corona',
            name: 'cororna',
            component: Corona
        },
    ]
})
