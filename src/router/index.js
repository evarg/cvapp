import Vue from 'vue'
import Router from 'vue-router'

import Corona from '@/components/Corona'
import Mapa from '@/components/Mapa'

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
